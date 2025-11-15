<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/bmp"
        file-type-label="BMP images"
        action-button-text="Convert to JPG"
        :processing-function="convertToJpg"
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

const convertToJpg = async (file) => {
    return await convertImage(file, "jpeg", 0.92);
};
</script>
