// Service Worker for caching battery lifecycle frames
const CACHE_NAME = 'synovra-lifecycle-v1'
const FRAME_CACHE_NAME = 'synovra-frames-v1'

// Critical frames to cache immediately
const CRITICAL_FRAMES = [
  '/lifecycle/frames/scene-1/frame_0001.webp',
  '/lifecycle/frames/scene-1/frame_0010.webp',
  '/lifecycle/frames/scene-1/frame_0020.webp',
  '/lifecycle/frames/scene-1/frame_0030.webp',
  '/lifecycle/frames/scene-1/frame_0040.webp',
  '/lifecycle/frames/scene-1/frame_0050.webp'
]

// Install event - cache critical frames
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(FRAME_CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_FRAMES)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== FRAME_CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return
  }
  
  // Cache strategy for lifecycle frames
  if (url.pathname.includes('/lifecycle/frames/')) {
    event.respondWith(
      caches.open(FRAME_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            return response
          }
          
          return fetch(event.request).then((networkResponse) => {
            // Cache the frame for future use
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone())
            }
            return networkResponse
          })
        })
      })
    )
    return
  }
  
  // Network first for other resources
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request)
    })
  )
})
