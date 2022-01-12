// An empty service worker is provided for development purposes.
const cacheName = 'cache-v1';
const cacheFiles = [
    '/build/bundle.css',
    '/build/bundle.js',
    '/build/bundle.js.map',
    '/static/icon-192x192.png',
    '/static/icon-256x256.png',
    '/static/icon-384x384.png',
    '/static/icon-512x512.png',
    '/static/manifest.json',
    '/static/maskable_icon_x512.png',
    '/static/favicon.ico',
    '/global.css',
    '/index.html',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(cacheFiles);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
