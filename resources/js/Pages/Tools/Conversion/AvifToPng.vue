<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/avif"
        file-type-label="AVIF images"
        action-button-text="Convert to PNG"
        :processing-function="convertToPng"
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
            <div v-else class="p-4 rounded-2xl border border-white/10 bg-white/5">
                <p class="text-sm text-white/80 mb-2">Lossless Conversion</p>
                <p class="text-xs text-white/60">
                    Convert AVIF to PNG for lossless quality with full transparency support. 
                    Note: PNG files will be larger than AVIF.
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

const isLoading = ref(false);
const avifSupported = ref(true);

onMounted(async () => {
    avifSupported.value = await isAvifSupported();
});

const convertToPng = async (file) => {
    if (!avifSupported.value) {
        throw new Error('Your browser does not support AVIF decoding.');
    }

    isLoading.value = true;
    try {
        // PNG doesn't use quality parameter, but we pass it for API consistency
        return await convertAvifFileToFormat(file, 'png');
    } finally {
        isLoading.value = false;
    }
};
</script>
