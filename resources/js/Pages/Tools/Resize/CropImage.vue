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
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Image Preview with Crop Area -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-900">
                            Select Crop Area
                        </h3>
                        <div
                            class="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50"
                        >
                            <img
                                ref="imageRef"
                                :src="imageUrl"
                                alt="Image to crop"
                                class="max-w-full h-auto"
                                @load="onImageLoad"
                            />
                            <!-- Crop overlay -->
                            <div
                                v-if="imageLoaded"
                                class="absolute border-2 border-primary-600 bg-primary-600 bg-opacity-20 cursor-move"
                                :style="cropBoxStyle"
                                @mousedown="startDrag"
                            >
                                <!-- Resize handles -->
                                <div
                                    class="absolute w-3 h-3 bg-white border-2 border-primary-600 rounded-full cursor-nwse-resize"
                                    style="top: -6px; left: -6px"
                                    @mousedown.stop="startResize('nw', $event)"
                                ></div>
                                <div
                                    class="absolute w-3 h-3 bg-white border-2 border-primary-600 rounded-full cursor-nesw-resize"
                                    style="top: -6px; right: -6px"
                                    @mousedown.stop="startResize('ne', $event)"
                                ></div>
                                <div
                                    class="absolute w-3 h-3 bg-white border-2 border-primary-600 rounded-full cursor-nwse-resize"
                                    style="bottom: -6px; right: -6px"
                                    @mousedown.stop="startResize('se', $event)"
                                ></div>
                                <div
                                    class="absolute w-3 h-3 bg-white border-2 border-primary-600 rounded-full cursor-nesw-resize"
                                    style="bottom: -6px; left: -6px"
                                    @mousedown.stop="startResize('sw', $event)"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Controls -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-900">
                            Crop Settings
                        </h3>

                        <!-- Preset Ratios -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                                >Aspect Ratio</label
                            >
                            <div class="grid grid-cols-3 gap-2">
                                <button
                                    @click="setAspectRatio('free')"
                                    :class="[
                                        'px-3 py-2 rounded text-sm font-medium transition-colors',
                                        aspectRatio === 'free'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    Free
                                </button>
                                <button
                                    @click="setAspectRatio('1:1')"
                                    :class="[
                                        'px-3 py-2 rounded text-sm font-medium transition-colors',
                                        aspectRatio === '1:1'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    1:1
                                </button>
                                <button
                                    @click="setAspectRatio('4:3')"
                                    :class="[
                                        'px-3 py-2 rounded text-sm font-medium transition-colors',
                                        aspectRatio === '4:3'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    4:3
                                </button>
                                <button
                                    @click="setAspectRatio('16:9')"
                                    :class="[
                                        'px-3 py-2 rounded text-sm font-medium transition-colors',
                                        aspectRatio === '16:9'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    16:9
                                </button>
                                <button
                                    @click="setAspectRatio('3:2')"
                                    :class="[
                                        'px-3 py-2 rounded text-sm font-medium transition-colors',
                                        aspectRatio === '3:2'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    3:2
                                </button>
                                <button
                                    @click="setAspectRatio('2:3')"
                                    :class="[
                                        'px-3 py-2 rounded text-sm font-medium transition-colors',
                                        aspectRatio === '2:3'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                                    ]"
                                >
                                    2:3
                                </button>
                            </div>
                        </div>

                        <!-- Crop Area Info -->
                        <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Width:</span>
                                <span class="font-medium"
                                    >{{ Math.round(cropArea.width) }}px</span
                                >
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Height:</span>
                                <span class="font-medium"
                                    >{{ Math.round(cropArea.height) }}px</span
                                >
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Position:</span>
                                <span class="font-medium"
                                    >{{ Math.round(cropArea.x) }},
                                    {{ Math.round(cropArea.y) }}</span
                                >
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="space-y-2">
                            <button
                                @click="applyCrop"
                                :disabled="isProcessing"
                                class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span v-if="isProcessing">Processing...</span>
                                <span v-else>Crop & Download</span>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import AppLayout from "../../Components/Layout/AppLayout.vue";
