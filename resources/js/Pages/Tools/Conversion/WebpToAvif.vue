<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/webp"
        file-type-label="WEBP images"
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
                    <span>Higher quality (100)</span>
                </div>
                <p class="text-xs text-white/60">
                    Convert WEBP to AVIF for even better compression. AVIF typically achieves {{ quality <= 50 ? '30-50% smaller files' : '20-30% smaller files' }} than WEBP at similar quality.
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

const quality = ref(65);
const defaultQuality = 65;
const isLoading = ref(false);
const avifSupported = ref(true);

onMounted(async () => {
    avifSupported.value = await isAvifSupported();
});

const convertToAvif = async (file) => {
    if (!avifSupported.value) {
        throw new Error('Your browser does not support AVIF encoding. Please use Chrome 85+, Firefox 93+, or Safari 16+.');
    }

    isLoading.value = true;
    try {
        return await convertFileToAvif(file, { quality: quality.value });
    } finally {
        isLoading.value = false;
    }
};
</script>
