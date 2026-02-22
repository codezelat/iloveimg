<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/png,image/jpeg,image/jpg,image/webp"
        file-type-label="PNG, JPG, WebP images"
        action-button-text="Generate Favicon Package"
        :processing-function="generateIco"
        output-format="ico"
    >
        <template #options>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <p class="text-sm font-medium text-white">Output Options</p>
                <div class="space-y-2">
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <input 
                            v-model="outputMode" 
                            type="radio" 
                            value="package" 
                            class="w-4 h-4 accent-primary-500"
                        >
                        <span class="text-sm text-white/80 group-hover:text-white">
                            Full Package (ICO + PNGs + ZIP)
                        </span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <input 
                            v-model="outputMode" 
                            type="radio" 
                            value="ico-only" 
                            class="w-4 h-4 accent-primary-500"
                        >
                        <span class="text-sm text-white/80 group-hover:text-white">
                            ICO Only (favicon.ico)
                        </span>
                    </label>
                </div>
                <p class="text-xs text-white/50">
                    The full package includes favicon.ico, Apple touch icon, and PWA icons in a ZIP file.
                </p>
            </div>
        </template>
    </BaseToolPage>
</template>

<script setup>
import { ref } from 'vue';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { generateFaviconPackage, createIcoFile, blobToFile } from '../../../Utils/icoGenerator';

const props = defineProps({
    toolName: String,
    description: String,
});

const outputMode = ref('package');

const generateIco = async (file) => {
    // Read the image
    const img = await createImageFromFile(file);
    
    if (outputMode.value === 'package') {
        // Generate full favicon package
        const faviconPackage = await generateFaviconPackage(img);
        
        // Create ZIP with all files
        const zip = new JSZip();
        const folder = zip.folder('favicon-package');
        
        // Add all files to ZIP
        for (const [filename, blob] of faviconPackage) {
            folder.file(filename, blob);
        }
        
        // Add HTML snippet for reference
        const htmlSnippet = `<!-- Favicon HTML -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png">
<meta name="theme-color" content="#ffffff">`;
        
        folder.file('install-instructions.txt', 
            `FAVICON PACKAGE\n` +
            `===============\n\n` +
            `Files included:\n` +
            `- favicon.ico (multi-resolution for legacy browsers)\n` +
            `- apple-touch-icon.png (180x180 for iOS)\n` +
            `- icon-192x192.png (for PWA)\n` +
            `- icon-512x512.png (for PWA)\n\n` +
            `HTML to add to your <head>:\n\n` +
            htmlSnippet
        );
        
        // Generate ZIP blob
        const zipBlob = await zip.generateAsync({ 
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
        });
        
        // Return as a file that will be downloaded
        return blobToFile(zipBlob, 'favicon-package.zip');
    } else {
        // ICO only mode
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
    }
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