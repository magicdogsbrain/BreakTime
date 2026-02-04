/**
 * Content Batch System
 *
 * Offline-first content delivery:
 * 1. On first load, seed from bundled inline content
 * 2. When online, fetch a batch from server JSON files
 * 3. Store batch in IndexedDB - works offline
 * 4. Track seen content IDs to reject duplicates
 * 5. When batch is exhausted, fetch another
 *
 * Never accumulates indefinitely - old batches are replaced.
 */

import { getAll, putMany, getState, setState, get, put } from './db.js';

// Base URL for content files (relative to app, works on GitHub Pages)
const CONTENT_BASE = import.meta.env.BASE_URL + 'content/';

// Content types and their server file mappings
const CONTENT_TYPES = {
  quotes: { file: 'quotes.json', batchSize: 30, store: 'quotes' },
  stories: { file: 'stories.json', batchSize: 15, store: 'stories' },
  'long-reads': { file: 'long-reads.json', batchSize: 10, store: 'long-reads' },
  mysteries: { file: 'mysteries.json', batchSize: 8, store: 'mysteries' },
  crosswords: { file: 'crosswords.json', batchSize: 5, store: 'crosswords' },
  'quiz-britpop': { file: 'quiz-britpop.json', batchSize: 20, store: 'quiz-questions' },
  'word-puzzles': { file: 'word-puzzles.json', batchSize: 15, store: 'word-puzzles' },
  exercises: { file: 'exercises.json', batchSize: 15, store: 'exercises' },
};

/**
 * Fetch a content file from the server
 */
async function fetchContentFile(filename) {
  const url = CONTENT_BASE + filename;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.json();
}

/**
 * Get set of content IDs that have been seen/used
 */
async function getSeenIds(contentType) {
  const record = await get('state', `seen-${contentType}`);
  return new Set(record ? record.value : []);
}

/**
 * Add IDs to the seen set
 */
async function addSeenIds(contentType, ids) {
  const existing = await getSeenIds(contentType);
  ids.forEach(id => existing.add(id));

  // Cap the seen set to prevent unbounded growth (keep last 500)
  const arr = [...existing];
  const capped = arr.length > 500 ? arr.slice(arr.length - 500) : arr;

  await setState(`seen-${contentType}`, capped);
}

/**
 * Pick a random batch from available content, avoiding recently seen items
 */
function pickBatch(allItems, seenIds, batchSize, idField = 'id') {
  // Split into unseen and seen
  const unseen = allItems.filter(item => !seenIds.has(item[idField]));
  const seen = allItems.filter(item => seenIds.has(item[idField]));

  // Prefer unseen items
  const shuffledUnseen = unseen.sort(() => Math.random() - 0.5);
  const shuffledSeen = seen.sort(() => Math.random() - 0.5);

  // Take from unseen first, then fill with seen if needed
  const batch = [...shuffledUnseen, ...shuffledSeen].slice(0, batchSize);

  return batch;
}

/**
 * Refresh a specific content type
 * Downloads from server, picks a fresh batch, stores locally
 */
export async function refreshContentType(contentType) {
  if (!navigator.onLine) return false;

  const config = CONTENT_TYPES[contentType];
  if (!config) return false;

  // Check cooldown (don't re-fetch within 6 hours)
  const lastFetch = await getState(`lastBatchFetch-${contentType}`, 0);
  const sixHours = 6 * 60 * 60 * 1000;
  if (Date.now() - lastFetch < sixHours) return false;

  try {
    const allContent = await fetchContentFile(config.file);
    const items = Array.isArray(allContent) ? allContent : [];

    if (items.length === 0) return false;

    // Get seen IDs for this content type
    const seenIds = await getSeenIds(contentType);

    // Pick a batch avoiding recently seen
    const batch = pickBatch(items, seenIds, config.batchSize);

    // Store the batch in the appropriate IndexedDB store
    const storeName = config.store;
    const batchWithMeta = batch.map(item => ({
      ...item,
      _batchedAt: Date.now(),
      _contentType: contentType
    }));

    await putMany(storeName, batchWithMeta);

    // Mark these as seen
    const batchIds = batch.map(item => item.id).filter(Boolean);
    await addSeenIds(contentType, batchIds);

    // Update last fetch time
    await setState(`lastBatchFetch-${contentType}`, Date.now());

    return true;
  } catch (err) {
    console.warn(`Failed to refresh ${contentType}:`, err.message);
    return false;
  }
}

