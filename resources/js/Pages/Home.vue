<template>
    <AppLayout>
        <div class="px-4">
            <!-- Hero Section -->
            <div class="text-center py-12">
                <h1 class="text-5xl font-bold text-gray-900 mb-4">
                    ILoveIMG - Free Image Tools
                </h1>
                <p class="text-xl text-gray-600 mb-8">
                    All processing happens locally in your browser. Your images never leave your device.
                </p>
                <div class="flex justify-center space-x-2">
                    <span class="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        ✓ 100% Private
                    </span>
                    <span class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        ✓ No Upload Required
                    </span>
                    <span class="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                        ✓ Unlimited Use
                    </span>
                </div>
            </div>

            <!-- Tools Grid -->
            <div class="space-y-12">
                <div v-for="category in tools" :key="category.name" class="space-y-6">
                    <div class="flex items-center space-x-3">
                        <span class="text-4xl">{{ category.icon }}</span>
                        <h2 class="text-3xl font-bold text-gray-800">{{ category.name }}</h2>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <Link 
                            v-for="tool in category.tools" 
                            :key="tool.path"
                            :href="`/${tool.path}`"
                            class="card hover:scale-105 transform transition-all duration-200 cursor-pointer"
                        >
                            <div class="flex items-center justify-between">
                                <span class="font-semibold text-gray-800">{{ tool.name }}</span>
                                <span class="text-primary-600">→</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <div class="mt-16 bg-white rounded-xl shadow-lg p-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose ILoveIMG?</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="text-4xl mb-4">🔒</div>
                        <h4 class="font-semibold text-lg mb-2">100% Secure</h4>
                        <p class="text-gray-600">All processing happens in your browser. No uploads, no servers.</p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-4">⚡</div>
                        <h4 class="font-semibold text-lg mb-2">Lightning Fast</h4>
                        <p class="text-gray-600">No waiting for uploads or downloads. Process instantly.</p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-4">🎯</div>
                        <h4 class="font-semibold text-lg mb-2">Easy to Use</h4>
                        <p class="text-gray-600">Simple drag-and-drop interface. No technical knowledge required.</p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import AppLayout from './Components/Layout/AppLayout.vue';

defineProps({
    tools: Array
});
</script>
