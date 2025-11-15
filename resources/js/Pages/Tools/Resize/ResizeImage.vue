<template>
    <AppLayout>
        <div class="px-4 max-w-4xl mx-auto">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ toolName }}</h1>
                <p class="text-lg text-gray-600">{{ description }}</p>
            </div>

            <FileUploader 
                @files-selected="handleFilesSelected"
            />
            
            <div v-if="selectedFiles.length > 0" class="mt-6 bg-white rounded-xl shadow-lg p-6">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Width (px)</label>
                        <input v-model.number="width" type="number" class="w-full border border-gray-300 rounded-lg px-4 py-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Height (px)</label>
                        <input v-model.number="height" type="number" class="w-full border border-gray-300 rounded-lg px-4 py-2" />
                    </div>
                </div>
                <div class="mb-4">
                    <label class="flex items-center">
                        <input v-model="maintainAspect" type="checkbox" class="mr-2" />
                        <span class="text-sm text-gray-700">Maintain aspect ratio</span>
                    </label>
                </div>
                <button @click="processFiles" class="btn-primary w-full">
                    Resize Images
                </button>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from '../../Components/Layout/AppLayout.vue';
import FileUploader from '../../Components/UI/FileUploader.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

defineProps({
    toolName: String,
    description: String
});

const { resizeImage, downloadFiles } = useImageProcessor();

const selectedFiles = ref([]);
const width = ref(800);
const height = ref(600);
const maintainAspect = ref(true);

const handleFilesSelected = (files) => {
    selectedFiles.value = files;
};

const processFiles = async () => {
    const processed = [];
    for (const file of selectedFiles.value) {
        const result = await resizeImage(file, width.value, height.value, maintainAspect.value);
        processed.push(result);
    }
    downloadFiles(processed);
};
</script>
