// St. Lucia Business Guide - Service Worker
// Cache-first for assets, Network-first for HTML

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `stlucia-guide-${CACHE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/overview.html',
  '/business.html',
  '/legal.html',
  '/sectors.html',
  '/cbi.html',
  '/immigration.html',
  '/living.html',
  '/expats.html',
  '/events.html',
  '/map.html',
  '/directory.html',
  '/faq.html',
  '/resources.html',
  '/trade.html',
  '/checklist.html',
  '/government.html',
  '/realestate.html',
  '/startups.html',
  '/offline.html',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/data/stlucia-data.json',
  '/data/businesses.json',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('[SW] Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== location.origin) return;

  event.respondWith(
    (async () => {
      try {
        // For HTML pages: Network-first (fresh content)
        if (request.headers.get('accept').includes('text/html')) {
          try {
            const networkResponse = await fetch(request);
            // Update cache with fresh version
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
          } catch (error) {
            // Network failed, try cache
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline page if nothing cached
            return caches.match(OFFLINE_PAGE);
          }
        }

        // For assets (CSS, JS, images, JSON): Cache-first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Not in cache, fetch from network
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        console.error('[SW] Fetch failed:', error);
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_PAGE);
        }
        throw error;
      }
    })()
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
