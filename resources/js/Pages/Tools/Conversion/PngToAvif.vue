<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/png"
        file-type-label="PNG images"
        action-button-text="Convert to AVIF"
        :processing-function="convertToAvif"
        :is-loading-converter="isLoading"
    >
        <template #options>
            <div class="space-y-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-white/80">Quality</label>
                    <span class="text-sm text-white/60">{{ quality }}%</span>
                </div>
                <input
                    v-model.number="quality"
                    type="range"
                    min="1"
                    max="100"
                    class="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-primary-500"
                >
                <div class="flex justify-between text-xs text-white/50">
                    <span>Smaller file (1)</span>
                    <span>Balanced ({{ defaultQuality }})</span>
                    <span>Lossless (100)</span>
                </div>
                <div class="flex items-center gap-2 pt-2">
                    <input
                        id="lossless"
                        v-model="isLossless"
                        type="checkbox"
                        class="w-4 h-4 rounded border-white/20 bg-white/10 text-primary-500 focus:ring-primary-500"
                        @change="onLosslessChange"
                    >
                    <label for="lossless" class="text-sm text-white/80 cursor-pointer">Lossless encoding</label>
                </div>
                <p class="text-xs text-white/60">
                    PNG to AVIF conversion {{ isLossless ? 'preserves all quality (larger files).' : 'offers great compression with transparency support.' }}
                </p>
            </div>
        </template>
    </BaseToolPage>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { convertFileToAvif, isAvifSupported } from '../../../Utils/avifEncoder.js';

defineProps({
    toolName: String,
    description: String,
});

const quality = ref(75);
const defaultQuality = 75;
const isLossless = ref(false);
const isLoading = ref(false);
const avifSupported = ref(true);

onMounted(async () => {
    avifSupported.value = await isAvifSupported();
});

const onLosslessChange = () => {
    if (isLossless.value) {
        quality.value = 100;
    }
};

const convertToAvif = async (file) => {
    if (!avifSupported.value) {
        throw new Error('Your browser does not support AVIF encoding. Please use Chrome 85+, Firefox 93+, or Safari 16+.');
    }

    isLoading.value = true;
    try {
        // For PNG with transparency, use higher quality by default or lossless
        const encodeQuality = isLossless.value ? 100 : quality.value;
        return await convertFileToAvif(file, { quality: encodeQuality });
    } finally {
        isLoading.value = false;
    }
};
</script>
