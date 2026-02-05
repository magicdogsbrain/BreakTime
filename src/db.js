import { openDB } from 'idb';

const DB_NAME = 'carer-calm';
const DB_VERSION = 3;

let dbPromise;

export async function initDB() {
  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // === Version 1 stores ===
      if (oldVersion < 1) {
        // Store for images
        const imageStore = db.createObjectStore('images', { keyPath: 'id' });
        imageStore.createIndex('fetchedAt', 'fetchedAt');

        // Store for news/stories
        const storyStore = db.createObjectStore('stories', { keyPath: 'id' });
        storyStore.createIndex('fetchedAt', 'fetchedAt');

        // Store for quotes
        db.createObjectStore('quotes', { keyPath: 'id' });

        // Store for exercises
        db.createObjectStore('exercises', { keyPath: 'id' });

        // Activity log
        const activityStore = db.createObjectStore('activity', { keyPath: 'id', autoIncrement: true });
        activityStore.createIndex('date', 'date');
        activityStore.createIndex('type', 'type');

        // App state key-value
        db.createObjectStore('state', { keyPath: 'key' });

        // Content rotation tracking
        const shownStore = db.createObjectStore('shown', { keyPath: 'id' });
        shownStore.createIndex('shownAt', 'shownAt');

        // Puzzle progress
        db.createObjectStore('puzzleProgress', { keyPath: 'id' });

        // Quiz scores
        const quizStore = db.createObjectStore('quizScores', { keyPath: 'id', autoIncrement: true });
        quizStore.createIndex('quizType', 'quizType');
        quizStore.createIndex('date', 'date');

        // Game high scores
        db.createObjectStore('gameScores', { keyPath: 'game' });
      }

      // === Version 2: Server content batch stores ===
      if (oldVersion < 2) {
        // Long-form stories from server
        if (!db.objectStoreNames.contains('long-reads')) {
          db.createObjectStore('long-reads', { keyPath: 'id' });
        }

        // Mystery puzzles from server
        if (!db.objectStoreNames.contains('mysteries')) {
          db.createObjectStore('mysteries', { keyPath: 'id' });
        }

        // Crossword puzzles from server
        if (!db.objectStoreNames.contains('crosswords')) {
          db.createObjectStore('crosswords', { keyPath: 'id' });
        }

        // Quiz questions from server
        if (!db.objectStoreNames.contains('quiz-questions')) {
          db.createObjectStore('quiz-questions', { keyPath: 'id' });
        }

        // Word puzzles from server (anagrams, missing letters, etc.)
        if (!db.objectStoreNames.contains('word-puzzles')) {
          db.createObjectStore('word-puzzles', { keyPath: 'id' });
        }
      }

      // === Version 3: Achievements store ===
      if (oldVersion < 3) {
        if (!db.objectStoreNames.contains('achievements')) {
          db.createObjectStore('achievements', { keyPath: 'id' });
        }
      }
    }
  });

  return dbPromise;
}

// Generic helpers
export async function getAll(storeName) {
  const db = await dbPromise;
  return db.getAll(storeName);
}

export async function get(storeName, key) {
  const db = await dbPromise;
  return db.get(storeName, key);
}

export async function put(storeName, value) {
  const db = await dbPromise;
  return db.put(storeName, value);
}

export async function putMany(storeName, values) {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  await Promise.all([
    ...values.map(v => tx.store.put(v)),
    tx.done
  ]);
}

export async function deleteOldEntries(storeName, maxAge, indexName = 'fetchedAt') {
  const db = await dbPromise;
  const cutoff = Date.now() - maxAge;
  const tx = db.transaction(storeName, 'readwrite');
  const index = tx.store.index(indexName);
  
  let cursor = await index.openCursor();
  while (cursor) {
    if (cursor.value.fetchedAt < cutoff) {
      await cursor.delete();
    }
    cursor = await cursor.continue();
  }
  
  await tx.done;
}

// Get a random item from a store
export async function getRandom(storeName) {
  const all = await getAll(storeName);
  if (all.length === 0) return null;
  return all[Math.floor(Math.random() * all.length)];
}

