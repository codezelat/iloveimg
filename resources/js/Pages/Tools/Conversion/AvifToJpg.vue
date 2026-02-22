<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/avif"
        file-type-label="AVIF images"
        action-button-text="Convert to JPG"
        :processing-function="convertToJpg"
        :is-loading-converter="isLoading"
    >
        <template #options>
            <div v-if="!avifSupported" class="p-4 rounded-2xl border border-red-500/30 bg-red-500/10">
                <p class="text-red-300 font-medium mb-2">⚠️ Browser Not Supported</p>
                <p class="text-sm text-red-200/80">
                    Your browser does not support AVIF decoding. Please use:
                </p>
                <ul class="text-xs text-red-200/60 mt-2 space-y-1">
                    <li>• Chrome 85 or later</li>
                    <li>• Firefox 93 or later</li>
                    <li>• Safari 16 or later</li>
                </ul>
            </div>
            <div v-else class="space-y-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-white/80">Quality</label>
                    <span class="text-sm text-white/60">{{ Math.round(quality * 100) }}%</span>
                </div>
                <input
                    v-model.number="quality"
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    class="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-primary-500"
                >
                <div class="flex justify-between text-xs text-white/50">
                    <span>Smaller file (10%)</span>
                    <span>Balanced (70%)</span>
                    <span>High quality (100%)</span>
                </div>
                <p class="text-xs text-white/60">
                    Convert AVIF to JPG for broader compatibility. JPG is supported by all browsers and devices.
                </p>
            </div>
        </template>
    </BaseToolPage>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { convertAvifFileToFormat, isAvifSupported } from '../../../Utils/avifEncoder.js';

defineProps({
    toolName: String,
    description: String,
});

const quality = ref(0.92);
const isLoading = ref(false);
const avifSupported = ref(true);

onMounted(async () => {
    avifSupported.value = await isAvifSupported();
});

const convertToJpg = async (file) => {
    if (!avifSupported.value) {
        throw new Error('Your browser does not support AVIF decoding.');
    }

    isLoading.value = true;
    try {
        return await convertAvifFileToFormat(file, 'jpeg', quality.value);
    } finally {
        isLoading.value = false;
    }
};
</script>
