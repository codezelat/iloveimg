<template>
    <AppLayout>
        <SeoHead
            title="Page Not Found"
            description="The page you're looking for doesn't exist. Return to ILoveIMG Studio for image conversion tools."
            :keywords="['404', 'not found', 'error page']"
        />
        <div class="min-h-[70vh] flex items-center justify-center px-4">
            <div class="text-center max-w-2xl mx-auto space-y-8">
                <!-- Animated 404 -->
                <div class="relative">
                    <div class="text-[120px] md:text-[180px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none">
                        404
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-primary-500/30 to-orange-400/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                            <svg class="w-16 h-16 md:w-20 md:h-20 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Message -->
                <div class="space-y-4">
                    <h1 class="text-3xl md:text-4xl font-bold text-white">Page Not Found</h1>
                    <p class="text-lg text-white/60 max-w-md mx-auto">
                        Oops! The page you're looking for seems to have vanished into the digital void. 
                        It might have been moved, deleted, or never existed.
                    </p>
                </div>

                <!-- Suggestions -->
                <div class="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                    <h2 class="text-lg font-semibold text-white mb-4">Popular Tools</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <a href="/heic-to-png" class="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all">
                            <div class="text-2xl mb-2">📱</div>
                            <div class="text-sm font-medium text-white group-hover:text-primary-400">HEIC to PNG</div>
                        </a>
                        <a href="/jpg-to-png" class="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all">
                            <div class="text-2xl mb-2">🖼️</div>
                            <div class="text-sm font-medium text-white group-hover:text-primary-400">JPG to PNG</div>
                        </a>
                        <a href="/compress-jpg" class="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all">
                            <div class="text-2xl mb-2">📉</div>
                            <div class="text-sm font-medium text-white group-hover:text-primary-400">Compress</div>
                        </a>
                        <a href="/image-workbench" class="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all">
                            <div class="text-2xl mb-2">🧰</div>
                            <div class="text-sm font-medium text-white group-hover:text-primary-400">Workbench</div>
                        </a>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="/" class="btn-primary inline-flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        Back to Home
                    </a>
                    <button @click="goBack" class="btn-secondary inline-flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Go Back
                    </button>
                </div>

                <!-- Help -->
                <p class="text-sm text-white/40">
                    Think this is a mistake? 
                    <a href="mailto:info@codezela.com" class="text-primary-400 hover:text-primary-300">Contact support</a>
                </p>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from './Components/Layout/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';

const goBack = () => {
    window.history.back();
};
</script>
