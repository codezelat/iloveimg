<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/png"
        file-type-label="PNG images"
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
    // Convert PNG to BMP
    // Note: PNG transparency will be lost (BMP doesn't support alpha in all variants)
    return await convertImage(file, 'bmp', 1.0, options);
};
</script>
