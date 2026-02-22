/**
 * ICO File Generator Utility
 * Creates proper Windows ICO files with multiple image sizes
 */

// ICO Header constants
const ICO_HEADER_SIZE = 6;
const ICO_DIRECTORY_ENTRY_SIZE = 16;

/**
 * Create a proper ICO file from multiple canvas images
 * @param {Array<{size: number, canvas: HTMLCanvasElement}>} images - Array of size/canvas pairs
 * @returns {Promise<Blob>} ICO file blob
 */
export async function createIcoFile(images) {
    // Sort by size ascending (required by ICO spec)
    const sortedImages = [...images].sort((a, b) => a.size - b.size);
    
    // Get PNG data for each image
    const pngDataArray = await Promise.all(
        sortedImages.map(async ({ canvas }) => {
            const blob = await canvasToBlob(canvas, 'image/png');
            return new Uint8Array(await blob.arrayBuffer());
        })
    );
    
    // Calculate offsets
    const numImages = sortedImages.length;
    const headerSize = ICO_HEADER_SIZE;
    const directorySize = numImages * ICO_DIRECTORY_ENTRY_SIZE;
    let dataOffset = headerSize + directorySize;
    
    // Build directory entries and collect data
    const directoryEntries = [];
    const imageData = [];
    
    for (let i = 0; i < numImages; i++) {
        const { size } = sortedImages[i];
        const pngData = pngDataArray[i];
        const dataSize = pngData.length;
        
        // Directory entry: width(1) + height(1) + colors(1) + reserved(1) + planes(2) + bpp(2) + size(4) + offset(4)
        const entry = new Uint8Array(ICO_DIRECTORY_ENTRY_SIZE);
        const view = new DataView(entry.buffer);
        
        // Width and height (0 means 256 pixels)
        entry[0] = size === 256 ? 0 : size;
        entry[1] = size === 256 ? 0 : size;
        // Color count (0 = more than 256)
        entry[2] = 0;
        // Reserved
        entry[3] = 0;
        // Color planes (1 for PNG)
        view.setUint16(4, 1, true);
        // Bits per pixel (32 for PNG with alpha)
        view.setUint16(6, 32, true);
        // Size of image data in bytes
        view.setUint32(8, dataSize, true);
        // Offset to image data
        view.setUint32(12, dataOffset, true);
        
        directoryEntries.push(entry);
        imageData.push(pngData);
        
        dataOffset += dataSize;
    }
    
    // Build ICO header
    const header = new Uint8Array(ICO_HEADER_SIZE);
    const headerView = new DataView(header.buffer);
    // Reserved (must be 0)
    headerView.setUint16(0, 0, true);
    // Image type (1 = ICO, 2 = CUR)
    headerView.setUint16(2, 1, true);
    // Number of images
    headerView.setUint16(4, numImages, true);
    
    // Combine all parts
    const totalSize = dataOffset;
    const icoData = new Uint8Array(totalSize);
    let offset = 0;
    
    // Write header
    icoData.set(header, offset);
    offset += headerSize;
    
    // Write directory entries
    for (const entry of directoryEntries) {
        icoData.set(entry, offset);
        offset += ICO_DIRECTORY_ENTRY_SIZE;
    }
    
    // Write image data
    for (const data of imageData) {
        icoData.set(data, offset);
        offset += data.length;
    }
    
    return new Blob([icoData], { type: 'image/x-icon' });
}

/**
 * Convert canvas to blob
 */
function canvasToBlob(canvas, type = 'image/png', quality = 0.92) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), type, quality);
    });
}

/**
 * Generate favicon package with multiple formats
 * @param {HTMLImageElement} img - Source image
 * @returns {Promise<Map<string, Blob>>} Map of filename to blob
 */
export async function generateFaviconPackage(img) {
    const faviconPackage = new Map();
    const sizes = [16, 32, 48, 64, 128, 256];
    const canvases = [];
    
    // Generate canvases for each size
    for (const size of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Use cover resize (maintain aspect ratio, fill entire canvas)
        const scale = Math.max(size / img.width, size / img.height);
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;
        
        // Enable high quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        canvases.push({ size, canvas });
    }
    
    // Create ICO file with all sizes
    const icoBlob = await createIcoFile(canvases);
    faviconPackage.set('favicon.ico', icoBlob);
    
    // Also create individual PNGs for modern browsers
    const largeCanvas = canvases.find(c => c.size === 256)?.canvas || canvases[canvases.length - 1].canvas;
    
    // 180x180 Apple touch icon
    const appleCanvas = document.createElement('canvas');
    appleCanvas.width = 180;
    appleCanvas.height = 180;
    const appleCtx = appleCanvas.getContext('2d');
    appleCtx.imageSmoothingEnabled = true;
    appleCtx.imageSmoothingQuality = 'high';
    const appleScale = Math.max(180 / img.width, 180 / img.height);
    const appleX = (180 - img.width * appleScale) / 2;
    const appleY = (180 - img.height * appleScale) / 2;
    appleCtx.drawImage(img, appleX, appleY, img.width * appleScale, img.height * appleScale);
    const appleBlob = await canvasToBlob(appleCanvas, 'image/png');
    faviconPackage.set('apple-touch-icon.png', appleBlob);
    
    // 192x192 PNG icon
    const icon192Canvas = canvases.find(c => c.size === 192)?.canvas;
    if (icon192Canvas) {
        const icon192Blob = await canvasToBlob(icon192Canvas, 'image/png');
        faviconPackage.set('icon-192x192.png', icon192Blob);
    }
    
    // 512x512 PNG icon
    const icon512Canvas = document.createElement('canvas');
    icon512Canvas.width = 512;
    icon512Canvas.height = 512;
    const icon512Ctx = icon512Canvas.getContext('2d');
    icon512Ctx.imageSmoothingEnabled = true;
    icon512Ctx.imageSmoothingQuality = 'high';
    const scale512 = Math.max(512 / img.width, 512 / img.height);
    const x512 = (512 - img.width * scale512) / 2;
    const y512 = (512 - img.height * scale512) / 2;
    icon512Ctx.drawImage(img, x512, y512, img.width * scale512, img.height * scale512);
    const icon512Blob = await canvasToBlob(icon512Canvas, 'image/png');
    faviconPackage.set('icon-512x512.png', icon512Blob);
    
    return faviconPackage;
}

/**
 * Create a File object from a blob with proper naming
 */
export function blobToFile(blob, filename) {
    return new File([blob], filename, {
        type: blob.type,
        lastModified: Date.now(),
    });
}
