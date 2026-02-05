/**
 * News Reader Module
 *
 * Fetches news from RSS feeds via RSS2JSON (CORS-friendly)
 * Categories: Headlines, Feel Good, Local
 */

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

// RSS Feed sources
const FEEDS = {
  headlines: [
    { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
    { name: 'Guardian', url: 'https://www.theguardian.com/uk/rss' }
  ],
  feelgood: [
    { name: 'BBC Good News', url: 'https://feeds.bbci.co.uk/news/stories/rss.xml' },
    { name: 'Positive News', url: 'https://www.positive.news/feed/' },
    { name: 'Good News Network', url: 'https://www.goodnewsnetwork.org/feed/' }
  ],
  local: [
    // Default to UK regional - could be customised
    { name: 'BBC England', url: 'https://feeds.bbci.co.uk/news/england/rss.xml' },
    { name: 'BBC Scotland', url: 'https://feeds.bbci.co.uk/news/scotland/rss.xml' },
    { name: 'BBC Wales', url: 'https://feeds.bbci.co.uk/news/wales/rss.xml' }
  ]
};

// Cache for fetched news
const newsCache = {
  headlines: { items: [], timestamp: 0 },
  feelgood: { items: [], timestamp: 0 },
  local: { items: [], timestamp: 0 }
};

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

/**
 * Fetch a single RSS feed via RSS2JSON
 */
async function fetchFeed(feedUrl) {
  try {
    const url = `${RSS2JSON_API}?rss_url=${encodeURIComponent(feedUrl)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Feed error');
    }

    return data.items || [];
  } catch (error) {
    console.warn(`Failed to fetch feed ${feedUrl}:`, error.message);
    return [];
  }
}

/**
 * Parse and normalise a feed item
 */
function normaliseItem(item, sourceName) {
  // Extract image from content or enclosure
  let image = null;

  if (item.enclosure && item.enclosure.link) {
    image = item.enclosure.link;
  } else if (item.thumbnail) {
    image = item.thumbnail;
  } else {
    // Try to extract from content
    const imgMatch = item.content?.match(/<img[^>]+src=["']([^"']+)["']/);
    if (imgMatch) {
      image = imgMatch[1];
    }
  }

  // Clean up description - remove HTML tags
  let description = item.description || '';
  description = description.replace(/<[^>]*>/g, '').trim();
  // Truncate long descriptions
  if (description.length > 200) {
    description = description.substring(0, 200).trim() + '...';
  }

  return {
    id: item.guid || item.link || Math.random().toString(36),
    title: item.title || 'Untitled',
    description,
    link: item.link,
    pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
    source: sourceName,
    image,
    content: item.content || item.description || ''
  };
}

/**
 * Fetch news for a category
 */
export async function fetchNews(category = 'headlines') {
  const feeds = FEEDS[category];
  if (!feeds) {
    return [];
  }

  // Check cache
  const cached = newsCache[category];
  if (cached.items.length > 0 && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.items;
  }

  // Fetch all feeds in parallel
  const feedPromises = feeds.map(async (feed) => {
    const items = await fetchFeed(feed.url);
    return items.map(item => normaliseItem(item, feed.name));
  });

  const results = await Promise.all(feedPromises);

  // Flatten and sort by date (newest first)
  let allItems = results.flat();
  allItems.sort((a, b) => b.pubDate - a.pubDate);

  // Remove duplicates by title similarity
  const seen = new Set();
  allItems = allItems.filter(item => {
    const key = item.title.toLowerCase().substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Limit to reasonable number
  allItems = allItems.slice(0, 20);

  // Update cache
  newsCache[category] = {
    items: allItems,
    timestamp: Date.now()
  };

  return allItems;
}

/**
 * Get all categories
 */
export function getCategories() {
  return [
    { id: 'headlines', name: 'Headlines', icon: '📰' },
    { id: 'feelgood', name: 'Feel Good', icon: '😊' },
    { id: 'local', name: 'Local', icon: '📍' }
  ];
}

/**
 * Format relative time
 */
export function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/**
 * Clear the news cache (useful for pull-to-refresh)
 */
export function clearCache(category = null) {
  if (category && newsCache[category]) {
    newsCache[category] = { items: [], timestamp: 0 };
  } else {
    Object.keys(newsCache).forEach(key => {
      newsCache[key] = { items: [], timestamp: 0 };
    });
  }
}
