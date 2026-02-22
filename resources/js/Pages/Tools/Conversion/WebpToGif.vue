<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/webp"
        file-type-label="WEBP images"
        action-button-text="Convert to GIF"
        :processing-function="convertToGif"
        output-format="gif"
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

const convertToGif = async (file, options = {}) => {
    // Convert WEBP to GIF (static)
    // Note: Both support transparency, but GIF is limited to 256 colors
    return await convertImage(file, 'gif', 1.0, options);
};
</script>