// Get multiple random items
export async function getRandomMultiple(storeName, count) {
  const all = await getAll(storeName);
  if (all.length === 0) return [];
  
  // Shuffle and take first N
  const shuffled = all.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Activity logging (private, never synced)
export async function logActivity(type, data = {}) {
  const db = await dbPromise;
  await db.add('activity', {
    type,
    date: new Date().toISOString().split('T')[0],
    timestamp: Date.now(),
    ...data
  });
}

// Get today's activity
export async function getTodayActivity() {
  const db = await dbPromise;
  const today = new Date().toISOString().split('T')[0];
  const index = db.transaction('activity').store.index('date');
  return index.getAll(today);
}

// State helpers
export async function getState(key, defaultValue = null) {
  const result = await get('state', key);
  return result ? result.value : defaultValue;
}

export async function setState(key, value) {
  await put('state', { key, value });
}

// ==================
// Content Rotation (10-day rule)
// ==================

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

/**
 * Mark an item as shown
 */
export async function markAsShown(contentType, id) {
  const db = await dbPromise;
  await db.put('shown', {
    id: `${contentType}-${id}`,
    contentType,
    contentId: id,
    shownAt: Date.now()
  });
}

/**
 * Get a random item that hasn't been shown in 10 days
 * Falls back to oldest shown item if all have been shown recently
 */
export async function getRandomNotRecentlyShown(storeName, contentType) {
  const db = await dbPromise;
  const allItems = await db.getAll(storeName);
  
  if (allItems.length === 0) return null;
  
  const cutoff = Date.now() - TEN_DAYS_MS;
  const shownRecords = await db.getAll('shown');
  
  // Build a map of recently shown items
  const recentlyShown = new Map();
  shownRecords.forEach(record => {
    if (record.contentType === contentType && record.shownAt > cutoff) {
      recentlyShown.set(record.contentId, record.shownAt);
    }
  });
  
  // Filter to items not shown recently
  const notRecentlyShown = allItems.filter(item => !recentlyShown.has(item.id));
  
  if (notRecentlyShown.length > 0) {
    // Return a random one from the available pool
    const item = notRecentlyShown[Math.floor(Math.random() * notRecentlyShown.length)];
    await markAsShown(contentType, item.id);
    return item;
  }
  
  // All items shown recently - pick the one shown longest ago
  const sortedByAge = allItems.sort((a, b) => {
    const aShown = recentlyShown.get(a.id) || 0;
    const bShown = recentlyShown.get(b.id) || 0;
    return aShown - bShown;
  });
  
  const oldest = sortedByAge[0];
  await markAsShown(contentType, oldest.id);
  return oldest;
}

/**
 * Get multiple random items not recently shown
 */
export async function getMultipleNotRecentlyShown(storeName, contentType, count) {
  const db = await dbPromise;
  const allItems = await db.getAll(storeName);
  
  if (allItems.length === 0) return [];
  
  const cutoff = Date.now() - TEN_DAYS_MS;
  const shownRecords = await db.getAll('shown');
  
  // Build a map of recently shown items with their timestamps
  const shownTimes = new Map();
  shownRecords.forEach(record => {
    if (record.contentType === contentType) {
      shownTimes.set(record.contentId, record.shownAt);
    }
  });
  
  // Sort items: not recently shown first, then by how long ago they were shown
  const sorted = allItems.sort((a, b) => {
    const aTime = shownTimes.get(a.id) || 0;
    const bTime = shownTimes.get(b.id) || 0;
    const aRecent = aTime > cutoff;
    const bRecent = bTime > cutoff;
    
    if (aRecent !== bRecent) return aRecent ? 1 : -1;
    return aTime - bTime;
  });
  
  // Take the first N and mark them as shown
  const selected = sorted.slice(0, count);
  for (const item of selected) {
    await markAsShown(contentType, item.id);
  }
  
  // Shuffle the selected items so they're not always in the same order
  return selected.sort(() => Math.random() - 0.5);
}

/**
 * Clean up old shown records (older than 30 days)
 */
export async function cleanupShownRecords() {
  const db = await dbPromise;
  const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
  const tx = db.transaction('shown', 'readwrite');
  const index = tx.store.index('shownAt');
  
  let cursor = await index.openCursor();
  while (cursor) {
    if (cursor.value.shownAt < cutoff) {
      await cursor.delete();
    }
    cursor = await cursor.continue();
  }
  
  await tx.done;
}

// ==================
// Puzzle & Game Progress
// ==================

export async function getPuzzleProgress(puzzleId) {
  const db = await dbPromise;
  return db.get('puzzleProgress', puzzleId);
}

export async function savePuzzleProgress(puzzleId, progress) {
  const db = await dbPromise;
  await db.put('puzzleProgress', { id: puzzleId, ...progress, updatedAt: Date.now() });
}

export async function getCompletedPuzzles(puzzleType) {
  const db = await dbPromise;
  const all = await db.getAll('puzzleProgress');
  return all.filter(p => p.type === puzzleType && p.completed);
}

export async function saveQuizScore(quizType, score, total) {
  const db = await dbPromise;
  await db.add('quizScores', {
    quizType,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString()
  });
}

export async function getQuizHistory(quizType, limit = 10) {
  const db = await dbPromise;
  const all = await db.getAllFromIndex('quizScores', 'quizType', quizType);
  return all.slice(-limit);
}

export async function saveGameScore(game, score) {
  const db = await dbPromise;
  const existing = await db.get('gameScores', game);
  if (!existing || score > existing.highScore) {
    await db.put('gameScores', {
      game,
      highScore: score,
      achievedAt: Date.now()
    });
    return true; // New high score!
  }
  return false;
}

export async function getGameHighScore(game) {
  const db = await dbPromise;
  const record = await db.get('gameScores', game);
  return record?.highScore || 0;
}

// ==================
// QUIZ STATS
// ==================

export async function getAllQuizStats() {
  const db = await dbPromise;
  const scores = await db.getAll('quizScores');
  if (!scores.length) {
    return { totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0, averagePercent: 0, bestScore: 0 };
  }
  return {
    totalQuizzes: scores.length,
    totalCorrect: scores.reduce((sum, s) => sum + s.score, 0),
    totalQuestions: scores.reduce((sum, s) => sum + s.total, 0),
    averagePercent: Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length),
    bestScore: Math.max(...scores.map(s => s.percentage)),
    hasPerfect: scores.some(s => s.percentage === 100)
  };
}

