var dataCacheName = 'chores-pwa';
var cacheName = 'chores-pwa';
var filesToCache = [
  "/",
  "/style.css",
  "/chore-wheel/",
  "/chore-wheel/img/icon/128x128.png",
  "/chore-wheel/img/icon/144x144.png",
  "/chore-wheel/img/icon/152x152.png",
  "/chore-wheel/img/icon/192x192.png",
  "/chore-wheel/img/icon/256x256.png",
  "/chore-wheel/index.html",
  "/chore-wheel/about.html",
  "/chore-wheel/edit.html",
  "/chore-wheel/manifest.json",
  "/chore-wheel/chorewheel.css",
  "/chore-wheel/scripts/app.js",
  "/chore-wheel/scripts/chorewheel.js",
  "/chore-wheel/scripts/edit.js",
  "/chore-wheel/service-worker.js",
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
