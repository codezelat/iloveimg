<template>
    <AppLayout>
        <SeoHead
            title="Terms of Service"
            description="ILoveIMG Studio Terms of Service - Free browser-based image processing tools with client-side processing."
            :keywords="['terms of service', 'terms and conditions', 'usage policy', 'image tools']"
        />
        <div class="max-w-4xl mx-auto px-4 py-16 space-y-12">
            <!-- Header -->
            <header class="text-center space-y-4">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-orange-400/20 mb-4">
                    <svg class="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>
                    </svg>
                </div>
                <h1 class="text-4xl font-bold text-white">Terms of Service</h1>
                <p class="text-xl text-white/60 max-w-2xl mx-auto">
                    By using ILoveIMG Studio, you agree to these terms. Please read them carefully.
                </p>
            </header>

            <!-- Last Updated -->
            <div class="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <p class="text-sm text-white/50">Last updated: February 23, 2026</p>
            </div>

            <!-- 1. Acceptance -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed">
                        By accessing or using ILoveIMG Studio ("the Service"), you agree to be bound by these Terms of Service. 
                        If you disagree with any part of the terms, you may not access the Service.
                    </p>
                </div>
            </section>

            <!-- 2. Description -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">2. Description of Service</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed mb-4">
                        ILoveIMG Studio provides browser-based image processing tools including:
                    </p>
                    <ul class="grid gap-2 md:grid-cols-2 text-white/70">
                        <li>• Format conversion (HEIC, PNG, JPG, WebP, etc.)</li>
                        <li>• Image compression</li>
                        <li>• Resize and crop</li>
                        <li>• Rotation and flipping</li>
                        <li>• Watermarking</li>
                        <li>• Base64 encoding/decoding</li>
                    </ul>
                    <p class="text-white/70 mt-4">
                        <strong class="text-white">Important:</strong> All processing happens client-side in your browser. 
                        We do not process, store, or have access to your images.
                    </p>
                </div>
            </section>

            <!-- 3. User Content -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">3. Your Content</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-medium text-white mb-2">3.1 Ownership</h3>
                        <p class="text-white/70">
                            You retain all rights to your images. We claim no ownership over your content. 
                            By using our Service, you grant us no license to use, modify, or distribute your images.
                        </p>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium text-white mb-2">3.2 Responsibility</h3>
                        <p class="text-white/70">
                            You are solely responsible for the images you process using our Service. 
                            You represent that you have all necessary rights to process these images and that doing so doesn't violate any third-party rights.
                        </p>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium text-white mb-2">3.3 Content Restrictions</h3>
                        <p class="text-white/70 mb-2">You may not use the Service to process content that:</p>
                        <ul class="text-white/70 space-y-1">
                            <li>• Is illegal, harmful, threatening, or discriminatory</li>
                            <li>• Infringes on intellectual property rights</li>
                            <li>• Contains malware, viruses, or malicious code</li>
                            <li>• Violates any applicable laws or regulations</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 4. Acceptable Use -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">4. Acceptable Use</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 mb-4">You agree not to:</p>
                    <ul class="space-y-2 text-white/70">
                        <li>• Use the Service in any way that could damage, disable, or impair our servers</li>
                        <li>• Attempt to gain unauthorized access to any part of the Service</li>
                        <li>• Use automated scripts, bots, or scrapers to access the Service</li>
                        <li>• Circumvent any security measures or rate limits</li>
                        <li>• Use the Service for any illegal purpose</li>
                        <li>• Upload files containing malware or exploits</li>
                    </ul>
                </div>
            </section>

            <!-- 5. Limitations -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">5. Service Limitations</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <ul class="space-y-3 text-white/70">
                        <li>
                            <strong class="text-white">File Size:</strong> 
                            Individual files are limited to 100MB. Larger files may cause browser performance issues.
                        </li>
                        <li>
                            <strong class="text-white">Browser Support:</strong> 
                            Modern browsers (Chrome, Firefox, Safari, Edge) are supported. IE11 is not supported.
                        </li>
                        <li>
                            <strong class="text-white">Processing Time:</strong> 
                            Large files or batches may take significant time. Processing depends on your device's capabilities.
                        </li>
                        <li>
                            <strong class="text-white">Availability:</strong> 
                            We aim for 99% uptime but do not guarantee uninterrupted service.
                        </li>
                    </ul>
                </div>
            </section>

            <!-- 6. Disclaimer -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">6. Disclaimer of Warranties</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed">
                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                        EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
                        FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                    </p>
                    <p class="text-white/70 mt-4">
                        We do not guarantee that:
                    </p>
                    <ul class="text-white/70 mt-2 space-y-1">
                        <li>• The Service will meet your specific requirements</li>
                        <li>• The Service will be uninterrupted, timely, or error-free</li>
                        <li>• The results from using the Service will be accurate or reliable</li>
                        <li>• Any errors in the Service will be corrected</li>
                    </ul>
                </div>
            </section>

            <!-- 7. Limitation of Liability -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">7. Limitation of Liability</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed">
                        IN NO EVENT SHALL ILOVEIMG STUDIO, ITS CREATORS, OR CONTRIBUTORS BE LIABLE FOR ANY 
                        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT 
                        LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                    </p>
                    <ul class="text-white/70 mt-4 space-y-2">
                        <li>• Your access to or use of, or inability to access or use, the Service</li>
                        <li>• Any conduct or content of any third party on the Service</li>
                        <li>• Any content obtained from the Service</li>
                        <li>• Unauthorized access, use, or alteration of your transmissions or content</li>
                    </ul>
                </div>
            </section>

            <!-- 8. Indemnification -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">8. Indemnification</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed">
                        You agree to defend, indemnify, and hold harmless ILoveIMG Studio and its licensees 
                        from and against any claims, damages, obligations, losses, liabilities, costs, or debt, 
                        and expenses arising from your use of and access to the Service.
                    </p>
                </div>
            </section>

            <!-- 9. Termination -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">9. Termination</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed">
                        We may terminate or suspend your access to the Service immediately, without prior notice 
                        or liability, for any reason, including if you breach these Terms. Upon termination, 
                        your right to use the Service will immediately cease.
                    </p>
                </div>
            </section>

            <!-- 10. Changes -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">10. Changes to Terms</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed">
                        We reserve the right to modify or replace these Terms at any time. We will provide 
                        notice of any changes by updating the "Last updated" date. Your continued use of the 
                        Service after any changes constitutes acceptance of the new Terms.
                    </p>
                </div>
            </section>

            <!-- 11. Governing Law -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">11. Governing Law</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80 leading-relaxed">
                        These Terms shall be governed by and construed in accordance with the laws of the 
                        jurisdiction in which the service provider is established, without regard to its 
                        conflict of law provisions.
                    </p>
                </div>
            </section>

            <!-- Contact -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-white">12. Contact Us</h2>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p class="text-white/80">
                        If you have any questions about these Terms, please contact us at 
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
