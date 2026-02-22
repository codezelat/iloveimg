<template>
    <AppLayout>
        <SeoHead
            title="All-in-one browser image toolkit"
            description="Process HEIC, JPG, PNG, GIF, WEBP, BMP, and TIFF files entirely in your browser with ILoveIMG Studio's 26+ tools."
            :keywords="['image toolkit', 'heic to jpg', 'compress images', 'browser image editor']"
        />
        <div class="space-y-16">
            <section class="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/10 p-12">
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute -top-16 left-10 w-64 h-64 bg-primary-500/20 blur-[120px] rounded-full"></div>
                    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[160px] rounded-full"></div>
                </div>
                <div class="relative z-10 grid gap-10 lg:grid-cols-2">
                    <div class="space-y-6">
                        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
                            Trusted toolkit · Browser native
                        </span>
                        <h1 class="text-4xl sm:text-5xl font-semibold leading-tight">
                            All-in-one image studio for instant, private workflows.
                        </h1>
                        <p class="text-lg text-white/70 max-w-2xl">
                            33+ pro-grade tools for conversion, compression, resizing, and editing — all powered by the Canvas API directly in your browser (now including HEIC, HEIF, and AVIF support).
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <Link :href="route('tools.image-workbench')" class="btn-primary">
                                Launch Workbench
                            </Link>
                            <Link :href="route('home') + '#tools'" class="btn-secondary">
                                Browse All Tools
                            </Link>
                        </div>
                        <div class="flex flex-wrap gap-5 text-sm text-white/60">
                            <div>
                                <p class="text-2xl font-semibold text-white">0</p>
                                <p>Uploads to server</p>
                            </div>
                            <div>
                                <p class="text-2xl font-semibold text-white">33</p>
                                <p>Specialized utilities</p>
                            </div>
                            <div>
                                <p class="text-2xl font-semibold text-white">∞</p>
                                <p>Batch capacity</p>
                            </div>
                        </div>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div v-for="stat in heroHighlights" :key="stat.label" class="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <p class="text-3xl font-semibold text-white">{{ stat.value }}</p>
                            <p class="text-sm text-white/60">{{ stat.label }}</p>
                        </div>
                    </div>
                </div>

                <div class="relative z-10 mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                    <div class="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5">
                        <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                        </svg>
                        <input
                            v-model="searchTerm"
                            type="search"
                            placeholder="Search formats, e.g. WEBP, HEIC, resize"
                            class="w-full bg-transparent py-4 text-white placeholder-white/50 focus:outline-none"
                        />
                        <span v-if="searchTerm" class="text-xs text-white/60 cursor-pointer" @click="searchTerm = ''">Clear</span>
                    </div>
                    <div class="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                        <p class="font-semibold text-white/80">Zero learning curve</p>
                        <p class="mt-1">Drag, drop, process, download. Every tool keeps the same workspace experience.</p>
                    </div>
                </div>
            </section>

            <section id="features" class="space-y-6">
                <div class="flex flex-col gap-3">
                    <p class="text-sm uppercase tracking-[0.4em] text-white/60">Why ILoveIMG</p>
                    <h2 class="text-3xl font-semibold text-white">Privacy-first by design</h2>
                    <p class="text-white/60">Performance tuned, fully offline, no compromises on quality.</p>
                </div>
                <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <div v-for="feature in featureCards" :key="feature.title" class="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
                        <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                            {{ feature.icon }}
                        </div>
                        <div>
                            <p class="text-lg font-semibold text-white">{{ feature.title }}</p>
                            <p class="text-sm text-white/60">{{ feature.description }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="tools" class="space-y-10">
                <div class="flex flex-col gap-2">
                    <p class="text-sm uppercase tracking-[0.4em] text-white/60">Toolset</p>
                    <h2 class="text-3xl font-semibold text-white">Every format, every workflow.</h2>
                    <p class="text-white/60">{{ filteredCountCopy }}</p>
                </div>

                <div v-if="filteredCategories.length" class="space-y-10">
                    <div v-for="category in filteredCategories" :key="category.name" class="space-y-4">
                        <div class="flex items-center gap-3">
                            <span class="text-4xl">{{ category.icon }}</span>
                            <div>
                                <h3 class="text-2xl font-semibold text-white">{{ category.name }}</h3>
                                <p class="text-sm text-white/60">{{ category.tools.length }} specialized actions</p>
                            </div>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <Link
                                v-for="tool in category.tools"
                                :key="tool.path"
                                :href="`/${tool.path}`"
                                class="rounded-3xl border border-white/10 bg-white/5 p-5 hover:border-primary-400/60 transition group"
                            >
                                <div class="flex items-center justify-between">
                                    <p class="font-semibold text-white">{{ tool.name }}</p>
                                    <span class="text-white/50 group-hover:text-white">→</span>
                                </div>
                                <p class="text-xs text-white/50 mt-3">Instant · Local</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-white/70">
                    No tools match “{{ searchTerm }}”. Try another format.
                </div>
            </section>

            <section class="rounded-[32px] border border-white/10 bg-white/5 p-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p class="text-sm uppercase tracking-[0.4em] text-white/60">Advanced Suite</p>
                    <h2 class="text-3xl font-semibold text-white">Image Workbench</h2>
                    <p class="text-white/60 max-w-2xl">Chain resize, filters, conversion, and metadata cleanup in one pass. Built for content teams that need repeatable results.</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <Link :href="route('tools.image-workbench')" class="btn-primary">Launch Workbench</Link>
                    <a href="#features" class="btn-secondary">See capabilities</a>
                </div>
            </section>
        </div>
    </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import AppLayout from './Components/Layout/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';

const props = defineProps({
    tools: {
        type: Array,
        default: () => [],
    },
});

const searchTerm = ref('');

const normalizedCategories = computed(() => props.tools || []);

const filteredCategories = computed(() => {
    const term = searchTerm.value.trim().toLowerCase();
    if (!term) return normalizedCategories.value;
    return normalizedCategories.value
        .map((category) => {
            const filteredTools = category.tools.filter((tool) =>
                tool.name.toLowerCase().includes(term) || tool.path.toLowerCase().includes(term)
            );
            return { ...category, tools: filteredTools };
        })
        .filter((category) => category.tools.length);
});

const filteredCountCopy = computed(() => {
    const total = filteredCategories.value.reduce((sum, category) => sum + category.tools.length, 0);
    if (!total) return 'No matches yet.';
    return `${total} tailored experiences ready to go.`;
});

const heroHighlights = [
    { label: 'Formats covered', value: '12+ (incl. HEIC)' },
    { label: 'Compression presets', value: '4 levels' },
    { label: 'Resize strategies', value: '3 modes' },
    { label: 'Utility extras', value: 'Base64, watermark, more' },
];

const featureCards = [
    { icon: '🔒', title: 'Instant privacy', description: 'Images never leave your device. Canvas-only processing keeps everything local.' },
    { icon: '⚡', title: 'Speed obsessed', description: 'GPU-accelerated canvas rendering, efficient batching, and zero network hops.' },
    { icon: '📱', title: 'HEIC & AVIF ready', description: 'Import HEIC/HEIF from iPhone or next-gen AVIF images and convert them offline in one tap.' },
    { icon: '🧰', title: 'Full toolkit', description: 'Conversion, compression, resize, edit, and utilities in one place.' },
];
</script>
