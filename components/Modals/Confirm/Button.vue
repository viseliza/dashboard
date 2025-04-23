<script lang="ts" setup>
    type Props = {
        text: string;
        disabled?: boolean;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['click']);
</script>

<template>
    <button 
        class="button"
        :class="{ accept: text === 'Подтвердить', cancel: text === 'Отмена' }"
        :disabled="disabled"
        @click="emit('click', text === 'Подтвердить' ? true : false)"
    >
        {{ text }}
    </button>
</template>

<style scoped>
    .button {
        background: var(--inversion-color);
        cursor: pointer;
        padding: 7px 16px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 5px;
        transition: all 0.2s ease;
    }
    .button.accept {
        background: var(--text-primary);
        color: var(--inversion-color);
    }
    .button.cancel {
        outline: 1px solid var(--text-secondary);
    }
    .button:disabled {
        cursor: default;
        background: var(--text-secondary);
        color: var(--inversion-color);
    }
</style>