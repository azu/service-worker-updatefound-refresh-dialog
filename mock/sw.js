importScripts("../dist/service-worker-updatefound-refresh-dialog.umd.js");
self.addEventListener("install", function(event) {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", function(event) {
    event.waitUntil(self.clients.claim());
});
