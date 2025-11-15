<template>
    <AppLayout>
        <div class="px-4 max-w-4xl mx-auto">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ toolName }}</h1>
                <p class="text-lg text-gray-600">{{ description }}</p>
            </div>

            <FileUploader @files-selected="handleFilesSelected" />
            
            <div v-if="selectedFiles.length > 0" class="mt-6 bg-white rounded-xl shadow-lg p-6">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Rotation Angle</label>
                    <div class="flex gap-2">
                        <button @click="degrees = 90" :class="['px-4 py-2 rounded', degrees === 90 ? 'bg-primary-600 text-white' : 'bg-gray-200']">90°</button>
                        <button @click="degrees = 180" :class="['px-4 py-2 rounded', degrees === 180 ? 'bg-primary-600 text-white' : 'bg-gray-200']">180°</button>
                        <button @click="degrees = 270" :class="['px-4 py-2 rounded', degrees === 270 ? 'bg-primary-600 text-white' : 'bg-gray-200']">270°</button>
                    </div>
                </div>
                <button @click="processFiles" class="btn-primary w-full">Rotate Images</button>
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

const { rotateImage, downloadFiles } = useImageProcessor();

const selectedFiles = ref([]);
const degrees = ref(90);

const handleFilesSelected = (files) => {
    selectedFiles.value = files;
};

const processFiles = async () => {
    const processed = [];
    for (const file of selectedFiles.value) {
        const result = await rotateImage(file, degrees.value);
        processed.push(result);
    }
    downloadFiles(processed);
};
</script>
