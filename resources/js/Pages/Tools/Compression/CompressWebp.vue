<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/webp"
        file-type-label="WebP images"
        action-button-text="Compress WebP"
        :processing-function="compressWebp"
    />
</template>

<script setup>
import BaseToolPage from "../../Components/UI/BaseToolPage.vue";
import { useImageProcessor } from "../../../Composables/useImageProcessor";

defineProps({
    toolName: String,
    description: String,
});

const { compressImage } = useImageProcessor();

const compressWebp = async (file) => {
    return await compressImage(file, 0.7);
};
</script>
