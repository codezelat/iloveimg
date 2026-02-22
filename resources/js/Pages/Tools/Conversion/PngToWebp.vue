<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/png"
        file-type-label="PNG images"
        action-button-text="Convert to WEBP"
        :processing-function="convertToWebp"
        output-format="webp"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

defineProps({
    toolName: String,
    description: String,
});

const { convertImage } = useImageProcessor();

const convertToWebp = async (file, options = {}) => {
    return await convertImage(file, 'webp', 0.9, options);
};
</script>
