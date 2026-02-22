<template>
    <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
    >
        <div
            v-if="showPrompt"
            class="fixed bottom-4 right-4 z-50 max-w-sm w-full mx-4"
        >
            <div class="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50">
                <!-- Gradient accent -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-primary-500"></div>
                
                <!-- Close button -->
                <button
                    @click="dismiss"
                    class="absolute top-3 right-3 p-1.5 rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
                    aria-label="Dismiss"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="p-5 space-y-4">
                    <!-- Header with icon -->
                    <div class="flex items-start gap-4">
                        <div class="relative flex-shrink-0">
                            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-orange-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
                                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                            <!-- Pulse indicator -->
                            <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                        </div>
                        
                        <div class="flex-1 min-w-0 pt-1">
                            <h3 class="text-lg font-semibold text-white leading-tight">
                                Install ILoveIMG Studio
                            </h3>
                            <p class="text-sm text-white/60 mt-1">
                                Add to your home screen for quick access
                            </p>
                        </div>
                    </div>

                    <!-- Benefits -->
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <div class="flex items-center gap-2 text-white/70">
                            <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Lightning fast</span>
                        </div>
                        <div class="flex items-center gap-2 text-white/70">
                            <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            <span>Works offline</span>
                        </div>
                        <div class="flex items-center gap-2 text-white/70">
                            <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>100% private</span>
                        </div>
                        <div class="flex items-center gap-2 text-white/70">
                            <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Auto-updates</span>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex gap-3 pt-1">
                        <button
                            @click="install"
                            :disabled="installing"
                            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-orange-400 text-white font-medium text-sm hover:from-primary-400 hover:to-orange-300 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="installing" class="inline-flex items-center gap-2">
                                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                Installing...
                            </span>
                            <span v-else class="inline-flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Install App
                            </span>
                        </button>
                        <button
                            @click="dismiss"
                            class="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors"
                        >
                            Not now
                        </button>
                    </div>

                    <!-- Trust indicator -->
                    <div class="flex items-center justify-center gap-2 text-xs text-white/40">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>No app store required · Privacy guaranteed</span>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showPrompt = ref(false);
const installing = ref(false);
let installPromptEvent = null;

// Check if already dismissed or installed
const hasUserDismissed = () => {
    return localStorage.getItem('pwa-prompt-dismissed') === 'true';
};

const setDismissed = () => {
    localStorage.setItem('pwa-prompt-dismissed', 'true');
};

const isStandalone = () => {
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://')
    );
};

// Show prompt with delay
const schedulePrompt = () => {
    // Don't show if already installed or dismissed
    if (isStandalone() || hasUserDismissed()) {
        return;
    }
    
    // Don't show if no install prompt available
    if (!installPromptEvent) {
        return;
    }
    
    // Show after 3 seconds of page load
    setTimeout(() => {
        if (!hasUserDismissed() && installPromptEvent) {
            showPrompt.value = true;
        }
    }, 3000);
};

// Handle beforeinstallprompt event
const handleBeforeInstallPrompt = (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    
    // Store the event for later use
    installPromptEvent = event;
    
    // Schedule the prompt
    schedulePrompt();
};

// Handle appinstalled event
const handleAppInstalled = () => {
    showPrompt.value = false;
    installPromptEvent = null;
    
    // Show success message
    console.log('[PWA] App was installed');
};

onMounted(() => {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Also check if prompt is already available
    if (window.deferredInstallPrompt) {
        installPromptEvent = window.deferredInstallPrompt;
        schedulePrompt();
    }
});

onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.removeEventListener('appinstalled', handleAppInstalled);
});

const dismiss = () => {
    showPrompt.value = false;
    setDismissed();
};

const install = async () => {
    if (!installPromptEvent) {
        return;
    }
    
    installing.value = true;
    
    // Show the install prompt
    installPromptEvent.prompt();
    
    // Wait for the user to respond
    const { outcome } = await installPromptEvent.userChoice;
    
    if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
    } else {
        console.log('[PWA] User dismissed the install prompt');
        setDismissed();
    }
    
    // Clear the deferred prompt
    installPromptEvent = null;
    installing.value = false;
    showPrompt.value = false;
};
</script>
