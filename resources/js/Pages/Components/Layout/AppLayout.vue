<template>
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
import { Link } from "@inertiajs/vue3";
</script>
