<template>
    <AppLayout>
        <div class="px-4 py-8 max-w-6xl mx-auto space-y-8 text-white">
            <header class="text-center space-y-3">
                <p class="text-sm uppercase tracking-[0.2em] text-primary-600 font-semibold">{{ toolName }}</p>
                <h1 class="text-4xl font-bold text-white">All-in-One Image Workbench</h1>
                <p class="text-lg text-white/70 max-w-3xl mx-auto">
                    {{ description }} Configure conversion, compression, resize, filters, orientation, and metadata cleanup in a single offline workflow.
                </p>
                <div class="flex flex-wrap justify-center gap-3 text-sm">
                    <span class="px-3 py-1 rounded-full bg-green-100 text-green-800">Client-side only</span>
                    <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800">Batch ready</span>
                    <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-800">Pipeline presets</span>
                </div>
            </header>

            <div class="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                <section class="space-y-6">
                    <div class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h2 class="text-xl font-semibold text-white">Upload & Queue</h2>
                                <p class="text-sm text-white/50">Drop unlimited files – nothing leaves your browser.</p>
                            </div>
                            <div class="text-right">
                                <p class="text-2xl font-bold text-white">{{ selectedCount }}</p>
                                <p class="text-xs uppercase tracking-wide text-white/50">files queued</p>
                            </div>
                        </div>
                        <FileUploader
                            v-model="selectedFiles"
                            :accept="acceptAttribute"
                            file-type="images"
                            :show-selection-preview="false"
                            @files-selected="handleFilesSelected"
                        />

                        <div v-if="selectedFiles.length" class="mt-6">
                            <div class="flex items-center justify-between mb-3">
                                <div>
                                    <p class="text-sm text-white/70">{{ queueStats.sizeLabel }} total · {{ queueStats.mpCount }} MP combined</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button
                                        class="px-3 py-1.5 rounded-2xl bg-white/10 text-sm font-medium text-white hover:bg-white/20"
                                        @click="resetSelection"
                                    >
                                        Clear Queue
                                    </button>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <article
                                    v-for="(file, index) in selectedFiles"
                                    :key="`${file.name}-${file.lastModified}-${index}`"
                                    class="border border-white/10 rounded-2xl p-4 flex flex-col gap-3 bg-white/5"
                                >
                                    <div class="flex items-start justify-between gap-4">
                                        <div class="space-y-1">
                                            <p class="font-semibold text-white truncate">{{ file.name }}</p>
                                            <p class="text-sm text-white/70">{{ formatFileSizeLabel(file.size) }} · {{ file.type || 'unknown type' }}</p>
                                            <p v-if="getMetadataForFile(file)" class="text-xs text-white/50">
                                                {{ getMetadataForFile(file).width }}×{{ getMetadataForFile(file).height }} px ·
                                                {{ getMetadataForFile(file).megapixels }} MP ·
                                                {{ getMetadataForFile(file).orientation }}
                                            </p>
                                        </div>
                                        <button
                                            class="text-sm text-red-300 hover:text-red-200"
                                            @click="removeFile(index)"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap gap-2">
                                        <button
                                            class="px-3 py-1.5 rounded-2xl border border-white/20 text-sm text-white/80 hover:bg-white/10"
                                            @click="previewFile(file, false)"
                                        >
                                            View Original
                                        </button>
                                        <button
                                            class="px-3 py-1.5 rounded-2xl border border-primary-200/40 text-sm text-primary-200 hover:bg-primary-500/10"
                                            @click="previewFile(file, true)"
                                        >
                                            Pipeline Preview
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>

                    <div v-if="processingLogs.length" class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-semibold text-white">Activity</h2>
                            <button class="text-sm text-white/50 hover:text-white/80" @click="clearLogs">Clear</button>
                        </div>
                        <ul class="space-y-2 max-h-48 overflow-y-auto">
                            <li
                                v-for="log in processingLogs"
                                :key="log.id"
                                class="text-sm"
                                :class="log.type === 'error' ? 'text-red-400' : 'text-white/80'"
                            >
                                {{ log.message }}
                            </li>
                        </ul>
                    </div>
                </section>

                <aside class="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur">
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold text-white">Format & Quality</h3>
                        <label class="block text-sm font-medium text-white/80">Target format</label>
                        <select
                            v-model="pipeline.format"
                            class="w-full rounded-2xl border border-white/20 bg-transparent text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                        >
                            <option v-for="format in formatOptions" :key="format.value" :value="format.value">
                                {{ format.label }}
                            </option>
                        </select>
                        <div>
                            <div class="flex items-center justify-between text-sm text-white/70">
                                <span>Quality</span>
                                <span>{{ pipeline.quality }}%</span>
                            </div>
                            <input
                                v-model.number="pipeline.quality"
                                type="range"
                                min="30"
                                max="100"
                                step="1"
                                class="w-full"
                            />
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold text-white">Resize</h3>
                        <label class="block text-sm text-white/70">Mode</label>
                        <select
                            v-model="pipeline.resizeMode"
                            class="w-full rounded-2xl border border-white/20 bg-transparent text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                        >
                            <option value="original">Keep original</option>
                            <option value="contain">Contain within</option>
                            <option value="exact">Exact dimensions</option>
                            <option value="percentage">Scale by percentage</option>
                        </select>
                        <div v-if="pipeline.resizeMode === 'contain' || pipeline.resizeMode === 'exact'" class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs text-white/50">Width (px)</label>
                                <input
                                    v-model.number="pipeline.width"
                                    type="number"
                                    min="1"
                                    class="w-full rounded-2xl border border-white/20 bg-transparent text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                                />
                            </div>
                            <div>
                                <label class="block text-xs text-white/50">Height (px)</label>
                                <input
                                    v-model.number="pipeline.height"
                                    type="number"
                                    min="1"
                                    class="w-full rounded-2xl border border-white/20 bg-transparent text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                                />
                            </div>
                        </div>
                        <div v-if="pipeline.resizeMode === 'percentage'">
                            <label class="block text-xs text-white/50">Scale (%)</label>
                            <input
                                v-model.number="pipeline.percentage"
                                type="number"
                                min="10"
                                max="500"
                                class="w-full rounded-2xl border border-white/20 bg-transparent text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                            />
                        </div>
                        <label class="inline-flex items-center text-sm text-white/70">
                            <input type="checkbox" v-model="pipeline.maintainAspect" class="mr-2" />
                            Maintain aspect ratio
                        </label>
                    </div>

                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold text-white">Orientation</h3>
                        <label class="block text-sm text-white/70">Rotate</label>
                        <select
                            v-model.number="pipeline.rotate"
                            class="w-full rounded-2xl border border-white/20 bg-transparent text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                        >
                            <option :value="0">0°</option>
                            <option :value="90">90°</option>
                            <option :value="180">180°</option>
                            <option :value="270">270°</option>
                        </select>
                        <div class="flex items-center gap-4 text-sm text-white/70">
                            <label class="inline-flex items-center">
                                <input type="checkbox" v-model="pipeline.flipHorizontal" class="mr-2" />
                                Flip horizontal
                            </label>
                            <label class="inline-flex items-center">
                                <input type="checkbox" v-model="pipeline.flipVertical" class="mr-2" />
                                Flip vertical
                            </label>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-white">Filters</h3>
                            <button class="text-xs text-primary-600" @click="resetFilters">Reset</button>
                        </div>
                        <div v-for="filterControl in filterControls" :key="filterControl.key">
                            <div class="flex items-center justify-between text-xs text-white/50">
                                <span>{{ filterControl.label }}</span>
                                <span>{{ pipeline.filters[filterControl.key] }}{{ filterControl.suffix }}</span>
                            </div>
                            <input
                                v-model.number="pipeline.filters[filterControl.key]"
                                type="range"
                                :min="filterControl.min"
                                :max="filterControl.max"
                                :step="filterControl.step"
                                class="w-full"
                            />
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold text-white">Background</h3>
                        <div class="flex items-center gap-3">
                            <input
                                v-model="pipeline.backgroundColor"
                                type="color"
                                class="w-12 h-12 rounded-2xl border border-white/20 bg-white/10"
                            />
                            <p class="text-sm text-white/70">Used when exporting to formats without transparency support.</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex flex-wrap gap-3">
                            <button
                                class="flex-1 px-4 py-2 rounded-2xl border border-white/20 text-sm font-medium text-white/80 hover:bg-white/10"
                                @click="resetPipeline"
                            >
                                Reset Settings
                            </button>
                            <button
                                class="flex-1 px-4 py-2 rounded-lg border border-primary-200 bg-primary-50 text-sm font-medium text-primary-700 hover:bg-primary-100"
                                @click="applyWebPreset"
                            >
                                Web Optimized
                            </button>
                        </div>
                        <button
                            class="btn-primary w-full justify-center"
                            :disabled="!selectedFiles.length || isProcessing"
                            @click="processSelected"
                        >
                            <span v-if="isProcessing">Processing {{ progress }}%</span>
                            <span v-else>Process {{ selectedFiles.length || '' }} Files</span>
                        </button>
                        <div v-if="isProcessing" class="space-y-2">
                            <div class="w-full bg-white/10 rounded-full h-2.5">
                                <div class="bg-gradient-to-r from-primary-500 to-orange-400 h-2.5 rounded-full transition-all duration-300" :style="{ width: progress + '%' }"></div>
                            </div>
                            <p class="text-xs text-white/50 text-center">Large images stay on device – just give the browser a moment.</p>
                        </div>
                    </div>
                </aside>
            </div>

            <section v-if="processedResults.length" class="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 class="text-2xl font-semibold text-white">Processed Files</h2>
                        <p class="text-sm text-white/70">Ready to download with the configured pipeline.</p>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <button class="btn-primary" @click="downloadAll">Download All</button>
                        <button class="btn-secondary" @click="resetSelection">
                            Start Over
                        </button>
                    </div>
                </div>
                <div class="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    <article
                        v-for="item in processedResults"
                        :key="item.id"
                        class="border border-white/15 rounded-2xl p-4 flex items-center justify-between gap-4 bg-white/5"
                    >
                        <div class="flex items-center gap-4">
                            <div class="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                                <img v-if="item.previewUrl" :src="item.previewUrl" alt="Preview" class="object-contain max-w-full max-h-full" loading="lazy" />
                                <span v-else class="text-2xl">🖼️</span>
                            </div>
                            <div>
                                <p class="font-semibold text-white">{{ item.file.name }}</p>
                                <p class="text-sm text-white/70">{{ item.metadata.width }}×{{ item.metadata.height }} px · {{ formatFileSizeLabel(item.file.size) }}</p>
                                <p class="text-xs text-white/50">{{ item.metadata.megapixels }} MP · {{ item.metadata.orientation }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <button class="btn-primary text-sm" @click="downloadResult(item)">Download</button>
                            <button class="text-sm text-primary-200" @click="previewProcessed(item)">Preview</button>
                        </div>
                    </article>
                </div>
            </section>

            <transition name="fade">
                <div v-if="previewState.open" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
                    <div class="bg-slate-900/90 border border-white/15 rounded-3xl shadow-2xl max-w-4xl w-full p-6 relative backdrop-blur">
                        <button class="absolute top-4 right-4 text-white/60 hover:text-white" @click="closePreview">✕</button>
                        <p class="text-sm text-white/60 mb-2">Previewing {{ previewState.title }}</p>
                        <div class="min-h-[300px] flex items-center justify-center">
                            <div v-if="previewState.loading" class="text-white/60 text-sm">Generating preview…</div>
                            <img v-else :src="previewState.src" alt="Preview image" class="max-h-[70vh] w-full object-contain rounded-xl" />
                        </div>
                        <div class="text-right mt-4">
                            <button class="btn-secondary" @click="closePreview">Close</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </AppLayout>
</template>

<script setup>
import { computed, reactive, ref, onBeforeUnmount } from 'vue';
import AppLayout from '../../Components/Layout/AppLayout.vue';
import FileUploader from '../../Components/UI/FileUploader.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

const props = defineProps({
    toolName: String,
    description: String,
    supportedFormats: {
        type: Array,
        default: () => [],
    },
    defaultPipeline: {
        type: Object,
        default: () => ({}),
    },
});

const {
    isProcessing,
    progress,
    processPipeline,
    extractMetadata,
    generatePreview,
    downloadFile,
    downloadFiles,
    supportedFormats: runtimeFormats,
    formatFileSizeLabel,
} = useImageProcessor();

const fallbackPipeline = {
    format: 'jpeg',
    quality: 90,
    resizeMode: 'original',
    width: 1920,
    height: 1080,
    percentage: 100,
    maintainAspect: true,
    rotate: 0,
    flipHorizontal: false,
    flipVertical: false,
    filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
    },
    backgroundColor: '#ffffff',
};

