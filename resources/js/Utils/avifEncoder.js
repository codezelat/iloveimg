/**
 * AVIF Encoder Utility
 *
 * Uses Google's Squoosh library for AVIF encoding in the browser.
 * AVIF provides superior compression compared to JPEG, PNG, and WebP.
 *
 * Browser Support:
 * - Chrome 85+
 * - Firefox 93+
 * - Safari 16+
 *
 * @see https://github.com/GoogleChromeLabs/squoosh
 */

// Lazy-loaded Squoosh instances
let squooshLib = null;
let squooshLoading = null;

// Track browser support
let avifSupportCache = null;

/**
 * Check if the browser supports AVIF decoding
 * Uses feature detection by trying to decode a small AVIF test image
 * @returns {Promise<boolean>}
 */
export async function isAvifSupported() {
    if (avifSupportCache !== null) {
        return avifSupportCache;
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            avifSupportCache = true;
            resolve(true);
        };
        img.onerror = () => {
            avifSupportCache = false;
            resolve(false);
        };
        // Tiny 1x1 pixel AVIF test image (base64 encoded)
        img.src =
            "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    });
}

/**
 * Load Squoosh library dynamically
 * @returns {Promise<Object>}
 */
async function loadSquoosh() {
    if (squooshLib) return squooshLib;
    if (squooshLoading) return squooshLoading;

    squooshLoading = (async () => {
        try {
            const { ImagePool } = await import("@squoosh/lib");
            squooshLib = { ImagePool };
            return squooshLib;
        } catch (error) {
            console.error("Failed to load Squoosh library:", error);
            throw new Error("Failed to load AVIF encoder. Please try again.");
        }
    })();

    return squooshLoading;
}

/**
 * Convert an image to AVIF format
 *
 * @param {File|Blob|ImageBitmap} imageSource - The image to convert
 * @param {Object} [options] - Encoding options
 * @param {number} [options.quality] - Quality setting (1-100, default 50)
 * @param {number} [options.speed] - Encoding speed (0-10, higher is faster but lower quality, default 4)
 * @returns {Promise<Blob>} - The AVIF encoded image as a Blob
 */
export async function encodeToAvif(imageSource, options = {}) {
    const { quality = 50, speed = 4 } = options;

    // Normalize quality to 0-100 range
    const normalizedQuality = Math.max(1, Math.min(100, quality));

    // Normalize speed to 0-10 range
    const normalizedSpeed = Math.max(0, Math.min(10, speed));

    try {
        const { ImagePool } = await loadSquoosh();
        const imagePool = new ImagePool();

        try {
            // Get image data as ArrayBuffer
            let imageBuffer;
            let fileName = "image";

            if (imageSource instanceof File || imageSource instanceof Blob) {
                imageBuffer = await imageSource.arrayBuffer();
                fileName = "name" in imageSource ? imageSource.name : "image";
            } else if (imageSource instanceof ImageBitmap) {
                // Convert ImageBitmap to canvas then to blob
                const canvas = document.createElement("canvas");
                canvas.width = imageSource.width;
                canvas.height = imageSource.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(imageSource, 0, 0);
                const blob = await new Promise((resolve) =>
                    canvas.toBlob(resolve, "image/png"),
                );
                imageBuffer = await blob.arrayBuffer();
                imageSource.close(); // Clean up ImageBitmap
            } else {
                throw new Error("Unsupported image source type");
            }

            // Ingest image into Squoosh
            const image = imagePool.ingestImage(new Uint8Array(imageBuffer));

            // Encode to AVIF
            await image.encode({
                avif: {
                    quality: normalizedQuality,
                    speed: normalizedSpeed,
                },
            });

            // Get encoded AVIF data
            const encodedImage = await image.encodedWith.avif;
            const avifBlob = new Blob([encodedImage.binary], {
                type: "image/avif",
            });

            return avifBlob;
        } finally {
            // Clean up image pool
            await imagePool.close();
        }
    } catch (error) {
        console.error("AVIF encoding failed:", error);
        throw new Error(`AVIF encoding failed: ${error.message}`);
    }
}

/**
 * Convert an image File to AVIF File
 *
 * @param {File} file - The image file to convert
 * @param {Object} [options] - Encoding options
 * @param {number} [options.quality] - Quality setting (1-100, default 50)
 * @param {number} [options.speed] - Encoding speed (0-10, default 4)
 * @returns {Promise<File>} - The AVIF encoded image as a File
 */
export async function convertFileToAvif(file, options = {}) {
    const avifBlob = await encodeToAvif(file, options);

    // Generate output filename
    const originalName = file.name || "image";
    const baseName = originalName.replace(/\.[^/.]+$/, "");
    const outputName = `${baseName}.avif`;

    return new File([avifBlob], outputName, {
        type: "image/avif",
        lastModified: Date.now(),
    });
}

