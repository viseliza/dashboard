<script setup lang="ts">
    import { useServiceStore } from '~/store';

    type Props = {
        data: any[];
        call: any;
        api: any;
    }
    const props = defineProps<Props>();
    const serviceStore = useServiceStore();

    const hoveredRow = shallowRef(null);
    const activeRow = shallowRef<number | null>(null);
    
    const className = (index: number, data: any[]) => {
        if (index === 0) return 'first';
        if (index === data.length - 1) return 'last';
        return '';
    }

    const borderBottom = (index: number, data: any[]) => {
        if (data.length < 25)
            return index === data.length - 1 ? 'none' : '1px solid var(--secondary-color)';
            
        return index === data.length - 1 ? 'none' : '1px solid var(--secondary-color)';
    };

    const translateMode = computed(() => ({
        'accounts': 'Аккаунты',
        'streaks': 'Штрихи',
    }) as any);
</script>

<template>
    <TableContainer 
        :count="Object.keys(data[0]).length" 
        :title="translateMode[serviceStore.tableMode]"
    >
        <template #header>
            <TableHeaderColumn 
                v-for="key in Object.keys(data[0])" 
                :key="key"
                :column="key"
            />
        </template>

        <template #content>
            <TableDataRow 
                v-for="(row, index) in data" 
                :key="row"
                :item="row"
                :call="call"
                :api="api"
                @mouseenter="hoveredRow = row"
                @mouseleave="hoveredRow = null"
                @active="(value: boolean) => activeRow = value ? index : null"
            >
                <template #columns>
                    <TableDataColumn 
                        v-for="(column, columnIndex) in Object.keys(row)" 
                        :key="column" 
                        :hovered="hoveredRow === row"
                        :active="activeRow === index"
                        :class-name="className(columnIndex, Object.keys(row))"
                        :name="column"
                        :field="row[column]" 
                        :is-last-row="index === data.length - 1"
                        :style="{
                            borderBottom: borderBottom(index, data),
                        }"
                    />
                </template>
            </TableDataRow>
        </template>
    </TableContainer>
</template>