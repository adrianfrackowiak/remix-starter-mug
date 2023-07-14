/// <reference lib="WebWorker" />

// Service Workers are quite broken in ts, this is a workaround
export type {};
declare let self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service worker installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  console.log('Service worker received message', event.data);
});