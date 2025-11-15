<template>
    <AppLayout>
        <div class="space-y-12 max-w-4xl mx-auto">
            <header class="space-y-4 text-center">
                <p class="text-sm uppercase tracking-[0.4em] text-white/60">Policy</p>
                <h1 class="text-4xl font-semibold text-white">Privacy, security, and trust.</h1>
                <p class="text-white/70">ILoveIMG Studio is built for people who never want their images leaving their device. This page explains how we honor that promise.</p>
            </header>

            <section class="space-y-8">
                <article class="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                    <h2 class="text-2xl font-semibold text-white">100% client-side processing</h2>
                    <p class="text-white/70">Every upload, transformation, and download happens directly inside your browser using the Canvas API and Web Workers. Files never touch our servers.</p>
                    <ul class="list-disc list-inside text-white/70 space-y-2">
                        <li>No file uploads or telemetry.</li>
                        <li>All conversions and compressions run locally.</li>
                        <li>Downloads are streamed from your device memory.</li>
                    </ul>
                </article>

                <article class="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                    <h2 class="text-2xl font-semibold text-white">Your files stay private</h2>
                    <p class="text-white/70">We do not store, cache, or inspect any files you open with ILoveIMG Studio. When you close the tab, the data disappears with it.</p>
                    <ul class="list-disc list-inside text-white/70 space-y-2">
                        <li>No accounts or tracking pixels.</li>
                        <li>No analytics libraries that fingerprint or profile users.</li>
                        <li>Optional presets or settings are stored in your browser’s local storage only.</li>
                    </ul>
                </article>

                <article class="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                    <h2 class="text-2xl font-semibold text-white">Security practices</h2>
                    <p class="text-white/70">The app is delivered over HTTPS, uses modern CSP headers, and is audited for third-party dependencies. New features go through privacy review before release.</p>
                    <ul class="list-disc list-inside text-white/70 space-y-2">
                        <li>Dependencies are pinned and scanned with npm audit.</li>
                        <li>Service workers only cache static assets—never your media.</li>
                        <li>We monitor frameworks for security advisories.</li>
                    </ul>
                </article>
            </section>

            <section class="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                <h2 class="text-2xl font-semibold text-white">Questions?</h2>
                <p class="text-white/70">Have a compliance or security request? Email <a class="text-primary-200" href="mailto:hello@iloveimg.studio">hello@iloveimg.studio</a> and we’ll respond within two business days.</p>
            </section>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from './Components/Layout/AppLayout.vue';
</script>