/**
 * Decode AVIF image (if browser supports it natively)
 *
 * Note: Most browsers that support AVIF encoding also support decoding.
 * This function uses the native browser Image API to decode AVIF.
 *
 * @param {ArrayBuffer} arrayBuffer - The AVIF image data
 * @returns {Promise<ImageBitmap>} - The decoded image
 */
export async function decodeAvif(arrayBuffer) {
    const isSupported = await isAvifSupported();

    if (!isSupported) {
        throw new Error(
            "Your browser does not support AVIF decoding. Please use Chrome 85+, Firefox 93+, or Safari 16+.",
        );
    }

    try {
        const blob = new Blob([arrayBuffer], { type: "image/avif" });
        const bitmap = await createImageBitmap(blob);
        return bitmap;
    } catch (error) {
        console.error("AVIF decoding failed:", error);
        throw new Error(`AVIF decoding failed: ${error.message}`);
    }
}

/**
 * Convert AVIF to another format using canvas
 * This is useful for converting AVIF to formats the browser can natively save
 *
 * @param {File|Blob|ArrayBuffer} avifSource - The AVIF image
 * @param {string} targetFormat - Target format ('jpeg', 'png', 'webp')
 * @param {number} quality - Quality for lossy formats (0-1, default 0.92)
 * @returns {Promise<Blob>} - The converted image as a Blob
 */
export async function convertAvifToFormat(
    avifSource,
    targetFormat = "jpeg",
    quality = 0.92,
) {
    const isSupported = await isAvifSupported();

    if (!isSupported) {
        throw new Error(
            "Your browser does not support AVIF. Please use Chrome 85+, Firefox 93+, or Safari 16+ to convert AVIF files.",
        );
    }

    try {
        // Get the AVIF data as ArrayBuffer
        let arrayBuffer;
        if (avifSource instanceof File || avifSource instanceof Blob) {
            arrayBuffer = await avifSource.arrayBuffer();
        } else if (avifSource instanceof ArrayBuffer) {
            arrayBuffer = avifSource;
        } else {
            throw new Error("Unsupported AVIF source type");
        }

        // Decode AVIF to ImageBitmap
        const bitmap = await decodeAvif(arrayBuffer);

        // Create canvas and draw the image
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bitmap, 0, 0);

        // Clean up the bitmap
        bitmap.close();

        // Convert to target format
        const mimeType = `image/${targetFormat}`;
        const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, mimeType, quality);
        });

        return blob;
    } catch (error) {
        console.error(`AVIF to ${targetFormat} conversion failed:`, error);
        throw new Error(`Conversion failed: ${error.message}`);
    }
}

/**
 * Convert AVIF File to another format File
 *
 * @param {File} file - The AVIF file to convert
 * @param {string} targetFormat - Target format ('jpeg', 'png', 'webp')
 * @param {number} quality - Quality for lossy formats (0-1, default 0.92)
 * @returns {Promise<File>} - The converted file
 */
export async function convertAvifFileToFormat(
    file,
    targetFormat = "jpeg",
    quality = 0.92,
) {
    const blob = await convertAvifToFormat(file, targetFormat, quality);

    // Generate output filename
    const originalName = file.name || "image.avif";
    const baseName = originalName.replace(/\.[^/.]+$/, "");
    const extension = targetFormat === "jpeg" ? "jpg" : targetFormat;
    const outputName = `${baseName}.${extension}`;

    return new File([blob], outputName, {
        type: `image/${targetFormat}`,
        lastModified: Date.now(),
    });
}

/**
 * Get recommended quality settings for different use cases
 * @returns {Object}
 */
export function getQualityPresets() {
    return {
        small: {
            quality: 30,
            speed: 6,
            description: "Small file size, some quality loss",
        },
        balanced: {
            quality: 50,
            speed: 4,
            description: "Balanced quality and size (recommended)",
        },
        high: { quality: 70, speed: 3, description: "High quality" },
        lossless: {
            quality: 95,
            speed: 2,
            description: "Near lossless quality",
        },
    };
}

/**
 * Get browser support information for AVIF
 * @returns {Object}
 */
export function getAvifSupportInfo() {
    return {
        supported: avifSupportCache,
        chrome: { min: 85, supported: avifSupportCache },
        firefox: { min: 93, supported: avifSupportCache },
        safari: { min: 16, supported: avifSupportCache },
    };
}

export default {
    isAvifSupported,
    encodeToAvif,
    convertFileToAvif,
    decodeAvif,
    convertAvifToFormat,
    convertAvifFileToFormat,
    getQualityPresets,
    getAvifSupportInfo,
};
