<template>
    <Head>
        <title>{{ fullTitle }}</title>
        <meta name="description" :content="metaDescription" />
        <meta name="keywords" :content="metaKeywords" />
        <meta name="author" content="ILoveIMG Studio" />
        <meta name="robots" :content="robots" />
        <link rel="canonical" :href="canonicalUrl" />

        <meta property="og:type" content="website" />
        <meta property="og:title" :content="fullTitle" />
        <meta property="og:description" :content="metaDescription" />
        <meta property="og:url" :content="canonicalUrl" />
        <meta property="og:image" :content="shareImage" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="fullTitle" />
        <meta name="twitter:description" :content="metaDescription" />
        <meta name="twitter:image" :content="shareImage" />
    </Head>
</template>

<script setup>
import { computed } from 'vue';
import { Head, usePage } from '@inertiajs/vue3';

const props = defineProps({
    title: String,
    description: String,
    keywords: {
        type: [String, Array],
        default: () => [],
    },
    robots: {
        type: String,
        default: 'index,follow',
    },
    image: String,
    url: String,
});

const appName = 'ILoveIMG Studio';
const defaultDescription =
    'ILoveIMG Studio offers 100% client-side tools for image conversion, compression, resizing, and editing without leaving your browser.';
const defaultKeywords = ['image tools', 'convert images', 'compress images', 'resize images', 'browser image editor', 'heic to jpg'];

const page = usePage();

const fullTitle = computed(() => {
    if (props.title) {
        return `${props.title} | ${appName}`;
    }
    return `${appName} – Private browser-based image toolkit`;
});

const metaDescription = computed(() => props.description || defaultDescription);
const metaKeywords = computed(() => {
    if (Array.isArray(props.keywords) && props.keywords.length) {
        return props.keywords.join(', ');
    }
    if (typeof props.keywords === 'string' && props.keywords.trim()) {
        return props.keywords;
    }
    return defaultKeywords.join(', ');
});

const resolveShareImage = () => {
    if (props.image) return props.image;
    if (typeof window !== 'undefined' && window.location) {
        return `${window.location.origin}/ilvimg.png`;
    }
    return '/ilvimg.png';
};

const canonicalUrl = computed(() => {
    if (props.url) return props.url;
    const origin = typeof window !== 'undefined' && window.location ? window.location.origin : page.props?.appUrl || '';
    return `${origin}${page.url}`;
});

const robots = computed(() => props.robots || 'index,follow');
const shareImage = computed(resolveShareImage);
</script>
