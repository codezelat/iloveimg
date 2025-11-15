<template>
    <div class="w-full">
        <div 
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            :class="[
                'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200',
                isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
            ]"
        >
            <input 
                ref="fileInput"
                type="file" 
                :accept="accept"
                :multiple="multiple"
                @change="handleFileSelect"
                class="hidden"
            />
            
            <div class="space-y-4">
                <div class="text-5xl">📁</div>
                <div>
                    <p class="text-lg font-semibold text-gray-700">
                        Drop your {{ fileType }} here
                    </p>
                    <p class="text-sm text-gray-500 mt-2">
                        or click to browse
                    </p>
                </div>
                <button 
                    @click="$refs.fileInput.click()"
                    type="button"
                    class="btn-primary"
                >
                    Select Files
                </button>
            </div>
        </div>

        <!-- Selected Files Preview -->
        <div v-if="selectedFiles.length > 0" class="mt-6 space-y-3">
            <h3 class="text-lg font-semibold text-gray-800">Selected Files:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                    v-for="(file, index) in selectedFiles" 
                    :key="index"
                    class="relative bg-white rounded-lg shadow p-4"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3 flex-1 min-w-0">
                            <div class="text-2xl">🖼️</div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">
                                    {{ file.name }}
                                </p>
                                <p class="text-xs text-gray-500">
                                    {{ formatFileSize(file.size) }}
                                </p>
                            </div>
                        </div>
                        <button 
                            @click="removeFile(index)"
                            class="ml-2 text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    accept: {
        type: String,
        default: 'image/*'
    },
    multiple: {
        type: Boolean,
        default: true
    },
    fileType: {
        type: String,
        default: 'images'
    }
});

const emit = defineEmits(['filesSelected']);

const fileInput = ref(null);
const selectedFiles = ref([]);
const isDragging = ref(false);

const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    addFiles(files);
};

const handleDrop = (event) => {
    isDragging.value = false;
    const files = Array.from(event.dataTransfer.files);
    addFiles(files);
};

const addFiles = (files) => {
    selectedFiles.value = [...selectedFiles.value, ...files];
    emit('filesSelected', selectedFiles.value);
};

const removeFile = (index) => {
    selectedFiles.value.splice(index, 1);
    emit('filesSelected', selectedFiles.value);
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
</script>
