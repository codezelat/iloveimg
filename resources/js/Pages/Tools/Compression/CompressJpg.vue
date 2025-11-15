<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/jpeg,image/jpg"
        file-type-label="JPG/JPEG images"
        action-button-text="Compress JPG"
        :processing-function="compressJpg"
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

const compressJpg = async (file) => {
    return await compressImage(file, 0.7);
};
</script>
