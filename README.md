# Carer Calm

A quiet space for carers. No notifications, no guilt, no noise. Just there when you need it.

## What it does

- **Gentle exercises** based on how you feel (not fitness goals)
- **Calming images** from Unsplash
- **Positive stories** from Good News Network
- **Carer-focused quotes** that actually understand

## Philosophy

- Opens instantly (everything cached offline)
- Never notifies you
- Never tracks streaks
- Never makes you feel bad
- Just quietly there when you reach for your phone

## Setup

### 1. Install dependencies

```bash
cd carer-calm
npm install
```

### 2. Get an Unsplash API key

1. Go to https://unsplash.com/developers
2. Create a new application
3. Copy your Access Key
4. Edit `src/content-fetchers.js` and replace `YOUR_UNSPLASH_ACCESS_KEY`

### 3. Set up a CORS proxy for RSS feeds

RSS feeds don't allow direct browser access. You have two options:

**Option A: Cloudflare Worker (recommended, free)**

Create a worker at https://workers.cloudflare.com with this code:

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    
    if (!targetUrl) {
      return new Response('Missing url parameter', { status: 400 });
    }
    
    const response = await fetch(targetUrl);
    const body = await response.text();
    
    return new Response(body, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': response.headers.get('Content-Type') || 'text/xml'
      }
    });
  }
};
```

Then update `CORS_PROXY` in `src/content-fetchers.js` to your worker URL.

**Option B: Skip RSS feeds**

The app works fine without RSS - it will just show quotes and images.
Comment out the `fetchStories()` call in `content-fetchers.js`.

### 4. Create app icons

You need two PNG icons in the `public` folder:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

Suggestion: A simple, calm icon - perhaps a leaf, a gentle wave, or just a soft colour.

### 5. Run locally

```bash
npm run dev
```

Open http://localhost:5173

### 6. Build for production

```bash
npm run build
```

The `dist` folder contains your deployable PWA.

## Deployment

### Cloudflare Pages (recommended, free)

1. Push your code to GitHub
2. Go to https://pages.cloudflare.com
3. Connect your repo
4. Build command: `npm run build`
5. Output directory: `dist`

### Or any static host

Upload the `dist` folder to Netlify, Vercel, GitHub Pages, etc.

## Customising

### Add more exercises

Edit `src/exercises.js`. Each exercise needs:
- `id`: unique string
- `category`: one of the categories in `EXERCISE_CATEGORIES`
- `name`: what to show her
- `duration`: seconds
- `steps`: array of instructions

### Change the quotes

The fallback quotes in `src/content-fetchers.js` are specifically for carers.
Add more that resonate, or replace them entirely.

### Adjust the colours

Edit the CSS variables in `src/styles.css` under `:root`.

## Privacy

- All data stays on her phone (IndexedDB)
- No analytics
- No tracking
- No accounts
- Activity logging is local only and never synced

## Built with

- Vite
- vite-plugin-pwa (for offline support)
- idb (IndexedDB wrapper)
- Unsplash API (images)
- Good News Network RSS (stories)
- ZenQuotes API (quotes)

---

*Built with love for carers who don't get enough of it.*
