<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/webp"
        file-type-label="WEBP images"
        action-button-text="Convert to TIFF"
        :processing-function="convertToTiff"
        output-format="tiff"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

defineProps({
    toolName: String,
    description: String
});

const { convertImage } = useImageProcessor();

const convertToTiff = async (file, options = {}) => {
    // Convert WEBP to TIFF
    return await convertImage(file, 'tiff', 1.0, options);
};
</script>
