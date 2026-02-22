<template>
    <div class="rounded-2xl border border-white/10 bg-slate-800 p-4">
        <div class="flex items-start gap-3">
            <!-- Toggle Switch -->
            <button
                @click="toggleValue"
                class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                :class="modelValue ? 'bg-primary-500' : 'bg-white/20'"
                role="switch"
                :aria-checked="modelValue"
            >
                <span
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
                />
            </button>

            <!-- Label and Tooltip -->
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                    <label 
                        @click="toggleValue"
                        class="text-sm font-medium text-white cursor-pointer select-none"
                    >
                        {{ modelValue ? 'Preserve metadata' : 'Strip metadata' }}
                    </label>
                    
                    <!-- Help Tooltip Trigger -->
                    <div class="relative" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
                        <button 
                            class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/20 transition-colors"
                            @focus="showTooltip = true"
                            @blur="showTooltip = false"
                        >
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </button>
                        
                        <!-- Tooltip Content -->
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="opacity-0 translate-y-1"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-150 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-1"
                        >
                            <div 
                                v-if="showTooltip"
                                class="absolute bottom-full left-0 mb-2 w-64 z-50"
                            >
                                <div class="rounded-xl border border-white/10 bg-slate-900 p-3 shadow-xl">
                                    <p class="text-xs text-white/80 leading-relaxed">
                                        <strong class="text-white">EXIF metadata</strong> includes information like camera model, date taken, GPS location, and photo settings.
                                    </p>
                                    <ul class="mt-2 text-xs text-white/60 space-y-1">
                                        <li>• <span class="text-green-400">Preserve:</span> Keep all metadata in output</li>
                                        <li>• <span class="text-orange-400">Strip:</span> Remove for privacy/smaller file</li>
                                    </ul>
                                    <p class="mt-2 text-[10px] text-white/40 italic">
                                        Note: PNG output doesn't support EXIF metadata
                                    </p>
                                </div>
                                <!-- Arrow -->
                                <div class="absolute bottom-0 left-4 -mb-1 w-2 h-2 bg-slate-900 border-r border-b border-white/10 transform rotate-45"></div>
                            </div>
                        </transition>
                    </div>
                </div>
                
                <p class="text-xs text-white/50 mt-1">
                    {{ descriptionText }}
                </p>
            </div>
        </div>

        <!-- Warning for PNG output -->
        <div v-if="outputFormat === 'png'" class="mt-3 flex items-start gap-2 rounded-xl bg-orange-500/10 border border-orange-500/20 p-2">
            <svg class="w-4 h-4 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p class="text-xs text-orange-200/80">
                PNG format doesn't support EXIF metadata. Data will be lost regardless of this setting.
            </p>
        </div>

        <!-- Info for formats that don't support EXIF -->
        <div v-else-if="!supportsExifInput" class="mt-3 flex items-start gap-2 rounded-xl bg-white/5 border border-white/10 p-2">
            <svg class="w-4 h-4 text-white/40 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-xs text-white/50">
                This file format doesn't contain EXIF metadata.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true,
    },
    outputFormat: {
        type: String,
        default: '',
    },
    inputFormat: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const showTooltip = ref(false);

const supportsExifInput = computed(() => {
    if (!props.inputFormat) return true;
    const exifFormats = ['jpeg', 'jpg', 'tiff', 'tif'];
    return exifFormats.includes(props.inputFormat.toLowerCase());
});

const descriptionText = computed(() => {
    if (props.modelValue) {
        return 'Keep camera info, date, GPS, and photo settings in the output file';
    }
    return 'Remove all metadata for smaller file size and enhanced privacy';
});

const toggleValue = () => {
    emit('update:modelValue', !props.modelValue);
};
</script>
