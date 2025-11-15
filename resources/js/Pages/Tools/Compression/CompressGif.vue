<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/gif"
        file-type-label="GIF images"
        action-button-text="Compress GIF"
        :processing-function="compressGif"
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

const compressGif = async (file) => {
    return await compressImage(file, 0.7);
};
</script>