import FileUploader from "../../Components/UI/FileUploader.vue";
import { useImageProcessor } from "../../../Composables/useImageProcessor";

defineProps({
    toolName: String,
    description: String,
});

const { cropImage, downloadFile } = useImageProcessor();

const selectedFile = ref(null);
const imageUrl = ref(null);
const imageRef = ref(null);
const imageLoaded = ref(false);
const isProcessing = ref(false);

const cropArea = ref({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
});

const aspectRatio = ref("free");
const isDragging = ref(false);
const isResizing = ref(false);
const resizeHandle = ref(null);
const dragStart = ref({ x: 0, y: 0 });

const cropBoxStyle = computed(() => ({
    left: `${cropArea.value.x}px`,
    top: `${cropArea.value.y}px`,
    width: `${cropArea.value.width}px`,
    height: `${cropArea.value.height}px`,
}));

const handleFilesSelected = (files) => {
    if (files.length > 0) {
        selectedFile.value = files[0];
        imageUrl.value = URL.createObjectURL(files[0]);
        imageLoaded.value = false;
    }
};

const onImageLoad = () => {
    if (imageRef.value) {
        const imgWidth = imageRef.value.clientWidth;
        const imgHeight = imageRef.value.clientHeight;

        // Set initial crop area to center
        const initialSize = Math.min(imgWidth, imgHeight) * 0.6;
        cropArea.value = {
            x: (imgWidth - initialSize) / 2,
            y: (imgHeight - initialSize) / 2,
            width: initialSize,
            height: initialSize,
        };
        imageLoaded.value = true;
    }
};

const setAspectRatio = (ratio) => {
    aspectRatio.value = ratio;

    if (ratio !== "free" && imageRef.value) {
        const ratios = {
            "1:1": 1,
            "4:3": 4 / 3,
            "16:9": 16 / 9,
            "3:2": 3 / 2,
            "2:3": 2 / 3,
        };

        const targetRatio = ratios[ratio];
        const currentRatio = cropArea.value.width / cropArea.value.height;

        if (currentRatio > targetRatio) {
            // Width is too large
            cropArea.value.width = cropArea.value.height * targetRatio;
        } else {
            // Height is too large
            cropArea.value.height = cropArea.value.width / targetRatio;
        }

        constrainCropArea();
    }
};

const startDrag = (e) => {
    isDragging.value = true;
    dragStart.value = {
        x: e.clientX - cropArea.value.x,
        y: e.clientY - cropArea.value.y,
    };
};

const startResize = (handle, e) => {
    isResizing.value = true;
    resizeHandle.value = handle;
    dragStart.value = {
        x: e.clientX,
        y: e.clientY,
        cropX: cropArea.value.x,
        cropY: cropArea.value.y,
        cropWidth: cropArea.value.width,
        cropHeight: cropArea.value.height,
    };
};

