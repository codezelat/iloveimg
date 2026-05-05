<template>
    <button
        type="button"
        :disabled="installing"
        class="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition disabled:cursor-wait disabled:opacity-60"
        :title="buttonTitle"
        :aria-label="buttonTitle"
        @click="install"
    >
        <svg
            v-if="installing"
            class="w-4 h-4 animate-spin"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
        <svg
            v-else
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
        </svg>
    </button>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
    getDeferredInstallPrompt,
    isStandalone,
    triggerInstallPrompt,
} from '../pwa.js';

const installing = ref(false);
const installable = ref(false);
const standalone = ref(false);

const syncInstallState = () => {
    installable.value = Boolean(getDeferredInstallPrompt());
    standalone.value = isStandalone();
};

const buttonTitle = computed(() => {
    if (standalone.value) {
        return 'Already installed';
    }

    if (installable.value) {
        return 'Install app';
    }

    return 'Install app';
});

const install = async () => {
    if (installing.value) {
        return;
    }

    installing.value = true;

    try {
        await triggerInstallPrompt();
    } finally {
        installing.value = false;
        syncInstallState();
    }
};

onMounted(() => {
    syncInstallState();
    window.addEventListener('pwa:installable', syncInstallState);
    window.addEventListener('pwa:installed', syncInstallState);
    window.addEventListener('appinstalled', syncInstallState);
});

onUnmounted(() => {
    window.removeEventListener('pwa:installable', syncInstallState);
    window.removeEventListener('pwa:installed', syncInstallState);
    window.removeEventListener('appinstalled', syncInstallState);
});
</script>
