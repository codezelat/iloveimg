<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/tiff"
        file-type-label="TIFF images"
        action-button-text="Convert to PNG"
        :processing-function="convertToPng"
        output-format="png"
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

const convertToPng = async (file, options = {}) => {
    return await convertImage(file, "png", 1.0, options);
};
</script>