const onMouseMove = (e) => {
    if (isDragging.value && imageRef.value) {
        const newX = e.clientX - dragStart.value.x;
        const newY = e.clientY - dragStart.value.y;

        cropArea.value.x = Math.max(
            0,
            Math.min(newX, imageRef.value.clientWidth - cropArea.value.width)
        );
        cropArea.value.y = Math.max(
            0,
            Math.min(newY, imageRef.value.clientHeight - cropArea.value.height)
        );
    } else if (isResizing.value && imageRef.value) {
        const dx = e.clientX - dragStart.value.x;
        const dy = e.clientY - dragStart.value.y;

        const ratios = {
            free: null,
            "1:1": 1,
            "4:3": 4 / 3,
            "16:9": 16 / 9,
            "3:2": 3 / 2,
            "2:3": 2 / 3,
        };

        const targetRatio = ratios[aspectRatio.value];

        switch (resizeHandle.value) {
            case "se":
                cropArea.value.width = Math.max(
                    50,
                    dragStart.value.cropWidth + dx
                );
                if (targetRatio) {
                    cropArea.value.height = cropArea.value.width / targetRatio;
                } else {
                    cropArea.value.height = Math.max(
                        50,
                        dragStart.value.cropHeight + dy
                    );
                }
                break;
            case "sw":
                const newWidth = Math.max(50, dragStart.value.cropWidth - dx);
                cropArea.value.x =
                    dragStart.value.cropX +
                    (dragStart.value.cropWidth - newWidth);
                cropArea.value.width = newWidth;
                if (targetRatio) {
                    cropArea.value.height = cropArea.value.width / targetRatio;
                } else {
                    cropArea.value.height = Math.max(
                        50,
                        dragStart.value.cropHeight + dy
                    );
                }
                break;
            case "ne":
                cropArea.value.width = Math.max(
                    50,
                    dragStart.value.cropWidth + dx
                );
                const newHeight = Math.max(50, dragStart.value.cropHeight - dy);
                cropArea.value.y =
                    dragStart.value.cropY +
                    (dragStart.value.cropHeight - newHeight);
                if (targetRatio) {
                    cropArea.value.height = cropArea.value.width / targetRatio;
                } else {
                    cropArea.value.height = newHeight;
                }
                break;
            case "nw":
                const nwWidth = Math.max(50, dragStart.value.cropWidth - dx);
                cropArea.value.x =
                    dragStart.value.cropX +
                    (dragStart.value.cropWidth - nwWidth);
                cropArea.value.width = nwWidth;
                const nwHeight = Math.max(50, dragStart.value.cropHeight - dy);
                cropArea.value.y =
                    dragStart.value.cropY +
                    (dragStart.value.cropHeight - nwHeight);
                if (targetRatio) {
                    cropArea.value.height = cropArea.value.width / targetRatio;
                } else {
                    cropArea.value.height = nwHeight;
                }
                break;
        }

        constrainCropArea();
    }
};

const onMouseUp = () => {
    isDragging.value = false;
    isResizing.value = false;
    resizeHandle.value = null;
};

const constrainCropArea = () => {
    if (!imageRef.value) return;

    const imgWidth = imageRef.value.clientWidth;
    const imgHeight = imageRef.value.clientHeight;

    // Constrain width and height
    cropArea.value.width = Math.min(cropArea.value.width, imgWidth);
    cropArea.value.height = Math.min(cropArea.value.height, imgHeight);

    // Constrain position
    cropArea.value.x = Math.max(
        0,
        Math.min(cropArea.value.x, imgWidth - cropArea.value.width)
    );
    cropArea.value.y = Math.max(
        0,
        Math.min(cropArea.value.y, imgHeight - cropArea.value.height)
    );
};

const applyCrop = async () => {
    if (!selectedFile.value || !imageRef.value) return;

    isProcessing.value = true;

    try {
        // Calculate scale factor between displayed image and actual image
        const img = new Image();
        img.src = imageUrl.value;
        await new Promise((resolve) => {
            img.onload = resolve;
        });

        const scaleX = img.naturalWidth / imageRef.value.clientWidth;
        const scaleY = img.naturalHeight / imageRef.value.clientHeight;

        const actualCropArea = {
            x: cropArea.value.x * scaleX,
            y: cropArea.value.y * scaleY,
            width: cropArea.value.width * scaleX,
            height: cropArea.value.height * scaleY,
        };

        const croppedFile = await cropImage(selectedFile.value, actualCropArea);
        downloadFile(croppedFile);
    } catch (error) {
        console.error("Crop failed:", error);
        alert("Failed to crop image. Please try again.");
    } finally {
        isProcessing.value = false;
    }
};

const reset = () => {
    selectedFile.value = null;
    if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
    }
    imageUrl.value = null;
    imageLoaded.value = false;
    aspectRatio.value = "free";
};

onMounted(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
    }
});
</script>
