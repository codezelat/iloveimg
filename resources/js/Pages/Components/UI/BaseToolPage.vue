<template>
    <AppLayout>
        <SeoHead
            :title="toolName"
            :description="description"
            :keywords="seoKeywords"
        />
        <div class="space-y-10">
            <section class="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-10">
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute -top-8 right-0 w-64 h-64 bg-primary-500/30 blur-[140px] rounded-full"></div>
                </div>
                <div class="relative z-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
                    <div class="space-y-4">
                        <p class="text-sm uppercase tracking-[0.4em] text-white/60">Processing Suite</p>
                        <h1 class="text-4xl font-semibold leading-tight">{{ toolName }}</h1>
                        <p class="text-lg text-white/70 max-w-2xl">{{ description }}</p>
                        <div class="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-white/70">
                            <span class="px-4 py-1.5 rounded-full bg-white/10 border border-white/20">{{ fileTypeLabel }}</span>
                            <span class="px-4 py-1.5 rounded-full bg-white/10 border border-white/20">{{ actionButtonText }}</span>
                            <span class="px-4 py-1.5 rounded-full bg-white/10 border border-white/20">100MB Max</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p class="text-xs text-white/50 mb-1">Queued</p>
                            <p class="text-2xl font-semibold">{{ selectedFiles.length }}</p>
                            <p class="text-sm text-white/60">Files</p>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p class="text-xs text-white/50 mb-1">Processed</p>
                            <p class="text-2xl font-semibold">{{ processedFiles.length }}</p>
                            <p class="text-sm text-white/60">Downloads ready</p>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p class="text-xs text-white/50 mb-1">Progress</p>
                            <p class="text-2xl font-semibold">{{ progress }}%</p>
                            <p class="text-sm text-white/60">Live status</p>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p class="text-xs text-white/50 mb-1">Privacy</p>
                            <p class="text-2xl font-semibold">Local</p>
                            <p class="text-sm text-white/60">Never uploaded</p>
                        </div>
                    </div>
                </div>
            </section>

            <div class="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                <section class="rounded-[32px] border border-white/10 bg-white/5 p-8 space-y-6">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p class="text-sm uppercase tracking-[0.4em] text-white/50">Step 1</p>
                            <h2 class="text-2xl font-semibold text-white">Upload workspace</h2>
                        </div>
                        <span class="px-4 py-1 rounded-full text-xs uppercase tracking-widest bg-white/10 text-white/70">Drop · Paste · Browse</span>
                    </div>
                    
                    <!-- File Size Warning -->
                    <div v-if="oversizedFiles.length" class="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                        <p class="text-red-300 font-medium mb-2">⚠️ Files too large</p>
                        <p class="text-sm text-red-200/80">These files exceed 100MB limit:</p>
                        <ul class="text-xs text-red-200/60 mt-1 space-y-1">
                            <li v-for="file in oversizedFiles" :key="file.name">• {{ file.name }} ({{ formatFileSize(file.size) }})</li>
                        </ul>
                    </div>
                    
                    <FileUploader
                        v-model="selectedFiles"
                        :accept="acceptedFormats"
                        :file-type="fileTypeLabel"
                        :show-selection-preview="false"
                        @files-selected="handleFilesSelected"
                    />

                    <div v-if="selectedFiles.length" class="space-y-4">
                        <div class="flex items-center justify-between text-sm text-white/60">
                            <p>{{ validFiles.length }} file{{ validFiles.length === 1 ? '' : 's' }} queued · {{ totalSelectedSize }}</p>
                            <button class="text-primary-200 hover:text-primary-100" @click="reset">
                                Reset
                            </button>
                        </div>
                        <div class="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                            <div
                                v-for="(file, index) in validFiles"
                                :key="`${file.name}-${index}`"
                                class="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                                :class="{ 'border-red-500/30 bg-red-500/5': isFileOversized(file) }"
                            >
                                <div class="flex items-center gap-4 min-w-0">
                                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/60 to-orange-400/60 flex items-center justify-center text-sm font-semibold">
                                        {{ getFileExtension(file) }}
                                    </div>
                                    <div class="min-w-0">
                                        <p class="text-white font-medium truncate">{{ file.name }}</p>
                                        <p class="text-xs" :class="isFileOversized(file) ? 'text-red-400' : 'text-white/60'">
                                            {{ formatFileSize(file.size) }}
                                            <span v-if="isFileOversized(file)" class="text-red-400 ml-2">(Too large)</span>
                                        </p>
                                    </div>
                                </div>
                                <button class="text-white/50 hover:text-white" @click="removeFile(index)">✕</button>
                            </div>
                        </div>
                    </div>
                </section>

                <aside class="rounded-[32px] border border-white/10 bg-white/5 p-8 space-y-6">
                    <div class="space-y-2">
                        <p class="text-sm uppercase tracking-[0.4em] text-white/50">Step 2</p>
                        <h3 class="text-xl font-semibold text-white">Run pipeline</h3>
                        <p class="text-sm text-white/60">Optimized Canvas processing with native quality control.</p>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-white/70">Overall progress</span>
                            <span class="text-white font-semibold">{{ progress }}%</span>
                        </div>
                        <div class="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-orange-400 transition-all duration-300" :style="{ width: progress + '%' }"></div>
                        </div>
                        <p class="text-xs" :class="errorMessage ? 'text-red-400' : 'text-white/50'">{{ statusLabel }}</p>
                    </div>

                    <!-- Show Convert button when no processed files -->
                    <button
                        v-if="!processedFiles.length"
                        class="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="!validFiles.length || isProcessing || isLoadingConverter"
                        @click="processFiles"
                    >
                        <span v-if="isLoadingConverter">
                            <span class="inline-flex items-center gap-2">
                                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                Loading converter...
                            </span>
                        </span>
                        <span v-else-if="isProcessing">Hold tight…</span>
                        <span v-else>{{ actionButtonText }}</span>
                    </button>
                    
                    <!-- Show Download buttons when processed files are ready -->
                    <div v-else class="space-y-3">
                        <button class="btn-primary w-full justify-center" @click="downloadAllFiles">
                            Download All ({{ processedFiles.length }})
                        </button>
                        <button v-if="processedFiles.length > 1" class="btn-secondary w-full justify-center" @click="downloadAsZip">
                            <span v-if="isCreatingZip">
                                <span class="inline-flex items-center gap-2">
                                    <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                    Creating ZIP...
                                </span>
                            </span>
                            <span v-else>Download as ZIP</span>
                        </button>
                        <button class="btn-secondary w-full justify-center" @click="reset">
                            Start New Batch
                        </button>
                    </div>

                    <!-- Custom Options Slot -->
                    <slot name="options"></slot>

                    <!-- EXIF Toggle -->
                    <ExifToggle
                        v-if="validFiles.length && showExifOptions"
                        v-model="preserveExif"
                        :output-format="outputFormat"
                    />

                    <!-- EXIF Info for Selected Files -->
                    <div v-if="validFiles.length && showExifOptions" class="space-y-3">
                        <p class="text-xs uppercase tracking-[0.2em] text-white/40">Metadata</p>
                        <ExifInfo :file="validFiles[0]" :show-empty="false" />
                    </div>

                    <div class="space-y-2 text-sm text-white/60">
                        <p class="font-semibold text-white/80">Smart defaults</p>
                        <ul class="space-y-1 text-xs">
                            <li>• Automatic aspect ratio protection</li>
                            <li>• Color-safe conversion for JPEG & WEBP targets</li>
                            <li>• Local batch downloads with progress pacing</li>
                            <li>• 100MB file size limit for browser stability</li>
                        </ul>
                    </div>
                </aside>
            </div>

            <section v-if="processedFiles.length" class="processed-downloads rounded-[32px] border border-white/10 bg-white/5 p-8 space-y-6">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p class="text-sm uppercase tracking-[0.4em] text-white/50">Step 3</p>
                        <h2 class="text-2xl font-semibold text-white">Processed Assets</h2>
                        <p class="text-sm text-white/60">Ready to download instantly from your browser memory.</p>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <button class="btn-primary" @click="downloadAllFiles">Download All</button>
                        <button v-if="processedFiles.length > 1" class="btn-secondary" @click="downloadAsZip">
                            <span v-if="isCreatingZip">Creating...</span>
                            <span v-else>Download ZIP</span>
                        </button>
                        <button class="btn-secondary" @click="reset">Start New Batch</button>
                    </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                    <div
                        v-for="(file, index) in processedFiles"
                        :key="`processed-${index}`"
                        class="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-4"
                    >
                        <div class="space-y-1 min-w-0">
                            <p class="text-white font-medium truncate">{{ file.name }}</p>
                            <p class="text-xs text-white/60">{{ formatFileSize(file.size) }}</p>
                        </div>
                        <button class="btn-secondary text-sm" @click="downloadFile(file)">Download</button>
                    </div>
                </div>
            </section>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import AppLayout from '../Layout/AppLayout.vue';
