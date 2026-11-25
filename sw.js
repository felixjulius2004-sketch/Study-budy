var C="studybuddy-v1";
var CDN=["https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"];
self.addEventListener("install",function(e){
 e.waitUntil(caches.open(C).then(function(c){
  var own=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"].map(function(u){return c.add(u).catch(function(){});});
  var cdn=CDN.map(function(u){return fetch(u,{mode:"no-cors"}).then(function(r){return c.put(u,r);}).catch(function(){});});
  return Promise.all(own.concat(cdn));
 }).then(function(){return self.skipWaiting();}));
});
self.addEventListener("activate",function(e){
 e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener("fetch",function(e){
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(function(r){
  return r||fetch(e.request).then(function(res){
   if(res&&res.ok&&new URL(e.request.url).origin===location.origin){var cp=res.clone();caches.open(C).then(function(c){c.put(e.request,cp);});}
   return res;
  }).catch(function(){return caches.match("index.html");});
 }));
});
