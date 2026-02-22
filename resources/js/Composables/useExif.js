import EXIF from "exif-js";

/**
 * EXIF metadata handling composable
 * Works client-side only (browser)
 * Supports JPEG and TIFF formats
 */

/**
 * Check if file type supports EXIF metadata
 * @param {File} file
 * @returns {boolean}
 */
const supportsExif = (file) => {
    if (!file || !file.type) return false;
    const supportedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/tiff",
        "image/tif",
    ];
    return supportedTypes.includes(file.type.toLowerCase());
};

/**
 * Extract EXIF data from a file
 * @param {File} file - The image file
 * @returns {Promise<Object|null>} - EXIF data object or null
 */
const extractExif = async (file) => {
    if (!supportsExif(file)) {
        return null;
    }

    try {
        const exifData = await new Promise((resolve, reject) => {
            // @ts-ignore
            EXIF.getData(file, function () {
                try {
                    const data = EXIF.getAllTags(this);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        });

        // Return null if no EXIF data found (empty object)
        if (!exifData || Object.keys(exifData).length === 0) {
            return null;
        }

        return exifData;
    } catch (error) {
        console.warn("EXIF extraction failed:", error);
        return null;
    }
};

/**
 * Get EXIF orientation value
 * @param {File} file - The image file
 * @returns {Promise<number>} - Orientation value (1-8), defaults to 1
 */
const getOrientation = async (file) => {
    if (!supportsExif(file)) {
        return 1;
    }

    try {
        const orientation = await new Promise((resolve) => {
            // @ts-ignore
            EXIF.getData(file, function () {
                const orientation = EXIF.getTag(this, "Orientation");
                resolve(orientation || 1);
            });
        });
        return orientation;
    } catch (error) {
        console.warn("Could not get orientation:", error);
        return 1;
    }
};

/**
 * Apply rotation/flip to canvas based on EXIF orientation
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {number} orientation - EXIF orientation value (1-8)
 * @returns {HTMLCanvasElement} - New canvas with applied orientation
 */
const applyOrientation = (canvas, orientation) => {
    if (!orientation || orientation === 1) {
        return canvas;
    }

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Create a new canvas for the transformed image
    const newCanvas = document.createElement("canvas");
    const newCtx = newCanvas.getContext("2d");

    // Set dimensions based on orientation
    if (orientation > 4) {
        newCanvas.width = height;
        newCanvas.height = width;
    } else {
        newCanvas.width = width;
        newCanvas.height = height;
    }

    // Apply transformations based on EXIF orientation
    switch (orientation) {
        case 2: // Flip horizontal
            newCtx.translate(newCanvas.width, 0);
            newCtx.scale(-1, 1);
            newCtx.drawImage(canvas, 0, 0);
            break;
        case 3: // Rotate 180
            newCtx.translate(newCanvas.width, newCanvas.height);
            newCtx.rotate(Math.PI);
            newCtx.drawImage(canvas, 0, 0);
            break;
        case 4: // Flip vertical
            newCtx.translate(0, newCanvas.height);
            newCtx.scale(1, -1);
            newCtx.drawImage(canvas, 0, 0);
            break;
        case 5: // Flip horizontal, then rotate 270 CW
            newCtx.rotate(-Math.PI / 2);
            newCtx.scale(-1, 1);
            newCtx.drawImage(canvas, -height, 0);
            break;
        case 6: // Rotate 90 CW
            newCtx.rotate(-Math.PI / 2);
            newCtx.drawImage(canvas, -height, 0);
            break;
        case 7: // Flip horizontal, then rotate 90 CW
            newCtx.rotate(Math.PI / 2);
            newCtx.scale(-1, 1);
            newCtx.drawImage(canvas, 0, -width);
            break;
        case 8: // Rotate 270 CW
            newCtx.rotate(Math.PI / 2);
            newCtx.drawImage(canvas, 0, -width);
            break;
        default:
            newCtx.drawImage(canvas, 0, 0);
    }

    return newCanvas;
};

/**
 * Strip EXIF data from a file by re-encoding it
 * Note: This creates a new file without metadata
 * @param {File} file - The image file
 * @returns {Promise<File>} - File without EXIF data
 */
const stripExif = async (file) => {
    if (!supportsExif(file)) {
        return file;
    }

    try {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");

                // Draw image without EXIF
                ctx.drawImage(img, 0, 0);

                // Convert back to file without EXIF
                const mimeType = file.type || "image/jpeg";
                const quality = mimeType === "image/jpeg" ? 0.92 : undefined;

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Failed to strip EXIF data"));
                            return;
                        }
                        const strippedFile = new File([blob], file.name, {
                            type: mimeType,
                            lastModified: Date.now(),
                        });
                        resolve(strippedFile);
                    },
                    mimeType,
                    quality,
                );
            };
            img.onerror = () =>
                reject(new Error("Failed to load image for EXIF stripping"));
            img.src = URL.createObjectURL(file);
        });
    } catch (error) {
        console.warn("EXIF stripping failed:", error);
        return file;
    }
};

