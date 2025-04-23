<script setup lang="ts">
    type Props = {
        styles?: Record<string, string>;
        buttons?: boolean;
    }
    const props = withDefaults(defineProps<Props>(), {
        buttons: true
    });
    const toggle = shallowRef(false);
    const emit = defineEmits(['close']);
</script>

<template>
    <div
        :style="{ ...styles }" 
        class="footer-container"
    >
        <slot name="bottom-left">
            <ModalsControlToggle v-model="toggle" />
        </slot>

        <div 
            v-if="buttons"
            class="buttons-container"
        >
            <button 
                type="button"
                @click="emit('close')"
                class="cancel-button"
            >
                Отмена
            </button>

            <button 
                type="submit"
                class="save-button"
            >
                Сохранить
            </button>
        </div>
    </div>
</template>

<style scoped>
    .footer-container {
        display: flex;
        justify-content: space-between;
        padding: 15px 0px 0;
    }
    .footer-container .buttons-container {
        display: flex;
        gap: 10px;
    }
    .footer-container .buttons-container button {
        padding: 7px 16px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 5px;
    }
    .footer-container .buttons-container .cancel-button {
        outline: 1px solid var(--text-secondary);
    }
    .footer-container .buttons-container .save-button {
        background-color: var(--text-primary);
        color: var(--inversion-color);
    }
</style>