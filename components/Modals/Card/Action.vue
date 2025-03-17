<script setup lang="ts">
    type Props = {
        icon: string;
        title: string;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['click']);
</script>

<template>
    <button @click="emit('click', )">
        <v-icon :icon="icon"/>
        {{ title }}
    </button>
</template>

<style scoped>
    button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 8px;
        border: 2px solid var(--secondary-color);
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: var(--secondary-color);
    }
    button .v-icon {
        font-size: 14px;
    }
</style>
