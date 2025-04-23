<script setup lang="ts">
    type Props = {
        mdiIcon?: string;
        styles?: Record<string, string>;
        backgroundColor?: string;
        textColor?: string;
        hoverTextColor?: string;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['click']);
</script>

<template>
    <button 
        @click="emit('click')"
        :style="styles"
        type="button"
    >
        <v-icon v-if="mdiIcon" :icon="mdiIcon"/>
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<style lang="scss" scoped>
    button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 15px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 8px;
        color: v-bind(textColor);
        border: 1px solid v-bind('`rgba(${backgroundColor}, .7)`');
        background-color: v-bind('`rgba(${backgroundColor}, .05)`');
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    button span {
        font-size: 12px;
        transition: color 0.3s ease;
    }
    button .v-icon {
        font-size: 16px;
    }
    button:hover {
        background-color: v-bind('`rgba(${backgroundColor}, .7)`');
        color: v-bind(hoverTextColor);
    }
</style>