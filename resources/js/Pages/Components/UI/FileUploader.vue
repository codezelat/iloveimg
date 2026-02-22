<template>
    <div class="w-full space-y-6">
        <div
            class="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-10 text-center transition-all duration-200"
            :class="isDragging ? 'ring-2 ring-offset-2 ring-primary-400 ring-offset-white/10 scale-[1.01]' : ''"
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
        >
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
                <div class="absolute -bottom-10 -right-6 w-48 h-48 bg-primary-500/20 blur-3xl rounded-full"></div>
            </div>

            <input
                ref="fileInput"
                type="file"
                :accept="accept"
                :multiple="multiple"
                @change="handleFileSelect"
                class="hidden"
            />

            <div class="relative z-10 space-y-6">
                <div class="mx-auto w-20 h-20 rounded-[22px] bg-white/10 flex items-center justify-center shadow-inner shadow-white/20">
                    <svg class="w-10 h-10 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5V8.25A2.25 2.25 0 0 1 5.25 6h2.128a2.25 2.25 0 0 1 1.59.659l.872.872A2.25 2.25 0 0 0 11.43 8.25H18.75A2.25 2.25 0 0 1 21 10.5V16.5A3.75 3.75 0 0 1 17.25 20.25H6.75A3.75 3.75 0 0 1 3 16.5Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9 13 2.25 2.25L15 11.25M9 18h6" />
                    </svg>
                </div>
                <div class="space-y-2">
                    <p class="text-2xl font-semibold tracking-tight text-white">Drop your {{ fileType }} here</p>
                    <p class="text-sm text-white/60">Supports drag & drop, clipboard paste, or browsing from your device.</p>
                </div>
                <div class="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-widest text-white/60">
                    <span class="px-3 py-1 rounded-full bg-white/10">Unlimited batch</span>
                    <span class="px-3 py-1 rounded-full bg-white/10">No upload</span>
                    <span class="px-3 py-1 rounded-full bg-white/10">{{ acceptLabel }}</span>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-4">
                    <button type="button" class="btn-primary" @click="$refs.fileInput.click()">
                        Select Files
                    </button>
                    <button type="button" class="btn-secondary" @click="selectedFiles.length ? updateSelection([]) : $refs.fileInput.click()">
                        {{ selectedFiles.length ? 'Clear Selection' : 'Browse Files' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showSelectionPreview && selectedFiles.length" class="space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p class="text-sm uppercase tracking-[0.3em] text-white/60">Queue</p>
                    <p class="text-lg font-semibold text-white">
                        {{ selectedFiles.length }} file{{ selectedFiles.length === 1 ? '' : 's' }} · {{ totalSizeLabel }}
                    </p>
                </div>
                <button class="text-sm text-primary-200 hover:text-primary-100" @click="updateSelection([])">Reset</button>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="(file, index) in selectedFiles"
                    :key="index"
                    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                    <div class="flex items-start justify-between gap-3">
                        <div class="space-y-1 min-w-0">
                            <p class="text-sm font-semibold text-white truncate">{{ file.name }}</p>
                            <p class="text-xs text-white/60">{{ formatFileSize(file.size) }} · {{ file.type || 'Unknown' }}</p>
                        </div>
                        <button class="text-white/50 hover:text-white" @click="removeFile(index)">
                            <span aria-hidden="true">✕</span>
                        </button>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-xs text-white/50">
                        <span>Ready</span>
                        <span>Local</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

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
    },
    modelValue: Array,
    showSelectionPreview: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['filesSelected', 'update:modelValue']);

const fileInput = ref(null);
const selectedFiles = ref([]);
const isDragging = ref(false);
const acceptLabel = computed(() => {
    if (props.accept === 'image/*' || !props.accept) return 'Any image type';
    return props.accept
        .split(',')
        .map((item) => item.replace('image/', '').toUpperCase())
        .join(' • ');
});
const totalSizeLabel = computed(() =>
    formatFileSize(selectedFiles.value.reduce((sum, file) => sum + (file.size || 0), 0))
);

watch(
    () => props.modelValue,
    (value) => {
        if (value === undefined) return;
        selectedFiles.value = Array.isArray(value) ? [...value] : [];
    },
    { immediate: true }
);

const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    addFiles(files);
};

const handleDrop = (event) => {
    isDragging.value = false;
    const files = Array.from(event.dataTransfer.files);
    addFiles(files);
};

const updateSelection = (files) => {
    selectedFiles.value = files;
    emit('update:modelValue', files);
    emit('filesSelected', files);
};

const addFiles = (files) => {
    updateSelection([...selectedFiles.value, ...files]);
};

const removeFile = (index) => {
    const updated = [...selectedFiles.value];
    updated.splice(index, 1);
    updateSelection(updated);
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
</script>
