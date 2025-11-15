<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <Link :href="route('home')" class="flex items-center">
                            <span class="text-2xl font-bold text-primary-600">ILoveIMG</span>
                        </Link>
                    </div>
                    <div class="flex items-center space-x-4">
                        <Link :href="route('home')" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t mt-12">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p class="text-center text-gray-500 text-sm">
                    © 2025 ILoveIMG. All image processing happens locally in your browser.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>
