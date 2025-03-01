// Service Worker для офлайн-режима
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("ai-homework-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "manifest.json",
        "config.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
