<template>
    <AppLayout>
        <div class="px-4 max-w-6xl mx-auto">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">
                    {{ toolName }}
                </h1>
                <p class="text-lg text-gray-600">{{ description }}</p>
            </div>

            <FileUploader
                @files-selected="handleFilesSelected"
                accepted-formats="image/*"
            />

            <div
                v-if="selectedFile && imageUrl"
                class="mt-6 bg-white rounded-xl shadow-lg p-6"
            >
                <div class="grid lg:grid-cols-2 gap-6">
                    <!-- Image Preview -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-900">
                            Preview
                        </h3>
                        <div
                            class="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50"
                        >
                            <canvas
                                ref="canvasRef"
                                class="max-w-full h-auto"
                            ></canvas>
                        </div>
                    </div>

                    <!-- Watermark Controls -->
                    <div class="space-y-6">
                        <h3 class="text-lg font-semibold text-gray-900">
                            Watermark Settings
                        </h3>

                        <!-- Watermark Type -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                                >Watermark Type</label
                            >
                            <div class="grid grid-cols-2 gap-2">
                                <button
                                    @click="watermarkType = 'text'"
                                    :class="[
                                        'px-4 py-3 rounded-lg font-medium transition-colors',
                                        watermarkType === 'text'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    📝 Text
                                </button>
                                <button
                                    @click="watermarkType = 'image'"
                                    :class="[
                                        'px-4 py-3 rounded-lg font-medium transition-colors',
                                        watermarkType === 'image'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    🖼️ Image
                                </button>
                            </div>
                        </div>

                        <!-- Text Watermark Options -->
                        <div v-if="watermarkType === 'text'" class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Watermark Text</label
                                >
                                <input
                                    v-model="watermarkText"
                                    type="text"
                                    placeholder="Enter watermark text..."
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    @input="updatePreview"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Font Size: {{ fontSize }}px</label
                                >
                                <input
                                    v-model.number="fontSize"
                                    type="range"
                                    min="12"
                                    max="120"
                                    class="w-full"
                                    @input="updatePreview"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Font Family</label
                                >
                                <select
                                    v-model="fontFamily"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    @change="updatePreview"
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Times New Roman">
                                        Times New Roman
                                    </option>
                                    <option value="Courier New">
                                        Courier New
                                    </option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Impact">Impact</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Text Color</label
                                >
                                <div class="flex gap-2">
                                    <input
                                        v-model="textColor"
                                        type="color"
                                        class="h-10 w-20 rounded border border-gray-300"
                                        @input="updatePreview"
                                    />
                                    <input
                                        v-model="textColor"
                                        type="text"
                                        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        @input="updatePreview"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Image Watermark Options -->
                        <div v-if="watermarkType === 'image'" class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Upload Watermark Image</label
                                >
                                <input
                                    type="file"
                                    accept="image/*"
                                    @change="handleWatermarkImageUpload"
                                    class="input-file"
                                />
                            </div>

                            <div v-if="watermarkImageUrl">
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Watermark Size:
                                    {{ watermarkSize }}px</label
                                >
                                <input
                                    v-model.number="watermarkSize"
                                    type="range"
                                    min="50"
                                    max="500"
                                    class="w-full"
                                    @input="updatePreview"
                                />
                            </div>
                        </div>

                        <!-- Common Options -->
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Opacity:
                                    {{ Math.round(opacity * 100) }}%</label
                                >
                                <input
                                    v-model.number="opacity"
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.05"
                                    class="w-full"
                                    @input="updatePreview"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                    >Position</label
                                >
                                <div class="grid grid-cols-3 gap-2">
                                    <button
                                        v-for="pos in positions"
                                        :key="pos.value"
                                        @click="
                                            position = pos.value;
                                            updatePreview();
                                        "
                                        :class="[
                                            'px-3 py-2 rounded text-xs font-medium transition-colors',
                                            position === pos.value
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                        ]"
                                    >
                                        {{ pos.label }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="space-y-2 pt-4">
                            <button
                                @click="applyWatermark"
                                :disabled="
                                    isProcessing ||
                                    (watermarkType === 'text' &&
                                        !watermarkText) ||
                                    (watermarkType === 'image' &&
                                        !watermarkImageUrl)
                                "
                                class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span v-if="isProcessing">Processing...</span>
                                <span v-else>Apply Watermark & Download</span>
                            </button>
                            <button
                                @click="reset"
                                class="w-full px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import AppLayout from "../../Components/Layout/AppLayout.vue";
import FileUploader from "../../Components/UI/FileUploader.vue";
import { useImageProcessor } from "../../../Composables/useImageProcessor";

defineProps({
    toolName: String,
    description: String,
});

const { addWatermarkToImage, downloadFile } = useImageProcessor();

const selectedFile = ref(null);
const imageUrl = ref(null);
const canvasRef = ref(null);
const isProcessing = ref(false);

const watermarkType = ref("text");
const watermarkText = ref("© Your Watermark");
const fontSize = ref(36);
const fontFamily = ref("Arial");
const textColor = ref("#ffffff");
const watermarkImageUrl = ref(null);
const watermarkSize = ref(150);
const opacity = ref(0.6);
const position = ref("bottom-right");

const positions = [
    { value: "top-left", label: "↖ Top Left" },
    { value: "top-center", label: "↑ Top Center" },
    { value: "top-right", label: "↗ Top Right" },
    { value: "center", label: "⊙ Center" },
    { value: "bottom-left", label: "↙ Bottom Left" },
    { value: "bottom-center", label: "↓ Bottom Center" },
    { value: "bottom-right", label: "↘ Bottom Right" },
];

const handleFilesSelected = (files) => {
    if (files.length > 0) {
        selectedFile.value = files[0];
        if (imageUrl.value) {
            URL.revokeObjectURL(imageUrl.value);
        }
        imageUrl.value = URL.createObjectURL(files[0]);
        loadImageToCanvas();
    }
};

const handleWatermarkImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (watermarkImageUrl.value) {
            URL.revokeObjectURL(watermarkImageUrl.value);
        }
        watermarkImageUrl.value = URL.createObjectURL(file);
        updatePreview();
    }
};

