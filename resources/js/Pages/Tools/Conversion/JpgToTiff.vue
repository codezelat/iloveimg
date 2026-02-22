<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/jpeg,image/jpg"
        file-type-label="JPG images"
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
    // Convert JPG to TIFF (Tagged Image File Format)
    // Note: TIFF supports lossless compression
    return await convertImage(file, 'tiff', 1.0, options);
};
</script>
