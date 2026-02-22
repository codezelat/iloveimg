/**
 * ILoveIMG Studio Service Worker
 * Provides offline support, caching strategies, and PWA functionality
 */

const CACHE_NAME = 'iloveimg-v1';
const STATIC_CACHE_NAME = `${CACHE_NAME}-static`;
const IMAGE_CACHE_NAME = `${CACHE_NAME}-images`;
const PAGES_CACHE_NAME = `${CACHE_NAME}-pages`;

// Static assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/offline.html',
    '/icon.svg',
    '/ilvimg.png',
    '/favicon.ico'
];

// Skip waiting and claim clients immediately
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE_NAME).then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName.startsWith('iloveimg-') && cacheName !== STATIC_CACHE_NAME && cacheName !== IMAGE_CACHE_NAME && cacheName !== PAGES_CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Claim clients immediately
            self.clients.claim()
        ])
    );
});

// Helper: Determine if URL is a static asset
function isStaticAsset(url) {
    const staticExtensions = /\.(js|css|woff2?|ttf|otf|eot)$/i;
    return staticExtensions.test(url.pathname);
}

// Helper: Determine if URL is an image
function isImage(url) {
    const imageExtensions = /\.(png|jpg|jpeg|gif|webp|svg|ico|bmp)$/i;
    return imageExtensions.test(url.pathname);
}

// Helper: Determine if URL is an HTML page
function isHTMLPage(url) {
    return url.pathname === '/' || !/\.[^/]+$/.test(url.pathname);
}

// Fetch event handler with different cache strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests (except for fonts)
    if (url.origin !== self.location.origin && !url.href.includes('fonts.')) {
        return;
    }

    // Strategy: Cache-first for static assets (CSS, JS, fonts)
    if (isStaticAsset(url)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
        return;
    }

    // Strategy: Cache-first for images (user processed images)
    if (isImage(url)) {
        event.respondWith(cacheFirst(request, IMAGE_CACHE_NAME));
        return;
    }

    // Strategy: Network-first for HTML pages
    if (isHTMLPage(url)) {
        event.respondWith(networkFirst(request, PAGES_CACHE_NAME));
        return;
    }

    // Default: Network with cache fallback
    event.respondWith(networkWithCacheFallback(request));
});

// Cache-first strategy: Try cache first, fall back to network
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    if (cached) {
        // Return cached response and update cache in background
        fetchAndCache(request, cacheName).catch(() => {});
        return cached;
    }

    try {
        return await fetchAndCache(request, cacheName);
    } catch (error) {
        console.error('[SW] Cache-first fetch failed:', error);
        throw error;
    }
}

// Network-first strategy: Try network first, fall back to cache
async function networkFirst(request, cacheName) {
    const cache = await caches.open(cacheName);

    try {
        const networkResponse = await fetch(request);
        
        // Cache successful GET requests
        if (networkResponse.ok && request.method === 'GET') {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        
        const cached = await cache.match(request);
        
        if (cached) {
            return cached;
        }

        // Return offline page for HTML requests
        if (isHTMLPage(new URL(request.url))) {
            const offlineResponse = await caches.match('/offline.html');
            if (offlineResponse) {
                return offlineResponse;
            }
        }

        throw error;
    }
}

// Network with cache fallback
async function networkWithCacheFallback(request) {
    try {
        return await fetch(request);
    } catch (error) {
        const cached = await caches.match(request);
        if (cached) {
            return cached;
        }
        throw error;
    }
}

// Fetch and cache helper
async function fetchAndCache(request, cacheName) {
    const cache = await caches.open(cacheName);
    const response = await fetch(request);
    
    if (response.ok) {
        cache.put(request, response.clone());
    }
    
    return response;
}

// Handle push notifications
self.addEventListener('push', (event) => {
    console.log('[SW] Push received:', event);

    const options = {
        body: event.data?.text() || 'New notification from ILoveIMG Studio',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'iloveimg-notification',
        requireInteraction: false,
        actions: [
            {
                action: 'open',
                title: 'Open App'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('ILoveIMG Studio', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event);

    event.notification.close();

    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Handle background sync (for future use - image processing queue)
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);
    
    if (event.tag === 'image-processing-queue') {
        event.waitUntil(processImageQueue());
    }
});

// Placeholder for image processing queue
async function processImageQueue() {
    // Future implementation: Process queued image operations
    console.log('[SW] Processing image queue...');
}

// Handle message from client
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);

    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }

    if (event.data?.type === 'CACHE_IMAGES') {
        const images = event.data.images || [];
        event.waitUntil(cacheImages(images));
    }
});

// Cache multiple images
async function cacheImages(urls) {
    const cache = await caches.open(IMAGE_CACHE_NAME);
    const promises = urls.map(async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                await cache.put(url, response);
                console.log('[SW] Cached image:', url);
            }
        } catch (error) {
            console.error('[SW] Failed to cache image:', url, error);
        }
    });
    await Promise.all(promises);
}

console.log('[SW] Service worker loaded');
