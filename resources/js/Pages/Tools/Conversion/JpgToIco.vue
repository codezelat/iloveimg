<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/jpeg,image/jpg"
        file-type-label="JPG images"
        action-button-text="Convert to ICO"
        :processing-function="convertToIco"
        output-format="ico"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { createIcoFile, blobToFile } from '../../../Utils/icoGenerator';

defineProps({
    toolName: String,
    description: String
});

const convertToIco = async (file) => {
    // Read the image
    const img = await createImageFromFile(file);
    
    // Generate multiple sizes for ICO
    const sizes = [16, 32, 48, 64, 128, 256];
    const canvases = [];
    
    for (const size of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Enable high quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // White background for JPG (no transparency)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        
        // Use cover resize
        const scale = Math.max(size / img.width, size / img.height);
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        canvases.push({ size, canvas });
    }
    
    // Create proper ICO file
    const icoBlob = await createIcoFile(canvases);
    return blobToFile(icoBlob, 'favicon.ico');
};

const createImageFromFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
</script>
