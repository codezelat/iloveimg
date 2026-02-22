<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/png"
        file-type-label="PNG images"
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
    // Convert PNG to GIF (static)
    // Note: GIF supports transparency but only 1-bit (fully transparent or opaque)
    // PNG's alpha channel will be lost or flattened
    return await convertImage(file, 'gif', 1.0, options);
};
</script>