/**
 * Format GPS coordinates from EXIF data
 * @param {Object} exifData - EXIF data object
 * @returns {string|null} - Formatted GPS string or null
 */
const formatGpsCoordinates = (exifData) => {
    if (!exifData) return null;

    const lat = exifData.GPSLatitude;
    const latRef = exifData.GPSLatitudeRef;
    const lon = exifData.GPSLongitude;
    const lonRef = exifData.GPSLongitudeRef;

    if (!lat || !lon || !latRef || !lonRef) return null;

    const convertToDecimal = (coords, ref) => {
        if (!Array.isArray(coords) || coords.length < 3) return null;
        let decimal = coords[0] + coords[1] / 60 + coords[2] / 3600;
        if (ref === "S" || ref === "W") decimal = -decimal;
        return decimal;
    };

    const latitude = convertToDecimal(lat, latRef);
    const longitude = convertToDecimal(lon, lonRef);

    if (latitude === null || longitude === null) return null;

    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};

/**
 * Format date from EXIF data
 * @param {Object} exifData - EXIF data object
 * @returns {string|null} - Formatted date string or null
 */
const formatDateTaken = (exifData) => {
    if (!exifData) return null;

    const dateTime =
        exifData.DateTime ||
        exifData.DateTimeOriginal ||
        exifData.DateTimeDigitized;
    if (!dateTime) return null;

    // EXIF date format: "YYYY:MM:DD HH:MM:SS"
    const parts = dateTime.split(" ");
    if (parts.length !== 2) return dateTime;

    const [datePart, timePart] = parts;
    const formattedDate = datePart.replace(/:/g, "-");
    return `${formattedDate} ${timePart}`;
};

/**
 * Get camera make and model from EXIF
 * @param {Object} exifData - EXIF data object
 * @returns {string|null} - Camera info string or null
 */
const getCameraInfo = (exifData) => {
    if (!exifData) return null;

    const make = exifData.Make;
    const model = exifData.Model;

    if (!make && !model) return null;
    if (make && model) {
        // Remove make from model if model includes it
        const cleanModel = model.includes(make)
            ? model.replace(make, "").trim()
            : model;
        return `${make} ${cleanModel}`.trim();
    }
    return (make || model).trim();
};

/**
 * Get orientation description
 * @param {number} orientation - EXIF orientation value
 * @returns {string} - Human-readable description
 */
const getOrientationDescription = (orientation) => {
    const descriptions = {
        1: "Normal (0°)",
        2: "Flipped horizontally",
        3: "Rotated 180°",
        4: "Flipped vertically",
        5: "Rotated 90° CW, flipped",
        6: "Rotated 90° CW",
        7: "Rotated 270° CW, flipped",
        8: "Rotated 270° CW",
    };
    return descriptions[orientation] || `Orientation ${orientation}`;
};

export function useExif() {
    return {
        extractExif,
        stripExif,
        getOrientation,
        applyOrientation,
        supportsExif,
        formatGpsCoordinates,
        formatDateTaken,
        getCameraInfo,
        getOrientationDescription,
    };
}
