self.addEventListener("fetch", function(event){
  
  let req = event.request
  
  let cacheRes = caches.open('kards-images').then(cache => {
      return cache.match(req)
  }).then(res => {
    return res
  })
  
  event.respondWith(cacheRes);

})