import FileUploader from './FileUploader.vue';
import SeoHead from '../../../Components/SeoHead.vue';
import ExifInfo from '../../../Components/ExifInfo.vue';
import ExifToggle from '../../../Components/ExifToggle.vue';
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
    },
    isLoadingConverter: {
        type: Boolean,
        default: false
    },
    showExifOptions: {
        type: Boolean,
        default: true
    },
    outputFormat: {
        type: String,
        default: ''
    }
});

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const seoKeywords = computed(() => [
    props.toolName,
    props.fileTypeLabel,
    props.actionButtonText,
    'image processing',
    'browser-based tools'
]);

const {
    isProcessing,
    progress,
    downloadFile: download,
    downloadFiles
} = useImageProcessor();

const selectedFiles = ref([]);
const processedFiles = ref([]);
const errorMessage = ref('');
const isCreatingZip = ref(false);
const preserveExif = ref(true);

const isFileOversized = (file) => file.size > MAX_FILE_SIZE;

const oversizedFiles = computed(() => 
    selectedFiles.value.filter(file => isFileOversized(file))
);

const validFiles = computed(() => 
    selectedFiles.value.filter(file => !isFileOversized(file))
);

const totalSelectedSize = computed(() => {
    if (!validFiles.value.length) return '0 Bytes';
    const total = validFiles.value.reduce((sum, file) => sum + (file.size || 0), 0);
    return formatFileSize(total);
});

