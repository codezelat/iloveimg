<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/heic,image/heif"
        file-type-label="HEIC images"
        action-button-text="Convert to PNG"
        :processing-function="convertToPng"
        :is-loading-converter="isLoading"
    />
</template>

<script setup>
import { ref } from 'vue';
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';

const props = defineProps({
    toolName: String,
    description: String,
});

const isLoading = ref(false);
let libheif = null;

const convertToPng = async (file) => {
    if (!libheif) {
        isLoading.value = true;
        try {
            const module = await import('/ffmpeg/libheif.mjs');
            libheif = await module.default();
        } finally {
            isLoading.value = false;
        }
    }
    
    // Decode HEIC
    const data = await file.arrayBuffer();
    const decoder = new libheif.HeifDecoder();
    const images = decoder.decode(new Uint8Array(data));
    
    if (!images.length) throw new Error('No images found');
    
    const image = images[0];
    const width = image.get_width();
    const height = image.get_height();
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    
    // Display to imageData - pass the full object, get result in callback
    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Decode timeout')), 30000);
        image.display(imageData, (displayData) => {
            clearTimeout(timeout);
            if (!displayData) {
                reject(new Error('HEIF processing error'));
            } else {
                resolve();
            }
        });
    });
    
    ctx.putImageData(imageData, 0, 0);
    
    // Convert to PNG
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    return new File([blob], file.name.replace(/\.[^/.]+$/, '.png'), { type: 'image/png' });
};
</script>
