<script setup lang="ts">
    const props = defineProps<{
        model: any;
        index: number;
        active: boolean;
        error: boolean;
    }>();

    const emit = defineEmits(['select', 'remove']);
</script>

<template>
    <div class="item-wrapper" :class="{ 'active': active, 'error': error }">
        <button
            type="button"
            class="item-content" 
            @click="emit('select', index)"
        >
            <div>{{ model }}</div>
        </button>

        <button
            type="button"
            @click="emit('remove', index)"
        >
            <v-icon>mdi-close</v-icon>
        </button>
    </div>
</template>

<style scoped>
    .item-wrapper {
        display: flex;
        flex-direction: row;
        background-color: var(--secondary-sub-color);
        outline: 1px solid var(--secondary-color);
        border-radius: 15px;
        align-items: center;
        transition: background-color 0.3s linear, outline-color 0.3s linear;
    }
    .item-wrapper.active {
        background-color: rgba(var(--active-color-rgb), 0.1);
        outline-color: var(--active-color);
        color: var(--active-color);
    }
    .item-wrapper.active.error {
        background-color: rgba(var(--delete-color-rgb), 0.1);
        outline-color: var(--active-color);
        color: var(--delete-color);
    }
    .item-wrapper.error {
        background-color: rgba(var(--delete-color-rgb), 0.1);
        outline-color: var(--delete-color);
        color: var(--delete-color);
    }
    .item-wrapper .item-content {
        flex: 1 1 auto;
        padding: 4px 8px;
        padding-right: 0;
    }
    .item-wrapper div {
        font-size: 12px;
        opacity: 0.7;
    }
    .item-wrapper button {  
        display: flex;
        padding: 4px 8px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .item-wrapper button:hover .v-icon {
        color: var(--delete-color);
    }
    .item-wrapper button .v-icon {
        transition: color 0.3s linear;
        font-size: 14px;
    }
</style>