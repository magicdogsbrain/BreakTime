import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/BreakTime/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      // No notifications - ever
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'BreakTime!',
        short_name: 'BreakTime',
        description: 'A quiet space when you need it',
        theme_color: '#faf5f7',
        background_color: '#faf5f7',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Cache images, RSS content, quotes
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});
