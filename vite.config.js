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
        // Cache content JSON files and images
        globPatterns: ['**/*.{js,css,html,ico,png,svg}', 'content/*.json'],
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
          },
          {
            // Cache content JSON files with NetworkFirst so updates come through
            urlPattern: /\/content\/.*\.json$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'content-json',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
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
