<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/gif"
        file-type-label="GIF images"
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
    description: String
});

const { convertImage } = useImageProcessor();

const convertToWebp = async (file, options = {}) => {
    // Convert first frame of GIF to WEBP
    return await convertImage(file, 'webp', 0.9, options);
};
</script>
