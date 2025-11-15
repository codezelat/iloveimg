<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        accepted-formats="image/heic,image/heif"
        file-type-label="HEIC images"
        action-button-text="Convert to PNG"
        :processing-function="convertToPng"
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

const convertToPng = async (file) => {
    return await convertImage(file, 'png', 1);
};
</script>