/**
 * Refresh word puzzles (special case - file has multiple arrays)
 */
export async function refreshWordPuzzles() {
  if (!navigator.onLine) return false;

  const lastFetch = await getState('lastBatchFetch-word-puzzles', 0);
  const sixHours = 6 * 60 * 60 * 1000;
  if (Date.now() - lastFetch < sixHours) return false;

  try {
    const data = await fetchContentFile('word-puzzles.json');

    // Store each puzzle type with a generated ID if needed
    const puzzleTypes = ['anagrams', 'missingLetters', 'wordClues', 'wordSearches'];
    const allPuzzles = [];

    for (const type of puzzleTypes) {
      if (data[type] && Array.isArray(data[type])) {
        data[type].forEach((puzzle, i) => {
          allPuzzles.push({
            ...puzzle,
            id: puzzle.id || `${type}-${i}`,
            puzzleType: type,
            _batchedAt: Date.now()
          });
        });
      }
    }

    if (allPuzzles.length > 0) {
      // Pick a random subset
      const seenIds = await getSeenIds('word-puzzles');
      const batch = pickBatch(allPuzzles, seenIds, 30);
      await putMany('word-puzzles', batch);

      const batchIds = batch.map(p => p.id);
      await addSeenIds('word-puzzles', batchIds);
    }

    await setState('lastBatchFetch-word-puzzles', Date.now());
    return true;
  } catch (err) {
    console.warn('Failed to refresh word puzzles:', err.message);
    return false;
  }
}

/**
 * Refresh all content types in background
 * Called on app startup when online
 */
export async function refreshAllBatches() {
  if (!navigator.onLine) return;

  // Run all refreshes in parallel, don't let one failure stop the rest
  const results = await Promise.allSettled([
    refreshContentType('quotes'),
    refreshContentType('stories'),
    refreshContentType('long-reads'),
    refreshContentType('mysteries'),
    refreshContentType('crosswords'),
    refreshContentType('quiz-britpop'),
    refreshContentType('exercises'),
    refreshWordPuzzles(),
  ]);

  const succeeded = results.filter(r => r.status === 'fulfilled' && r.value).length;
  if (succeeded > 0) {
    console.log(`Refreshed ${succeeded} content batches`);
  }
}

/**
 * Get content from the local batch store
 * Falls back to inline/bundled content if store is empty
 */
export async function getBatchedContent(storeName, fallbackData = []) {
  const items = await getAll(storeName);
  if (items.length > 0) return items;
  return fallbackData;
}

/**
 * Get word puzzles of a specific type from local store
 */
export async function getWordPuzzlesByType(puzzleType, fallbackData = []) {
  const all = await getAll('word-puzzles');
  const matching = all.filter(p => p.puzzleType === puzzleType);
  if (matching.length > 0) return matching;
  return fallbackData;
}

/**
 * Check if we need more content (batch is getting low)
 * Returns true if any content type needs refreshing
 */
export async function needsRefresh() {
  for (const [type, config] of Object.entries(CONTENT_TYPES)) {
    const items = await getAll(config.store);
    if (items.length < config.batchSize / 2) return true;
  }
  return false;
}

/**
 * Force refresh all content (ignores cooldown)
 * Use sparingly - e.g. when user explicitly requests new content
 */
export async function forceRefreshAll() {
  // Clear cooldowns
  for (const type of Object.keys(CONTENT_TYPES)) {
    await setState(`lastBatchFetch-${type}`, 0);
  }
  await setState('lastBatchFetch-word-puzzles', 0);

  return refreshAllBatches();
}
