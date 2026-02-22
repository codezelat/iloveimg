<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/webp"
        file-type-label="WEBP images"
        action-button-text="Convert to BMP"
        :processing-function="convertToBmp"
        output-format="bmp"
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

const convertToBmp = async (file, options = {}) => {
    // Convert WEBP to BMP
    return await convertImage(file, 'bmp', 1.0, options);
};
</script>