const statusLabel = computed(() => {
    if (errorMessage.value) {
        return errorMessage.value;
    }
    if (isProcessing.value) {
        return `Processing ${progress.value}% · Stay on this tab`;
    }
    if (!selectedFiles.value.length) {
        return 'Add files to activate the pipeline';
    }
    if (oversizedFiles.value.length > 0) {
        return `${oversizedFiles.value.length} file(s) exceed 100MB limit`;
    }
    if (processedFiles.value.length) {
        return 'Batch ready · Download anytime';
    }
    return 'Ready when you are';
});

const getFileFingerprint = (file) => `${file.name}-${file.size}-${file.lastModified}`;

const handleFilesSelected = (files) => {
    // FileUploader sends all files (existing + new), so find only truly new ones
    const existingFingerprints = new Set(selectedFiles.value.map(getFileFingerprint));
    const newFiles = [];
    const duplicates = [];
    const seenInNewBatch = new Set(); // Track within the new batch too
    
    for (const file of files) {
        const fingerprint = getFileFingerprint(file);
        
        // Skip if already in selectedFiles (existing)
        if (existingFingerprints.has(fingerprint)) {
            // This is an existing file being re-emitted, skip it
            continue;
        }
        
        // Check for duplicates within the new batch itself
        if (seenInNewBatch.has(fingerprint)) {
            duplicates.push(file.name);
            continue;
        }
        
        // Truly new file
        newFiles.push(file);
        seenInNewBatch.add(fingerprint);
    }
    
    // Show warning for duplicates within the batch
    if (duplicates.length > 0) {
        errorMessage.value = duplicates.length === 1 
            ? `"${duplicates[0]}" appears multiple times`
            : `${duplicates.length} duplicate files removed`;
        
        // Auto-clear error after 3 seconds
        setTimeout(() => {
            if (errorMessage.value.includes('duplicate') || errorMessage.value.includes('multiple')) {
                errorMessage.value = '';
            }
        }, 3000);
    }
    
    // Add truly new files
    selectedFiles.value = [...selectedFiles.value, ...newFiles];
};

const removeFile = (index) => {
    const updated = [...selectedFiles.value];
    updated.splice(index, 1);
    selectedFiles.value = updated;
    errorMessage.value = '';
    if (!updated.length) {
        processedFiles.value = [];
        progress.value = 0;
    }
};

const processFiles = async () => {
    if (validFiles.value.length === 0) {
        errorMessage.value = 'No valid files to process. Check file sizes.';
        return;
    }
    
    isProcessing.value = true;
    progress.value = 0;
    processedFiles.value = [];
    errorMessage.value = '';

    const totalFiles = validFiles.value.length;

    for (let i = 0; i < totalFiles; i++) {
        try {
            const processed = await props.processingFunction(validFiles.value[i], {
                preserveExif: preserveExif.value
            });
            processedFiles.value.push(processed);
            progress.value = Math.round(((i + 1) / totalFiles) * 100);
        } catch (error) {
            console.error('Error processing file:', error);
            errorMessage.value = error.message || 'Failed to process image. Please try again.';
        }
    }

    isProcessing.value = false;
    
    // Auto-scroll to downloads section after a short delay
    if (processedFiles.value.length > 0) {
        setTimeout(() => {
            const downloadsSection = document.querySelector('.processed-downloads');
            if (downloadsSection) {
                downloadsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
};

const downloadFile = (file) => {
    download(file);
};

const downloadAllFiles = () => {
    downloadFiles(processedFiles.value);
};

const downloadAsZip = async () => {
    if (processedFiles.value.length < 2) return;
    
    isCreatingZip.value = true;
    
    try {
        const zip = new JSZip();
        const folderName = props.toolName.replace(/\s+/g, '_').toLowerCase();
        const folder = zip.folder(folderName);
        
        // Add all files to zip
        processedFiles.value.forEach((file, index) => {
            const arrayBufferPromise = file.arrayBuffer();
            folder.file(file.name, arrayBufferPromise);
        });
        
        // Generate zip
        const content = await zip.generateAsync({ 
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
        }, (metadata) => {
            // Could show progress here if needed
        });
        
        // Download
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        saveAs(content, `${folderName}_${timestamp}.zip`);
        
    } catch (error) {
        console.error('ZIP creation failed:', error);
        errorMessage.value = 'Failed to create ZIP. Try downloading individually.';
    } finally {
        isCreatingZip.value = false;
    }
};

const reset = () => {
    selectedFiles.value = [];
    processedFiles.value = [];
    progress.value = 0;
    errorMessage.value = '';
    preserveExif.value = true;
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const getFileExtension = (file) => {
    const parts = file.name?.split('.') ?? [];
    return (parts.pop() || 'IMG').substring(0, 4).toUpperCase();
};
</script>
