<script setup lang="ts">
    const props = defineProps<{
        count: number;
    }>();
</script>

<template>
    <div class="table-container">
        <div class="table-header">
            <slot name="header"></slot>
        </div>

        <slot name="content"></slot>
    </div>
</template>

<style scoped>
    .table-container {
        flex: 1 1 auto;
        display: grid;
        align-items: inherit;
        align-content: flex-start;
        grid-template-columns: repeat(v-bind(count), auto);
        border: 1px solid var(--secondary-color);
        border-radius: 10px;
    }
    .table-header {
        display: contents;
    }
</style>