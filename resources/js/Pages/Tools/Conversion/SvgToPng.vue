<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats=".svg,image/svg+xml"
        file-type-label="SVG images"
        action-button-text="Convert to PNG"
        :processing-function="convertToPng"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';

const props = defineProps({
    toolName: String,
    description: String,
});

const convertToPng = async (file) => {
    // Read SVG content
    const svgText = await file.text();
    
    // Parse to get dimensions
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = svgDoc.documentElement;
    
    // Get or calculate dimensions
    let width = parseFloat(svgElement.getAttribute('width')) || 512;
    let height = parseFloat(svgElement.getAttribute('height')) || 512;
    
    // Handle viewBox
    const viewBox = svgElement.getAttribute('viewBox');
    if (viewBox && (!svgElement.getAttribute('width') || !svgElement.getAttribute('height'))) {
        const parts = viewBox.split(/\s+/).map(parseFloat);
        width = parts[2];
        height = parts[3];
    }
    
    // Create blob URL for SVG
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    try {
        // Load as image
        const img = await loadImage(url);
        
        // Draw to canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Fill white background (optional - for transparency use transparent)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        const pngBlob = await new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/png');
        });
        
        return new File([pngBlob], file.name.replace('.svg', '.png'), {
            type: 'image/png',
            lastModified: Date.now(),
        });
    } finally {
        URL.revokeObjectURL(url);
    }
};

const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};
</script>
