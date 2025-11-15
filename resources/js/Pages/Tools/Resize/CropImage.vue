<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        action-button-text="Crop Images"
        :processing-function="crop"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

defineProps({
    toolName: String,
    description: String
});

const { resizeImage } = useImageProcessor();

const crop = async (file) => {
    return await resizeImage(file, 500, 500, false);
};
</script>
