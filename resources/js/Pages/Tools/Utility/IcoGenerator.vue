<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/png,image/jpeg,image/jpg,image/webp"
        file-type-label="PNG, JPG, WebP images"
        action-button-text="Generate ICO"
        :processing-function="generateIco"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

const props = defineProps({
    toolName: String,
    description: String,
});

const { canvasToFile } = useImageProcessor();

const generateIco = async (file) => {
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
        
        // Use cover resize
        const scale = Math.max(size / img.width, size / img.height);
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        canvases.push({ size, canvas });
    }
    
    // Create ICO blob (simplified - real ICO needs proper header)
    // For now, return 256x256 PNG as favicon.png
    const mainCanvas = canvases.find(c => c.size === 256)?.canvas || canvases[canvases.length - 1].canvas;
    
    return new Promise((resolve, reject) => {
        mainCanvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Failed to generate favicon'));
                return;
            }
            
            const icoFile = new File([blob], 'favicon.png', {
                type: 'image/png',
                lastModified: Date.now(),
            });
            
            resolve(icoFile);
        }, 'image/png');
    });
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
