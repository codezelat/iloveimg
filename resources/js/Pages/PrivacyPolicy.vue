<template>
    <AppLayout>
        <SeoHead
            title="Privacy Policy"
            description="ILoveIMG Studio Privacy Policy - Your images never leave your browser. Learn how we protect your data with client-side processing."
            :keywords="['privacy policy', 'data protection', 'client-side processing', 'image privacy']"
        />
        <div class="max-w-4xl mx-auto px-4 py-16 space-y-12">
            <!-- Header -->
            <header class="text-center space-y-4">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-orange-400/20 mb-4">
                    <svg class="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                    </svg>
                </div>
                <h1 class="text-4xl font-bold text-white">Privacy Policy</h1>
                <p class="text-xl text-white/60 max-w-2xl mx-auto">
                    Your images are yours alone. We process everything in your browser — nothing is ever uploaded to our servers.
                </p>
            </header>

            <!-- Last Updated -->
            <div class="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <p class="text-sm text-white/50">Last updated: February 23, 2026</p>
            </div>

            <!-- Core Promise -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-sm">✓</span>
                    Our Core Privacy Promise
                </h2>
                <div class="rounded-3xl border border-green-500/20 bg-green-500/5 p-8">
                    <p class="text-lg text-white/90 leading-relaxed mb-4">
                        <strong class="text-green-400">ILoveIMG Studio operates entirely in your browser.</strong> 
                        This means:
                    </p>
                    <ul class="space-y-3 text-white/80">
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            <span>Your images <strong>never leave your device</strong> — all processing happens locally using WebAssembly</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            <span>We <strong>cannot see, access, or store</strong> any of your images or files</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            <span>No user accounts, no tracking pixels, no advertising cookies</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            <span>Works offline after first load — no internet connection required for processing</span>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Data Collection -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">What Data We Collect</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 mb-4">We collect the absolute minimum data necessary:</p>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b border-white/10">
                                    <th class="pb-3 text-white font-medium">Data Type</th>
                                    <th class="pb-3 text-white font-medium">Purpose</th>
                                    <th class="pb-3 text-white font-medium">Retention</th>
                                </tr>
                            </thead>
                            <tbody class="text-white/70 text-sm">
                                <tr class="border-b border-white/5">
                                    <td class="py-3">Basic Analytics</td>
                                    <td class="py-3">Page views, feature usage (aggregated, anonymous)</td>
                                    <td class="py-3">90 days</td>
                                </tr>
                                <tr class="border-b border-white/5">
                                    <td class="py-3">Error Logs</td>
                                    <td class="py-3">JavaScript errors to fix bugs (no image data)</td>
                                    <td class="py-3">30 days</td>
                                </tr>
                                <tr>
                                    <td class="py-3">Server Logs</td>
                                    <td class="py-3">IP address, user agent for security (rotated)</td>
                                    <td class="py-3">7 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <p class="text-white/60 text-sm mt-4">
                        <strong>We explicitly do NOT collect:</strong> Your images, filenames, file contents, or any personal information you upload.
                    </p>
                </div>
            </section>

            <!-- Technical Implementation -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">How Our Technology Works</h2>
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h3 class="text-lg font-medium text-white mb-3">Client-Side Processing</h3>
                        <p class="text-white/70 text-sm leading-relaxed">
                            All image conversion, compression, and manipulation happens in your browser using WebAssembly and the Canvas API. 
                            We use libraries like libheif-js for HEIC support, which run entirely on your device.
                        </p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h3 class="text-lg font-medium text-white mb-3">No Cloud Uploads</h3>
                        <p class="text-white/70 text-sm leading-relaxed">
                            Unlike most image tools, we never send your files to remote servers. 
                            The File API and FileReader work locally, and converted images are downloaded directly from browser memory.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Cookies -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">Cookies & Storage</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <ul class="space-y-2 text-white/80">
                        <li>• <strong>No tracking cookies</strong> — we don't use Google Analytics, Facebook Pixel, or similar</li>
                        <li>• <strong>No advertising cookies</strong> — we don't show ads or share data with advertisers</li>
                        <li>• <strong>Optional local storage</strong> — if we add preferences in the future, they'll be opt-in only</li>
                        <li>• <strong>Session-only processing</strong> — converted files exist only in memory until you download them</li>
                    </ul>
                </div>
            </section>

            <!-- Third Parties -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">Third-Party Services</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 mb-4">We use the minimal third-party services:</p>
                    <ul class="space-y-3 text-white/70">
                        <li class="flex items-start gap-3">
                            <span class="text-white/40 font-mono text-sm">CDN</span>
                            <span>jsDelivr (for library delivery) — doesn't process your images</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-white/40 font-mono text-sm">Fonts</span>
                            <span>Google Fonts (CSS only) — no tracking</span>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Your Rights -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">Your Rights</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 mb-4">Under GDPR, CCPA, and similar regulations:</p>
                    <ul class="space-y-2 text-white/70">
                        <li>• <strong>Right to know:</strong> See exactly what data we have (almost nothing)</li>
                        <li>• <strong>Right to delete:</strong> Request deletion of any server logs</li>
                        <li>• <strong>Right to portability:</strong> Your images are always yours to download</li>
                        <li>• <strong>Right to opt-out:</strong> Block analytics with standard ad blockers</li>
                    </ul>
                </div>
            </section>

            <!-- Contact -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">Contact Us</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80">
                        Questions about privacy? Contact us at 
                        <a href="mailto:info@codezela.com" class="text-primary-400 hover:text-primary-300">info@codezela.com</a>
                    </p>
                </div>
            </section>

            <!-- Back to Home -->
            <div class="text-center pt-8">
                <a href="/" class="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Back to ILoveIMG Studio
                </a>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from './Components/Layout/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';
</script>
