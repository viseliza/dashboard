<script setup lang="ts">
    type Props = {
        status: string;
        process: boolean;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close']);
</script>

<template>
    <div 
        v-if="!process"
        class="loader-button"
    >
        <button 
            @click="emit('close')"
            :style="{
                backgroundColor: status === 'fail' 
                    ? 'rgba(var(--delete-color-rgb), 0.7)' 
                    : 'rgba(var(--accept-color-rgb), 0.7)',
            }"
        >
            Закрыть
        </button>
    </div>
</template>

<style scoped>
    .loader-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .loader-button button {
        flex: 1;
        padding: 10px 20px;
        border-radius: 10px;
        color: var(--inversion-color);
        font-weight: 700;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
</style>