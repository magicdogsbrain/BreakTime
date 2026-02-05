import './styles.css';
import './app.js';

// Register service worker (handled by vite-plugin-pwa)
// No notifications - ever

// Detect when new service worker takes control and reload the page
// This ensures old clients get the new code when the SW updates
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // New service worker has taken control - reload to get fresh assets
    window.location.reload();
  });
}
