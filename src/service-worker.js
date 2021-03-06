workbox.core.setCacheNameDetails({ prefix: "vue-pwa" });

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification);
  event.notification.close();
});
