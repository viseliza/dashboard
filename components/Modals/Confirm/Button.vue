<script lang="ts" setup>
    defineProps<{ text: string }>();
    const accept = defineModel<boolean>('accept');
</script>

<template>
    <button 
        class="button"
        :class="{ accept: text === 'Подтвердить', cancel: text === 'Отмена' }"
        @click="accept = text === 'Подтвердить' ? true : false"
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
    }
    .button.accept {
        background: var(--text-primary);
        color: var(--inversion-color);
    }
    .button.cancel {
        outline: 1px solid var(--text-secondary);
    }
</style>