const cacheVersion = 'v1';
const cacheName = `X-VTRACK-CACHE-${cacheVersion}`;

const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other static assets like images, stylesheets, and scripts
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    }).catch((error) => {
      console.error('Cache installation failed:', error);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request).then((fetchResponse) => {
//         return caches.open(cacheName).then((cache) => {
//           cache.put(event.request, fetchResponse.clone());
//           return fetchResponse;
//         });
//       }).catch((error) => {
//         console.error('Fetch failed:', error);
//       });
//     })
//   );
// });
