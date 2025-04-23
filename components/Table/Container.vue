<script setup lang="ts">
    import { useDumpStore } from '~/store';
    type Props = {
        count: number; 
        title: string;
    }
    const props = defineProps<Props>();
    const dumpStore = useDumpStore();
    const countQueries = computed(() => dumpStore.count);
</script>

<template>
    <div class="table-wrapper">
        <div class="header">
            <span class="title">
                {{ title }} ({{ countQueries }})
            </span>
            
            <div class="header-buttons"> 
                <FiltersSearchBox/>

                <TableRefresh/>
            </div>
        </div>

        <div class="table-container">
    
            <div class="table-header">
                <slot name="header"></slot>
            </div>
    
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>
    .table-wrapper {
        display: flex;
        flex-direction: column;
    }
    .table-wrapper .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        border: 2px solid var(--secondary-color);
        border-bottom: none;
        border-radius: 10px 10px 0 0;
    }
    .table-wrapper .header .title {
        font-size: 16px;
        font-weight: 700;
    }
    .table-wrapper .header-buttons {
        display: flex;
        flex-direction: row;
        gap: 15px;
    }
    .table-container {
        flex: 1 1 auto;
        display: grid;
        align-items: inherit;
        align-content: flex-start;
        grid-template-columns: repeat(v-bind(count), auto);
        border: 2px solid var(--secondary-color);
        border-radius: 0 0 10px 10px;
    }
    .table-header {
        display: contents;
    }
</style>