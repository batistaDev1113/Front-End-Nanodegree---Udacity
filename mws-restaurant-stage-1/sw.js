console.log('event registred');

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('cacheFirst').then(function (catched) {
      return catched.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response) {
        console.log(`Request ${e.request} found`);
        return response;
      } else {
        console.log(`Request ${e.request} could not be found`);
        return fetch(e.request);
      }
    })
  );
});

const filesToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/10.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg'
];