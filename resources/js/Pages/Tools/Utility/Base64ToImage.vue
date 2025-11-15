<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        action-button-text="Convert to Image"
        :processing-function="toImage"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

defineProps({
    toolName: String,
    description: String
});

const { base64ToImage } = useImageProcessor();

const toImage = async (file) => {
    // This would need text input for base64
    return file;
};
</script>
