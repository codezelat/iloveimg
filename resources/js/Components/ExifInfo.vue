<template>
    <div v-if="hasExifData || showEmpty" class="rounded-2xl border border-white/10 bg-slate-800 overflow-hidden">
        <!-- Header / Toggle -->
        <button
            @click="isExpanded = !isExpanded"
            class="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
        >
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div>
                    <p class="text-sm font-medium text-white">EXIF Metadata</p>
                    <p class="text-xs text-white/50">{{ summaryText }}</p>
                </div>
            </div>
            <svg
                class="w-5 h-5 text-white/40 transition-transform"
                :class="{ 'rotate-180': isExpanded }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
        </button>

        <!-- Expanded Content -->
        <div v-if="isExpanded" class="border-t border-white/10">
            <!-- No EXIF Data Message -->
            <div v-if="!hasExifData" class="p-4 text-center">
                <p class="text-sm text-white/50">No EXIF data available</p>
                <p class="text-xs text-white/30 mt-1">This file doesn't contain metadata or it's not supported</p>
            </div>

            <!-- EXIF Data Grid -->
            <div v-else class="p-4 space-y-3">
                <!-- Camera Info -->
                <div v-if="cameraInfo" class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs text-white/40 uppercase tracking-wider">Camera</p>
                        <p class="text-sm text-white">{{ cameraInfo }}</p>
                    </div>
                </div>

                <!-- Date Taken -->
                <div v-if="dateTaken" class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs text-white/40 uppercase tracking-wider">Date Taken</p>
                        <p class="text-sm text-white">{{ dateTaken }}</p>
                    </div>
                </div>

                <!-- Dimensions -->
                <div v-if="dimensions" class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs text-white/40 uppercase tracking-wider">Dimensions</p>
                        <p class="text-sm text-white">{{ dimensions }}</p>
                    </div>
                </div>

                <!-- GPS Coordinates -->
                <div v-if="gpsCoordinates" class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs text-white/40 uppercase tracking-wider">GPS Location</p>
                        <p class="text-sm text-white font-mono">{{ gpsCoordinates }}</p>
                    </div>
                </div>

                <!-- Orientation -->
                <div v-if="orientationText" class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs text-white/40 uppercase tracking-wider">Orientation</p>
                        <p class="text-sm text-white">{{ orientationText }}</p>
                    </div>
                </div>

                <!-- Additional Technical Details -->
                <div v-if="hasTechnicalDetails" class="pt-3 border-t border-white/10">
                    <p class="text-xs text-white/40 uppercase tracking-wider mb-2">Technical Details</p>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <div v-if="exifData?.ISOSpeedRatings" class="bg-white/5 rounded-lg p-2">
                            <span class="text-white/40">ISO:</span>
                            <span class="text-white ml-1">{{ exifData.ISOSpeedRatings }}</span>
                        </div>
                        <div v-if="exifData?.FNumber" class="bg-white/5 rounded-lg p-2">
                            <span class="text-white/40">Aperture:</span>
                            <span class="text-white ml-1">f/{{ exifData.FNumber }}</span>
                        </div>
                        <div v-if="exifData?.ExposureTime" class="bg-white/5 rounded-lg p-2">
                            <span class="text-white/40">Shutter:</span>
                            <span class="text-white ml-1">{{ formatExposureTime(exifData.ExposureTime) }}</span>
                        </div>
                        <div v-if="exifData?.FocalLength" class="bg-white/5 rounded-lg p-2">
                            <span class="text-white/40">Focal:</span>
                            <span class="text-white ml-1">{{ exifData.FocalLength }}mm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useExif } from '../Composables/useExif';

const props = defineProps({
    file: {
        type: [File, Object],
        default: null,
    },
    showEmpty: {
        type: Boolean,
        default: true,
    },
});

const { extractExif, formatGpsCoordinates, formatDateTaken, getCameraInfo, getOrientationDescription, supportsExif } = useExif();

const exifData = ref(null);
const isExpanded = ref(false);
const isLoading = ref(false);

// Computed properties for formatted display
const hasExifData = computed(() => {
    return exifData.value && Object.keys(exifData.value).length > 0;
});

const cameraInfo = computed(() => {
    return getCameraInfo(exifData.value);
});

const dateTaken = computed(() => {
    return formatDateTaken(exifData.value);
});

const dimensions = computed(() => {
    if (!exifData.value) return null;
    const width = exifData.value.PixelXDimension || exifData.value.ImageWidth;
    const height = exifData.value.PixelYDimension || exifData.value.ImageLength;
    if (width && height) {
        return `${width} × ${height} px`;
    }
    return null;
});

const gpsCoordinates = computed(() => {
    return formatGpsCoordinates(exifData.value);
});

const orientationText = computed(() => {
    if (!exifData.value?.Orientation) return null;
    return getOrientationDescription(exifData.value.Orientation);
});

const hasTechnicalDetails = computed(() => {
    if (!exifData.value) return false;
    return exifData.value.ISOSpeedRatings || 
           exifData.value.FNumber || 
           exifData.value.ExposureTime || 
           exifData.value.FocalLength;
});

const summaryText = computed(() => {
    if (isLoading.value) return 'Loading...';
    if (!props.file) return 'No file selected';
    if (!supportsExif(props.file)) return 'Format not supported';
    if (!hasExifData.value) return 'No metadata found';
    
    const parts = [];
    if (cameraInfo.value) parts.push('Camera');
    if (dateTaken.value) parts.push('Date');
    if (gpsCoordinates.value) parts.push('GPS');
    
    if (parts.length === 0) return 'Metadata available';
    return parts.join(' · ');
});

// Format exposure time as fraction
const formatExposureTime = (time) => {
    if (!time) return null;
    if (time < 1) {
        const denominator = Math.round(1 / time);
        return `1/${denominator}s`;
    }
    return `${time}s`;
};

// Load EXIF data when file changes
const loadExifData = async () => {
    if (!props.file) {
        exifData.value = null;
        return;
    }

    if (!supportsExif(props.file)) {
        exifData.value = null;
        return;
    }

    isLoading.value = true;
    try {
        exifData.value = await extractExif(props.file);
        // Auto-expand if there's GPS or camera info
        if (gpsCoordinates.value || cameraInfo.value) {
            isExpanded.value = true;
        }
    } catch (error) {
        console.warn('Failed to load EXIF data:', error);
        exifData.value = null;
    } finally {
        isLoading.value = false;
    }
};

// Watch for file changes
watch(() => props.file, loadExifData, { immediate: true });

onMounted(() => {
    loadExifData();
});
</script>
