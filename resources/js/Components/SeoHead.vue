<template>
    <Head>
        <title>{{ fullTitle }}</title>
        <meta name="description" :content="metaDescription" />
        <meta name="keywords" :content="metaKeywords" />
        <meta name="author" content="ILoveIMG Studio" />
        <meta name="robots" :content="robots" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" :href="canonicalUrl" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" :content="ogType" />
        <meta property="og:site_name" content="ILoveIMG Studio" />
        <meta property="og:title" :content="fullTitle" />
        <meta property="og:description" :content="metaDescription" />
        <meta property="og:url" :content="canonicalUrl" />
        <meta property="og:image" :content="shareImage" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codezela" />
        <meta name="twitter:creator" content="@codezela" />
        <meta name="twitter:title" :content="fullTitle" />
        <meta name="twitter:description" :content="metaDescription" />
        <meta name="twitter:image" :content="shareImage" />
        <meta name="twitter:image:alt" :content="fullTitle" />

        <!-- JSON-LD Structured Data -->
        <script type="application/ld+json">{{ jsonLdString }}</script>
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
    type: {
        type: String,
        default: 'website',
    },
});

const appName = 'ILoveIMG Studio';
const defaultDescription =
    'ILoveIMG Studio offers 100% client-side tools for image conversion, compression, resizing, and editing without leaving your browser.';
const defaultKeywords = [
    'image tools',
    'convert images',
    'compress images',
    'resize images',
    'browser image editor',
    'heic to jpg',
    'avif converter',
    'svg to png',
    'privacy focused',
    'offline image processing',
];

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

const ogType = computed(() => props.type || 'website');

const resolveShareImage = () => {
    if (props.image) return props.image;
    if (typeof window !== 'undefined' && window.location) {
        return `${window.location.origin}/ilvimg.png`;
    }
    return '/ilvimg.png';
};

const canonicalUrl = computed(() => {
    if (props.url) return props.url;
    const origin =
        typeof window !== 'undefined' && window.location
            ? window.location.origin
            : page.props?.appUrl || '';
    return `${origin}${page.url}`;
});

const robots = computed(() => props.robots || 'index,follow');
const shareImage = computed(resolveShareImage);

// JSON-LD Structured Data
const jsonLdData = computed(() => {
    const baseSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: appName,
        description: metaDescription.value,
        url: canonicalUrl.value,
        applicationCategory: 'PhotoApplication',
        operatingSystem: 'Any (Browser-based)',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: [
            '100% client-side processing',
            'No uploads required',
            '33+ image tools',
            'Privacy focused',
            'Works offline',
            'PWA support',
        ],
        browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas.',
        softwareVersion: '1.1.0',
        author: {
            '@type': 'Organization',
            name: 'Codezela Technologies',
            url: 'https://codezela.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://codezela.com/logo.png',
            },
        },
        publisher: {
            '@type': 'Organization',
            name: 'Codezela Technologies',
            url: 'https://codezela.com',
        },
        inLanguage: 'en',
        license: 'https://iloveimg.codezela.com/terms',
        image: shareImage.value,
    };

    // Add WebSite schema for homepage
    if (page.url === '/' || page.url === '') {
        return [
            baseSchema,
            {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: appName,
                url: canonicalUrl.value,
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${canonicalUrl.value}?search={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                },
            },
        ];
    }

    // Add SoftwareApplication schema for tool pages
    if (props.title && props.title.includes('to')) {
        return {
            ...baseSchema,
            '@type': 'SoftwareApplication',
            name: `${props.title} - ${appName}`,
            applicationSubCategory: 'Image Conversion Tool',
        };
    }

    return baseSchema;
});

const jsonLdString = computed(() => JSON.stringify(jsonLdData.value));
</script>