// ==================
// WEEKLY STATS
// ==================

export async function getActivityForWeek() {
  const db = await dbPromise;
  const all = await db.getAll('activity');
  const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  return all.filter(a => a.timestamp >= weekAgo);
}

export async function getWeeklyStats() {
  const activity = await getActivityForWeek();
  const quizStats = await getAllQuizStats();
  const tetrisHigh = await getGameHighScore('tetris');

  // Check for early bird (before 9am) and night owl (after 10pm)
  let earlyBird = false;
  let nightOwl = false;
  activity.forEach(a => {
    const hour = new Date(a.timestamp).getHours();
    if (hour < 9) earlyBird = true;
    if (hour >= 22) nightOwl = true;
  });

  return {
    exercises: activity.filter(a => a.type === 'exercise').length,
    breaths: activity.filter(a => a.type === 'breathe').length,
    puzzles: activity.filter(a => a.type === 'puzzle').length,
    quizzes: activity.filter(a => a.type === 'quiz').length,
    games: activity.filter(a => a.type === 'game').length,
    daysActive: new Set(activity.map(a => a.date)).size,
    totalBreaks: activity.length,
    perfectQuiz: quizStats.hasPerfect,
    tetrisHigh,
    earlyBird,
    nightOwl
  };
}

// ==================
// ACHIEVEMENTS
// ==================

export async function getUnlockedAchievements() {
  const db = await dbPromise;
  if (!db.objectStoreNames.contains('achievements')) {
    return [];
  }
  return db.getAll('achievements');
}

export async function unlockAchievement(achievement) {
  const db = await dbPromise;
  if (!db.objectStoreNames.contains('achievements')) {
    return;
  }
  const existing = await db.get('achievements', achievement.id);
  if (!existing) {
    await db.put('achievements', {
      ...achievement,
      unlockedAt: Date.now()
    });
  }
}
