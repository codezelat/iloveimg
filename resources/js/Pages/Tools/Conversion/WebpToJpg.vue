<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/webp"
        file-type-label="WEBP images"
        action-button-text="Convert to JPG"
        :processing-function="convertToJpg"
        output-format="jpeg"
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

const convertToJpg = async (file, options = {}) => {
    return await convertImage(file, 'jpeg', 0.92, options);
};
</script>
