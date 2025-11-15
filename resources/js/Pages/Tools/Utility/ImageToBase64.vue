<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        action-button-text="Convert to Base64"
        :processing-function="toBase64"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';
import { useImageProcessor } from '../../../Composables/useImageProcessor';

defineProps({
    toolName: String,
    description: String
});

const { imageToBase64 } = useImageProcessor();

const toBase64 = async (file) => {
    const base64 = await imageToBase64(file);
    console.log('Base64:', base64);
    return file;
};
</script>
