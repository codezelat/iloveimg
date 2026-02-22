<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/jpeg,image/jpg"
        file-type-label="JPG images"
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
    // Convert JPG to GIF (static)
    // Note: GIF has limited color palette (256 colors) vs JPG's 16.7 million
    return await convertImage(file, 'gif', 1.0, options);
};
</script>
