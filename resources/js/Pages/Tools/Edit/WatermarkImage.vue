<template>
    <BaseToolPage
        :tool-name="toolName"
        :description="description"
        action-button-text="Add Watermark"
        :processing-function="addWatermark"
    />
</template>

<script setup>
import BaseToolPage from '../../Components/UI/BaseToolPage.vue';

defineProps({
    toolName: String,
    description: String
});

const addWatermark = async (file) => {
    // Placeholder - watermark functionality
    return file;
};
</script>
