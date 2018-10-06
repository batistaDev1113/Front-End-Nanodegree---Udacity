
// install event
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('cacheFirst').then(function (catched) {
      return catched.addAll(filesToCache);
    })
  );
});

// fetch event
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request)
    .then(function(response){
      if(response){
        console.log('Request' +e.request +'already exists in cache');
        return response;
      }
      else {
        console.log(`Request ${e.request} could not be found in cache`);
        return fetch(e.request)
        .then(function(response){
          let clonedResponse = response.clone();
          caches.open('cacheFirst').then(function(catched){
            catched.put(e.request, clonedResponse);
          })
          return response;
        })
        .catch(function(err){
          console.log(`Error ${err} was encountered while caching`);
        });

      }
    })
  )
});


// array of files to  be cached
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
