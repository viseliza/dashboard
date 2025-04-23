<script setup lang="ts">
    const props = defineProps<{
        field: any;
        name: string;
        style?: Record<string, any>;
        hovered: boolean;
        active: boolean;
        isLastRow: boolean;
        className?: string;
    }>();

    const fieldArray = computed(() => ([
        'mode',
        'enable',
        'opened',
    ]));
</script>

<template>
    <div 
        class="data-column"
        :style="style" 
        :class="{ 
            'ellipsis': name === 'id' || name === 'token',
            'first': className === 'first', 
            'last': className === 'last',
            'active': active,
            'hovered': hovered,
            'last-row': isLastRow,
        }"
    >
        <div 
            class="data-column-field mode" 
            :class="{ 'active': field !== false }"
            v-if="fieldArray.includes(name)"
        >
            {{ field }}
        </div>

        <div
            class="data-column-field text" 
            v-else
        >
            {{ field }}
        </div>
    </div>
</template>

<style scoped>
    .data-column {
        display: flex;
        flex-direction: row;
        z-index: 2;
        justify-content: center;
        align-items: center;
        padding: 15px 5px;
        transition: background 0.2s linear;
    }
    .data-column.first {
        padding-left: 15px;
    }
    .data-column.last {
        padding-right: 15px;
    }
    .data-column.first.last-row {
        border-radius: 0 0 0 10px;
    }
    .data-column.last.last-row {
        border-radius: 0 0 10px 0;
    }
    .data-column.active {
        background: var(--secondary-sub-color);
    }
    .data-column.hovered {
        cursor: pointer;
        background: var(--secondary-sub-color);
    }
    .data-column.ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .data-column-field {
        font-weight: 700;
        gap: 10px;
        display: flex;
    }
    .data-column-field .stats {
        font-size: 12px;
        position: relative;
        color: var(--accept-color-text);
    }
    .data-column-field.text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .data-column-field.mode {
        font-size: 12px;
        background: rgba(var(--delete-color-rgb), 0.15);
        border: 1px solid var(--delete-color);
        color: var(--delete-color);
        border-radius: 20px;
        padding: 1px 10px;
    }
    .data-column-field.mode.active {
        background: rgba(var(--accept-color-rgb), 0.15);
        color: var(--accept-color-text);
        border-color: var(--accept-color);
    }
</style>