const loadImageToCanvas = () => {
    if (!imageUrl.value || !canvasRef.value) return;

    const img = new Image();
    img.onload = () => {
        const canvas = canvasRef.value;
        const maxWidth = canvas.parentElement.clientWidth;
        const scale = Math.min(1, maxWidth / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        updatePreview();
    };
    img.src = imageUrl.value;
};

const updatePreview = () => {
    if (!canvasRef.value || !imageUrl.value) return;

    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
        // Redraw original image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply watermark
        ctx.globalAlpha = opacity.value;

        if (watermarkType.value === "text" && watermarkText.value) {
            // Scale font size proportionally
            const scaledFontSize =
                (fontSize.value / img.naturalWidth) * canvas.width;
            ctx.font = `${scaledFontSize}px ${fontFamily.value}`;
            ctx.fillStyle = textColor.value;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const pos = getPosition(canvas.width, canvas.height, 0, 0);
            ctx.fillText(watermarkText.value, pos.x, pos.y);
        } else if (watermarkType.value === "image" && watermarkImageUrl.value) {
            const wmImg = new Image();
            wmImg.onload = () => {
                const scaledSize =
                    (watermarkSize.value / img.naturalWidth) * canvas.width;
                const wmHeight = (wmImg.height / wmImg.width) * scaledSize;

                const pos = getPosition(
                    canvas.width,
                    canvas.height,
                    scaledSize,
                    wmHeight
                );
                ctx.drawImage(wmImg, pos.x, pos.y, scaledSize, wmHeight);
            };
            wmImg.src = watermarkImageUrl.value;
        }

        ctx.globalAlpha = 1;
    };
    img.src = imageUrl.value;
};

const getPosition = (canvasWidth, canvasHeight, wmWidth, wmHeight) => {
    const padding = 20;
    const positions = {
        "top-left": { x: padding, y: padding },
        "top-center": { x: canvasWidth / 2, y: padding },
        "top-right": { x: canvasWidth - padding, y: padding },
        center: { x: canvasWidth / 2, y: canvasHeight / 2 },
        "bottom-left": { x: padding, y: canvasHeight - padding },
        "bottom-center": { x: canvasWidth / 2, y: canvasHeight - padding },
        "bottom-right": { x: canvasWidth - padding, y: canvasHeight - padding },
    };

    // Adjust for image watermark positioning
    if (watermarkType.value === "image") {
        const pos = positions[position.value];
        if (position.value.includes("right")) pos.x -= wmWidth;
        if (position.value.includes("bottom")) pos.y -= wmHeight;
        if (
            position.value.includes("center") &&
            !position.value.includes("top") &&
            !position.value.includes("bottom")
        ) {
            pos.x -= wmWidth / 2;
            pos.y -= wmHeight / 2;
        } else if (position.value.includes("center")) {
            pos.x -= wmWidth / 2;
        }
        return pos;
    }

    return positions[position.value];
};

const applyWatermark = async () => {
    if (!selectedFile.value) return;

    isProcessing.value = true;

    try {
        const config = {
            type: watermarkType.value,
            opacity: opacity.value,
            position: position.value,
        };

        if (watermarkType.value === "text") {
            config.text = watermarkText.value;
            config.fontSize = fontSize.value;
            config.fontFamily = fontFamily.value;
            config.color = textColor.value;
        } else if (watermarkType.value === "image") {
            config.watermarkImage = watermarkImageUrl.value;
            config.size = watermarkSize.value;
        }

        const watermarkedFile = await addWatermarkToImage(
            selectedFile.value,
            config
        );
        downloadFile(watermarkedFile);
    } catch (error) {
        console.error("Watermark application failed:", error);
        alert("Failed to apply watermark. Please try again.");
    } finally {
        isProcessing.value = false;
    }
};

const reset = () => {
    selectedFile.value = null;
    if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
    }
    if (watermarkImageUrl.value) {
        URL.revokeObjectURL(watermarkImageUrl.value);
    }
    imageUrl.value = null;
    watermarkImageUrl.value = null;
    watermarkText.value = "© Your Watermark";
    watermarkType.value = "text";
    fontSize.value = 36;
    opacity.value = 0.6;
    position.value = "bottom-right";
};

onMounted(() => {
    window.addEventListener("resize", updatePreview);
});

onUnmounted(() => {
    window.removeEventListener("resize", updatePreview);
    if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
    }
    if (watermarkImageUrl.value) {
        URL.revokeObjectURL(watermarkImageUrl.value);
    }
});

watch(watermarkType, () => {
    updatePreview();
});
</script>
