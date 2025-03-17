<script setup lang="ts">
    defineProps<{
        text: string;
        type: 'save' | 'cancel';
    }>();
</script>

<template>       
    <button @click="$emit('onClick')" :class="`${type}-button`">
        {{ text }}
    </button>
</template>

<style scoped>
    button {
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid var(--secondary-color);
        background-color: var(--primary-color);
        color: var(--text-color);
        transition: background-color 0.2s ease-in-out;
    }
    .cancel-button {
        border-color: var(--delete-color);
        color: var(--delete-color);
    }
    .save-button {
        border-color: var(--accept-color);
        color: var(--accept-color);
    }
    .save-button:hover {
        background-color: rgba(var(--accept-color-rgb), 0.1);
    }
    .cancel-button:hover {
        background-color: rgba(var(--delete-color-rgb), 0.1);
    }
</style>