import { ref } from "vue";

export function useImageProcessor() {
    const isProcessing = ref(false);
    const processedImages = ref([]);
    const progress = ref(0);

    const supportedFormats = [
        { label: "JPEG", value: "jpeg" },
        { label: "PNG", value: "png" },
        { label: "WEBP", value: "webp" },
        { label: "GIF", value: "gif" },
        { label: "BMP", value: "bmp" },
        { label: "TIFF", value: "tiff" },
    ];

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const formatFileSizeLabel = (bytes = 0) => {
        if (!bytes) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = Math.round((bytes / Math.pow(k, i)) * 100) / 100;
        return `${value} ${sizes[i]}`;
    };

    const readFileAsDataUrl = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const createImageFromSource = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    const normalizeFormat = (format, fallbackType) => {
        if (!format && fallbackType) {
            return fallbackType.split("/")[1];
        }
        if (!format) return "png";
        const normalized = format.replace(".", "").toLowerCase();
        if (normalized === "jpg") return "jpeg";
        return normalized;
    };

    const normalizeQuality = (quality) => {
        if (quality === undefined || quality === null) return 0.92;
        if (quality > 1) {
            return clamp(quality / 100, 0.05, 1);
        }
        return clamp(quality, 0.05, 1);
    };

    const formatSupportsAlpha = (format) => {
        return !["jpeg", "jpg", "bmp"].includes(format);
    };

    const canvasToFile = (canvas, filename, mimeType, quality = 0.92) => {
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Unable to process image"));
                        return;
                    }
                    resolve(
                        new File([blob], filename, {
                            type: mimeType,
                            lastModified: Date.now(),
                        })
                    );
                },
                mimeType,
                quality
            );
        });
    };

    const buildFilterString = (filters = {}) => {
        const {
            brightness = 100,
            contrast = 100,
            saturation = 100,
            hue = 0,
            blur = 0,
            grayscale = 0,
            sepia = 0,
        } = filters;

        return [
            `brightness(${clamp(brightness, 0, 300) / 100})`,
            `contrast(${clamp(contrast, 0, 300) / 100})`,
            `saturate(${clamp(saturation, 0, 300) / 100})`,
            `hue-rotate(${clamp(hue, -180, 180)}deg)`,
            `blur(${clamp(blur, 0, 50)}px)`,
            `grayscale(${clamp(grayscale, 0, 100) / 100})`,
            `sepia(${clamp(sepia, 0, 100) / 100})`,
        ].join(" ");
    };

    const calculateResizeDimensions = (img, resizeOptions = {}) => {
        const mode = resizeOptions.mode || resizeOptions.resizeMode || "original";
        if (mode === "percentage") {
            const percentage = clamp(resizeOptions.percentage || 100, 1, 500) / 100;
            return {
                width: Math.round(img.width * percentage),
                height: Math.round(img.height * percentage),
            };
        }

        const targetWidth = resizeOptions.width || img.width;
        const targetHeight = resizeOptions.height || img.height;

        if (mode === "contain") {
            const ratio = Math.min(targetWidth / img.width, targetHeight / img.height);
            const safeRatio = ratio === Infinity ? 1 : ratio;
            return {
                width: Math.round(img.width * safeRatio),
                height: Math.round(img.height * safeRatio),
            };
        }

        if (mode === "exact") {
            if (resizeOptions.maintainAspect) {
                const ratio = Math.min(targetWidth / img.width, targetHeight / img.height);
                const safeRatio = ratio === Infinity ? 1 : ratio;
                return {
                    width: Math.round(img.width * safeRatio),
                    height: Math.round(img.height * safeRatio),
                };
            }
            return {
                width: Math.round(targetWidth),
                height: Math.round(targetHeight),
            };
        }

        return {
            width: img.width,
            height: img.height,
        };
    };

    const getCanvasSizeForRotation = (width, height, rotation) => {
        const rad = (rotation * Math.PI) / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        return {
            width: Math.round(width * cos + height * sin),
            height: Math.round(width * sin + height * cos),
        };
    };

    const fileToDataUrl = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const convertImage = async (file, targetFormat, quality = 0.92) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(
                        (blob) => {
                            const convertedFile = new File(
                                [blob],
                                file.name.replace(
                                    /\.[^/.]+$/,
                                    `.${targetFormat}`
                                ),
                                { type: `image/${targetFormat}` }
                            );
                            resolve(convertedFile);
                        },
                        `image/${targetFormat}`,
                        quality
                    );
                };
                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const compressImage = async (file, quality = 0.7) => {
        const format = file.type.split("/")[1];
        return await convertImage(file, format, quality);
    };

    const resizeImage = async (file, width, height, maintainAspect = true) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");

                    if (maintainAspect) {
                        const ratio = Math.min(
                            width / img.width,
                            height / img.height
                        );
                        canvas.width = img.width * ratio;
                        canvas.height = img.height * ratio;
                    } else {
                        canvas.width = width;
                        canvas.height = height;
                    }

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const format = file.type.split("/")[1];
                    canvas.toBlob(
                        (blob) => {
                            const resizedFile = new File([blob], file.name, {
                                type: file.type,
                            });
                            resolve(resizedFile);
                        },
                        file.type,
                        0.92
                    );
                };
                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const rotateImage = async (file, degrees) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const rad = (degrees * Math.PI) / 180;

                    if (degrees === 90 || degrees === 270) {
                        canvas.width = img.height;
                        canvas.height = img.width;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }

                    const ctx = canvas.getContext("2d");
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate(rad);
                    ctx.drawImage(img, -img.width / 2, -img.height / 2);

                    canvas.toBlob(
                        (blob) => {
                            const rotatedFile = new File([blob], file.name, {
                                type: file.type,
                            });
                            resolve(rotatedFile);
                        },
                        file.type,
                        0.92
                    );
                };
                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const imageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const base64ToImage = (base64, filename = "image.png") => {
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const downloadFile = (file) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const cropImage = async (file, cropArea) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = cropArea.width;
                    canvas.height = cropArea.height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(
                        img,
                        cropArea.x,
                        cropArea.y,
                        cropArea.width,
                        cropArea.height,
                        0,
                        0,
                        cropArea.width,
                        cropArea.height
                    );

                    canvas.toBlob(
                        (blob) => {
                            const croppedFile = new File([blob], file.name, {
                                type: file.type,
                            });
                            resolve(croppedFile);
                        },
                        file.type,
                        0.92
                    );
                };
                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const addWatermarkToImage = async (file, watermarkConfig) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    // Set transparency
                    ctx.globalAlpha = watermarkConfig.opacity;

                    if (watermarkConfig.type === "text") {
                        // Add text watermark
                        ctx.font = `${watermarkConfig.fontSize}px ${watermarkConfig.fontFamily}`;
                        ctx.fillStyle = watermarkConfig.color;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";

                        // Calculate position
                        const positions = {
                            "top-left": { x: 50, y: 50 },
                            "top-center": { x: canvas.width / 2, y: 50 },
                            "top-right": { x: canvas.width - 50, y: 50 },
                            center: {
                                x: canvas.width / 2,
                                y: canvas.height / 2,
                            },
                            "bottom-left": { x: 50, y: canvas.height - 50 },
                            "bottom-center": {
                                x: canvas.width / 2,
                                y: canvas.height - 50,
                            },
                            "bottom-right": {
                                x: canvas.width - 50,
                                y: canvas.height - 50,
                            },
                        };

                        const pos =
                            positions[watermarkConfig.position] ||
                            positions["bottom-right"];
                        ctx.fillText(watermarkConfig.text, pos.x, pos.y);
                    } else if (
                        watermarkConfig.type === "image" &&
                        watermarkConfig.watermarkImage
                    ) {
                        // Add image watermark
                        const wmImg = new Image();
                        wmImg.onload = () => {
                            const wmWidth = watermarkConfig.size || 100;
                            const wmHeight =
                                (wmImg.height / wmImg.width) * wmWidth;

                            // Calculate position
                            const positions = {
                                "top-left": { x: 20, y: 20 },
                                "top-center": {
                                    x: (canvas.width - wmWidth) / 2,
                                    y: 20,
                                },
                                "top-right": {
                                    x: canvas.width - wmWidth - 20,
                                    y: 20,
                                },
                                center: {
                                    x: (canvas.width - wmWidth) / 2,
                                    y: (canvas.height - wmHeight) / 2,
                                },
                                "bottom-left": {
                                    x: 20,
                                    y: canvas.height - wmHeight - 20,
                                },
                                "bottom-center": {
                                    x: (canvas.width - wmWidth) / 2,
                                    y: canvas.height - wmHeight - 20,
                                },
                                "bottom-right": {
                                    x: canvas.width - wmWidth - 20,
                                    y: canvas.height - wmHeight - 20,
                                },
                            };

                            const pos =
                                positions[watermarkConfig.position] ||
                                positions["bottom-right"];
                            ctx.drawImage(
                                wmImg,
                                pos.x,
                                pos.y,
                                wmWidth,
                                wmHeight
                            );

                            canvas.toBlob(
                                (blob) => {
                                    const watermarkedFile = new File(
                                        [blob],
                                        file.name,
                                        { type: file.type }
                                    );
                                    resolve(watermarkedFile);
                                },
                                file.type,
                                0.92
                            );
                        };
                        wmImg.onerror = reject;
                        wmImg.src = watermarkConfig.watermarkImage;
                    }

                    if (watermarkConfig.type === "text") {
                        canvas.toBlob(
                            (blob) => {
                                const watermarkedFile = new File(
                                    [blob],
                                    file.name,
                                    { type: file.type }
                                );
                                resolve(watermarkedFile);
                            },
                            file.type,
                            0.92
                        );
                    }
                };
                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const downloadFiles = (files) => {
        files.forEach((file, index) => {
            setTimeout(() => {
                downloadFile(file);
            }, index * 100);
        });
    };

    const processPipeline = async (file, pipelineOptions = {}) => {
        const dataUrl = await readFileAsDataUrl(file);
        const img = await createImageFromSource(dataUrl);

        const resizeOptions =
            pipelineOptions.resize || {
                mode: pipelineOptions.resizeMode,
                width: pipelineOptions.width,
                height: pipelineOptions.height,
                percentage: pipelineOptions.percentage,
                maintainAspect: pipelineOptions.maintainAspect,
            };

        const { width, height } = calculateResizeDimensions(img, resizeOptions || {});
        const rotation = pipelineOptions.rotate || 0;
        const canvasSize = getCanvasSizeForRotation(width, height, rotation);

        const canvas = document.createElement("canvas");
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;

        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const format = normalizeFormat(
            pipelineOptions.format,
            file.type || `image/${file.name.split(".").pop()}`
        );

        const backgroundColor = pipelineOptions.backgroundColor;
        if (backgroundColor && backgroundColor !== "transparent") {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (!formatSupportsAlpha(format)) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.filter = buildFilterString(pipelineOptions.filters);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        const scaleX = pipelineOptions.flipHorizontal ? -1 : 1;
        const scaleY = pipelineOptions.flipVertical ? -1 : 1;
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(img, -width / 2, -height / 2, width, height);

        const mimeType = `image/${format}`;
        const extension = format === "jpeg" ? "jpg" : format;
        const outputName = file.name.replace(/\.[^/.]+$/, `.${extension}`);
        const quality = normalizeQuality(pipelineOptions.quality);

        return await canvasToFile(canvas, outputName, mimeType, quality);
    };

    const extractMetadata = async (file) => {
        const dataUrl = await readFileAsDataUrl(file);
        const img = await createImageFromSource(dataUrl);
        const pixelCount = img.width * img.height;
        const ratio = img.height ? img.width / img.height : 0;

        return {
            name: file.name,
            type: file.type || `image/${file.name.split(".").pop()}`,
            size: file.size,
            sizeLabel: formatFileSizeLabel(file.size),
            width: img.width,
            height: img.height,
            megapixels: Number((pixelCount / 1000000).toFixed(2)),
            aspectRatio: ratio ? Number(ratio.toFixed(2)) : null,
            orientation: img.width >= img.height ? "Landscape" : "Portrait",
        };
    };

    const generatePreview = async (file, options = {}) => {
        const hasTransformations = Object.keys(options || {}).length > 0;
        if (!hasTransformations) {
            return await readFileAsDataUrl(file);
        }

        const previewFile = await processPipeline(file, {
            ...options,
            quality: normalizeQuality(options.quality ?? 0.6),
        });

        return await fileToDataUrl(previewFile);
    };

    return {
        isProcessing,
        processedImages,
        progress,
        convertImage,
        compressImage,
        resizeImage,
        rotateImage,
        cropImage,
        addWatermarkToImage,
        imageToBase64,
        base64ToImage,
        downloadFile,
        downloadFiles,
        processPipeline,
        extractMetadata,
        generatePreview,
        supportedFormats,
        formatFileSizeLabel,
    };
}
