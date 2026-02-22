<template>
    <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ILoveIMG" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="mask-icon" href="/icon.svg" color="#3b82f6" />
    </Head>

    <div class="min-h-screen bg-slate-950 text-white">
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute -top-32 -right-10 w-96 h-96 bg-primary-500/30 blur-[180px] rounded-full"
            ></div>
            <div
                class="absolute top-1/3 -left-24 w-[28rem] h-[28rem] bg-blue-500/20 blur-[200px] rounded-full"
            ></div>
        </div>

        <!-- Header -->
        <header
            class="sticky top-0 z-40 backdrop-blur-md bg-slate-950/75 border-b border-white/10"
        >
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <Link
                        :href="route('home')"
                        class="flex items-center space-x-3"
                    >
                        <img
                            src="/ilvimg.png"
                            alt="ILoveIMG Studio logo"
                            class="w-11 h-11 rounded-2xl shadow-lg shadow-primary-900/30 object-cover"
                            loading="lazy"
                        />
                        <div>
                            <p class="text-lg font-bold tracking-wide">
                                ILoveIMG Studio
                            </p>
                            <p class="text-xs text-white/60">
                                Private · Instant · Pixel-perfect
                            </p>
                        </div>
                    </Link>

                    <div
                        class="hidden md:flex items-center space-x-1 text-sm font-medium"
                    >
                        <Link :href="route('home')" class="nav-link">
                            Tools
                        </Link>
                        <Link
                            :href="route('tools.image-workbench')"
                            class="nav-link"
                        >
                            Workbench
                        </Link>
                        <Link
                            :href="route('home') + '#features'"
                            class="nav-link"
                        >
                            Features
                        </Link>
                    </div>

                    <div class="flex items-center gap-3">
                        <!-- Install App Button (small icon only) -->
                        <button
                            v-if="showInstallBtn"
                            @click="triggerInstall"
                            class="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition"
                            title="Install app"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                        
                        <span
                            class="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-white/10 text-white/70"
                        >
                            100% client-side
                        </span>
                        <Link
                            :href="route('tools.image-workbench')"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-slate-900 text-sm font-semibold shadow-lg shadow-white/20 hover:-translate-y-0.5 transition"
                        >
                            Launch Workbench
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5 12h14m-6-6 6 6-6 6"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Main Content -->
        <main
            class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <slot />
        </main>

        <!-- PWA Install Prompt -->
        <PwaInstallPrompt />

        <!-- Footer -->
        <footer class="relative z-10 border-t border-white/10 mt-16">
            <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div
                    class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70"
                >
                    <p>
                        © 2025-2026 ILoveIMG Studio. Crafted with ❤️ by 
                        <a href="https://codezela.com" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300">Codezela Technologies</a> 
                        for modern browsers. Images stay on your device.
                    </p>
                    <div class="flex items-center gap-4">
                        <Link :href="route('privacy')" class="hover:text-white"
                            >Privacy</Link
                        >
                        <span class="text-white/30">·</span>
                        <Link :href="route('terms')" class="hover:text-white"
                            >Terms</Link
                        >
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, Head } from "@inertiajs/vue3";
import PwaInstallPrompt from '../../../Components/PwaInstallPrompt.vue';

const showInstallBtn = ref(false);
let installPrompt = null;

const checkStandalone = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           window.location.search.includes('?standalone');
};

onMounted(() => {
    // Check standalone status
    if (checkStandalone()) {
        showInstallBtn.value = false;
        return;
    }
    
    // Show install button (always visible for non-PWA, helps users find it)
    showInstallBtn.value = true;
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        installPrompt = e;
        window.deferredInstallPrompt = e;
    });
    
    // Check if already stored
    if (window.deferredInstallPrompt) {
        installPrompt = window.deferredInstallPrompt;
    }
    
    // Also hide if app gets installed
    window.addEventListener('appinstalled', () => {
        showInstallBtn.value = false;
    });
});

const triggerInstall = async () => {
    const prompt = installPrompt || window.deferredInstallPrompt;
    
    if (prompt) {
        prompt.prompt();
        const { outcome } = await prompt.userChoice;
        if (outcome === 'accepted') {
            showInstallBtn.value = false;
        }
    } else {
        alert('To install:\n\n1. Click the ⋯ menu in Edge\n2. Go to Apps → Install this site as an app');
    }
};
</script>
