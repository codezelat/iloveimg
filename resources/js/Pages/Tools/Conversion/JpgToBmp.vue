<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/jpeg,image/jpg"
        file-type-label="JPG images"
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
    // Convert JPG to BMP (uncompressed bitmap)
    return await convertImage(file, 'bmp', 1.0, options);
};
</script>
