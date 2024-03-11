// service-worker.js
// import { CACHE_STORAGE_KEY } from "../src/constants";
// Define the cache name and version
const cacheName = "X-VTRACK-CACHE";

// List of files to cache
const filesToCache = [
  '/',
  './index.html',
  './manifest.json',
  // Add other static assets like images, stylesheets, and scripts
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      // Cache static assets
      return cache.addAll(filesToCache);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            // Delete outdated caches
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found, otherwise fetch from the network
      return response || fetch(event.request);
    })
  );
});
