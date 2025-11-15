<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/bmp"
        file-type-label="BMP images"
        action-button-text="Convert to PNG"
        :processing-function="convertToPng"
    />
</template>

<script setup>
import BaseToolPage from "../../Components/UI/BaseToolPage.vue";
import { useImageProcessor } from "../../../Composables/useImageProcessor";

defineProps({
    toolName: String,
    description: String,
});

const { convertImage } = useImageProcessor();

const convertToPng = async (file) => {
    return await convertImage(file, "png", 1.0);
};
</script>
