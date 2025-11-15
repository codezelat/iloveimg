<template>
    <AppLayout>
        <div class="px-4">
            <!-- Tool Header -->
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ toolName }}</h1>
                <p class="text-lg text-gray-600">{{ description }}</p>
            </div>

            <!-- Upload Section -->
            <div v-if="!processedFiles.length" class="max-w-4xl mx-auto">
                <FileUploader 
                    :accept="acceptedFormats"
                    :file-type="fileTypeLabel"
                    @files-selected="handleFilesSelected"
                />
                
                <div v-if="selectedFiles.length > 0" class="mt-6 text-center">
                    <button 
                        @click="processFiles"
                        :disabled="isProcessing"
                        class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="isProcessing">Processing...</span>
                        <span v-else>{{ actionButtonText }}</span>
                    </button>
                </div>

                <div v-if="isProcessing" class="mt-4">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-primary-600 h-2.5 rounded-full transition-all duration-300" :style="{ width: progress + '%' }"></div>
                    </div>
                    <p class="text-center text-sm text-gray-600 mt-2">{{ progress }}% Complete</p>
                </div>
            </div>

            <!-- Results Section -->
            <div v-else class="max-w-4xl mx-auto">
                <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold text-gray-800">Processed Files</h2>
                        <button @click="reset" class="text-primary-600 hover:text-primary-700">
                            Process More Files
                        </button>
                    </div>
                    
                    <div class="space-y-3">
                        <div 
                            v-for="(file, index) in processedFiles" 
                            :key="index"
                            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <div class="flex items-center space-x-3">
                                <span class="text-2xl">✅</span>
                                <div>
                                    <p class="font-medium text-gray-900">{{ file.name }}</p>
                                    <p class="text-sm text-gray-500">{{ formatFileSize(file.size) }}</p>
                                </div>
                            </div>
                            <button 
                                @click="downloadFile(file)"
                                class="btn-primary text-sm"
                            >
                                Download
                            </button>
                        </div>
                    </div>

                    <div class="mt-6 text-center">
                        <button 
                            @click="downloadAllFiles"
                            class="btn-primary"
                        >
                            Download All Files
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from '../Layout/AppLayout.vue';
import FileUploader from './FileUploader.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

const props = defineProps({
    toolName: String,
    description: String,
    acceptedFormats: {
        type: String,
        default: 'image/*'
    },
    fileTypeLabel: {
        type: String,
        default: 'images'
    },
    actionButtonText: {
        type: String,
        default: 'Process Images'
    },
    processingFunction: {
        type: Function,
        required: true
    }
});

const {
    isProcessing,
    progress,
    downloadFile: download,
    downloadFiles
} = useImageProcessor();

const selectedFiles = ref([]);
const processedFiles = ref([]);

const handleFilesSelected = (files) => {
    selectedFiles.value = files;
};

const processFiles = async () => {
    isProcessing.value = true;
    progress.value = 0;
    processedFiles.value = [];

    const totalFiles = selectedFiles.value.length;

    for (let i = 0; i < totalFiles; i++) {
        try {
            const processed = await props.processingFunction(selectedFiles.value[i]);
            processedFiles.value.push(processed);
            progress.value = Math.round(((i + 1) / totalFiles) * 100);
        } catch (error) {
            console.error('Error processing file:', error);
        }
    }

    isProcessing.value = false;
};

const downloadFile = (file) => {
    download(file);
};

const downloadAllFiles = () => {
    downloadFiles(processedFiles.value);
};

const reset = () => {
    selectedFiles.value = [];
    processedFiles.value = [];
    progress.value = 0;
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
</script>
