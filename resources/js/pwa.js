/**
 * PWA Registration Script for ILoveIMG Studio
 * Handles service worker registration, updates, and install prompts
 */

// Track install prompt event
let deferredInstallPrompt = null;

/**
 * Register the service worker
 */
export function registerServiceWorker() {
    // Only register in production and if service workers are supported
    if (import.meta.env.DEV) {
        console.log('[PWA] Skipping SW registration in development mode');
        return;
    }

    if (!('serviceWorker' in navigator)) {
        console.log('[PWA] Service workers not supported');
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('[PWA] Service Worker registered:', registration.scope);

                // Handle updates
                handleServiceWorkerUpdates(registration);
            })
            .catch((error) => {
                console.error('[PWA] Service Worker registration failed:', error);
            });
    });
}

/**
 * Handle service worker updates
 */
function handleServiceWorkerUpdates(registration) {
    // Check for updates periodically
    setInterval(() => {
        registration.update().catch((error) => {
            console.error('[PWA] Error checking for updates:', error);
        });
    }, 60 * 60 * 1000); // Check every hour

    // Listen for new service workers
    registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is waiting
                console.log('[PWA] New service worker available');
                showUpdatePrompt(newWorker);
            }
        });
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('[PWA] Message from SW:', event.data);
    });
}

/**
 * Show update prompt to user
 */
function showUpdatePrompt(worker) {
    // Create custom update notification
    const shouldUpdate = confirm(
        'A new version of ILoveIMG Studio is available!\n\n' +
        'Click OK to update and get the latest features and improvements.'
    );

    if (shouldUpdate) {
        // Tell the service worker to skip waiting
        worker.postMessage('skipWaiting');
        
        // Reload when the new service worker takes control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
}

/**
 * Initialize beforeinstallprompt handling
 */
export function initInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the mini-infobar from appearing on mobile
        event.preventDefault();
        
        // Store the event for later use
        deferredInstallPrompt = event;
        
        // Also expose globally for components
        window.deferredInstallPrompt = event;
        
        console.log('[PWA] Install prompt available');
        
        // Dispatch custom event so the app can show install button
        window.dispatchEvent(new CustomEvent('pwa:installable', {
            detail: { prompt: event }
        }));
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
        console.log('[PWA] App was installed');
        deferredInstallPrompt = null;
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('pwa:installed'));
    });
}

/**
 * Trigger the install prompt
 * @returns {Promise<boolean>} Whether the app was installed
 */
export async function triggerInstallPrompt() {
    if (!deferredInstallPrompt) {
        console.log('[PWA] Install prompt not available');
        return false;
    }

    // Show the install prompt
    deferredInstallPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredInstallPrompt.userChoice;
    
    console.log(`[PWA] User ${outcome === 'accepted' ? 'installed' : 'dismissed'} the app`);
    
    // Clear the deferred prompt
    deferredInstallPrompt = null;

    return outcome === 'accepted';
}

/**
 * Check if the app is installable
 * @returns {boolean}
 */
export function isInstallable() {
    return deferredInstallPrompt !== null;
}

/**
 * Check if the app is running as an installed PWA
 * @returns {boolean}
 */
export function isStandalone() {
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://')
    );
}

/**
 * Get PWA display mode
 * @returns {string} Display mode (standalone, minimal-ui, browser, etc.)
 */
export function getDisplayMode() {
    const modes = ['standalone', 'minimal-ui', 'fullscreen', 'browser'];
    
    for (const mode of modes) {
        if (window.matchMedia(`(display-mode: ${mode})`).matches) {
            return mode;
        }
    }
    
    return 'browser';
}

/**
 * Subscribe to push notifications
 * @param {string} publicVapidKey - VAPID public key
 * @returns {Promise<PushSubscription|null>}
 */
export async function subscribeToPushNotifications(publicVapidKey) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('[PWA] Push notifications not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        
        // Check if already subscribed
        let subscription = await registration.pushManager.getSubscription();
        
        if (subscription) {
            console.log('[PWA] Already subscribed to push notifications');
            return subscription;
        }

        // Subscribe
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        console.log('[PWA] Subscribed to push notifications:', subscription);
        return subscription;
    } catch (error) {
        console.error('[PWA] Failed to subscribe to push notifications:', error);
        return null;
    }
}

/**
 * Unsubscribe from push notifications
 * @returns {Promise<boolean>}
 */
export async function unsubscribeFromPushNotifications() {
    if (!('serviceWorker' in navigator)) {
        return false;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
            await subscription.unsubscribe();
            console.log('[PWA] Unsubscribed from push notifications');
            return true;
        }

        return false;
    } catch (error) {
        console.error('[PWA] Failed to unsubscribe:', error);
        return false;
    }
}

/**
 * Convert base64 to Uint8Array for VAPID key
 */
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

/**
 * Initialize all PWA features
 */
export function initPWA() {
    console.log('[PWA] Initializing PWA features...');
    
    registerServiceWorker();
    initInstallPrompt();
    
    // Log current display mode
    console.log('[PWA] Display mode:', getDisplayMode());
    console.log('[PWA] Is standalone:', isStandalone());
    
    console.log('[PWA] PWA features initialized');
}

// Auto-initialize when imported
initPWA();

// Export default for convenience
export default {
    initPWA,
    registerServiceWorker,
    initInstallPrompt,
    triggerInstallPrompt,
    isInstallable,
    isStandalone,
    getDisplayMode,
    subscribeToPushNotifications,
    unsubscribeFromPushNotifications
};