const buildInitialPipeline = () => {
    const base = JSON.parse(JSON.stringify(fallbackPipeline));
    Object.entries(props.defaultPipeline || {}).forEach(([key, value]) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            base[key] = { ...base[key], ...value };
        } else if (value !== undefined) {
            base[key] = value;
        }
    });
    return base;
};

const pipeline = reactive(buildInitialPipeline());
const selectedFiles = ref([]);
const processedResults = ref([]);
const processingLogs = ref([]);
const fileMetadata = ref(new Map());
const previewState = reactive({
    open: false,
    src: '',
    title: '',
    loading: false,
});
const metadataRunId = ref(0);

const previewUrls = new Set();
const registerPreviewUrl = (url) => previewUrls.add(url);
const cleanupPreviews = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    previewUrls.clear();
};

onBeforeUnmount(() => {
    cleanupPreviews();
});

const getFileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`;
const getMetadataForFile = (file) => fileMetadata.value.get(getFileKey(file));

const formatOptions = computed(() => (props.supportedFormats?.length ? props.supportedFormats : runtimeFormats));
const acceptAttribute = computed(() => {
    const baseFormats = formatOptions.value.length
        ? formatOptions.value.map((format) => `image/${format.value}`)
        : ['image/*'];
    const extras = ['image/heic', 'image/heif', '.heic', '.heif'];
    return [...new Set([...baseFormats, ...extras])].join(',');
});
const selectedCount = computed(() => selectedFiles.value.length);
const totalSize = computed(() => selectedFiles.value.reduce((acc, file) => acc + (file.size || 0), 0));

const queueStats = computed(() => ({
    sizeLabel: formatFileSizeLabel(totalSize.value),
    mpCount: selectedFiles.value.reduce((sum, file) => {
        const meta = getMetadataForFile(file);
        if (meta) {
            return sum + meta.megapixels;
        }
        return sum;
    }, 0).toFixed(2),
}));

const filterControls = [
    { key: 'brightness', label: 'Brightness', min: 50, max: 200, step: 1, suffix: '%' },
    { key: 'contrast', label: 'Contrast', min: 50, max: 200, step: 1, suffix: '%' },
    { key: 'saturation', label: 'Saturation', min: 0, max: 300, step: 1, suffix: '%' },
    { key: 'hue', label: 'Hue', min: -180, max: 180, step: 1, suffix: '°' },
    { key: 'blur', label: 'Blur', min: 0, max: 20, step: 1, suffix: 'px' },
    { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, step: 1, suffix: '%' },
    { key: 'sepia', label: 'Sepia', min: 0, max: 100, step: 1, suffix: '%' },
];

const hydrateMetadata = async (files) => {
    metadataRunId.value += 1;
    const currentRun = metadataRunId.value;
    if (!files.length) {
        fileMetadata.value = new Map();
        return;
    }

    try {
        const entries = await Promise.all(
            files.map(async (file) => {
                const meta = await extractMetadata(file);
                return [getFileKey(file), meta];
            })
        );
        if (metadataRunId.value === currentRun) {
            fileMetadata.value = new Map(entries);
        }
    } catch (error) {
        console.error('Metadata parsing failed', error);
    }
};

const handleFilesSelected = async (files) => {
    processedResults.value = [];
    cleanupPreviews();
    progress.value = 0;
    await hydrateMetadata(files);
};

const resetSelection = () => {
    selectedFiles.value = [];
    fileMetadata.value = new Map();
    processedResults.value = [];
    cleanupPreviews();
    progress.value = 0;
};

const removeFile = (index) => {
    selectedFiles.value.splice(index, 1);
    hydrateMetadata(selectedFiles.value);
};

const buildPipelineOptions = () => ({
    format: pipeline.format,
    quality: pipeline.quality,
    resize: {
        mode: pipeline.resizeMode,
        width: pipeline.width,
        height: pipeline.height,
        percentage: pipeline.percentage,
        maintainAspect: pipeline.maintainAspect,
    },
    rotate: pipeline.rotate,
    flipHorizontal: pipeline.flipHorizontal,
    flipVertical: pipeline.flipVertical,
    filters: { ...pipeline.filters },
    backgroundColor: pipeline.backgroundColor,
});

const appendLog = (message, type = 'info') => {
    processingLogs.value = [
        {
            id: `${Date.now()}-${Math.random()}`,
            message,
            type,
        },
        ...processingLogs.value.slice(0, 20),
    ];
};

const clearLogs = () => {
    processingLogs.value = [];
};

const processSelected = async () => {
    if (!selectedFiles.value.length || isProcessing.value) return;
    const options = buildPipelineOptions();
    processedResults.value = [];
    cleanupPreviews();
    isProcessing.value = true;
    progress.value = 0;
    appendLog(`Starting processing for ${selectedFiles.value.length} file(s)`);

    for (let i = 0; i < selectedFiles.value.length; i += 1) {
        const original = selectedFiles.value[i];
        try {
            const processed = await processPipeline(original, options);
            const metadata = await extractMetadata(processed);
            const previewUrl = URL.createObjectURL(processed);
            registerPreviewUrl(previewUrl);
            processedResults.value.push({
                id: `${processed.name}-${i}-${Date.now()}`,
                file: processed,
                metadata,
                previewUrl,
            });
            appendLog(`✔ ${processed.name} ready`);
        } catch (error) {
            console.error('Pipeline error', error);
            appendLog(`✖ Failed to process ${original.name}`, 'error');
        }
        progress.value = Math.round(((i + 1) / selectedFiles.value.length) * 100);
    }

    appendLog('Batch complete');
    isProcessing.value = false;
};

const resetPipeline = () => {
    const defaults = buildInitialPipeline();
    Object.keys(defaults).forEach((key) => {
        if (typeof defaults[key] === 'object' && defaults[key] !== null && !Array.isArray(defaults[key])) {
            pipeline[key] = { ...defaults[key] };
        } else {
            pipeline[key] = defaults[key];
        }
    });
};

const applyWebPreset = () => {
    pipeline.format = 'jpeg';
    pipeline.quality = 80;
    pipeline.resizeMode = 'contain';
    pipeline.width = 1920;
    pipeline.height = 1080;
    pipeline.percentage = 100;
    pipeline.maintainAspect = true;
    pipeline.rotate = 0;
    pipeline.flipHorizontal = false;
    pipeline.flipVertical = false;
    pipeline.filters.brightness = 105;
    pipeline.filters.contrast = 105;
    pipeline.filters.saturation = 110;
    pipeline.filters.hue = 0;
    pipeline.filters.blur = 0;
    pipeline.filters.grayscale = 0;
    pipeline.filters.sepia = 0;
};

const resetFilters = () => {
    pipeline.filters = { ...fallbackPipeline.filters };
};

const downloadAll = () => {
    const files = processedResults.value.map((item) => item.file);
    if (!files.length) return;
    downloadFiles(files);
};

const downloadResult = (item) => {
    downloadFile(item.file);
};

const previewFile = async (file, applyPipeline = false) => {
    previewState.open = true;
    previewState.loading = true;
    previewState.title = file.name;
    try {
        previewState.src = applyPipeline
            ? await generatePreview(file, buildPipelineOptions())
            : await generatePreview(file);
    } catch (error) {
        console.error('Preview failed', error);
        previewState.src = '';
    } finally {
        previewState.loading = false;
    }
};

const previewProcessed = (item) => {
    previewState.open = true;
    previewState.loading = false;
    previewState.title = item.file.name;
    previewState.src = item.previewUrl;
};

const closePreview = () => {
    previewState.open = false;
    previewState.src = '';
    previewState.title = '';
};
</script>
