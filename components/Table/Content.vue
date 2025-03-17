<script setup lang="ts">
    import type { Statistic } from '~/models';

    const props = defineProps<{
        data: any[];
        stats: Statistic;
        tableMode: string;
    }>();

    // const modeStats = (key: any, mode: string) => {
    //     if (key !== 'mode' && key !== 'opened') return undefined;
    //     mode = key === 'opened' 
    //         ? mode ? 'opened' : 'not_opened' 
    //         : mode;
    //     const stats = props.stats[props.tableMode as keyof Statistic];
    //     if (!stats[mode as keyof typeof stats]) return undefined;
    //     const percent = (1 / stats[mode as keyof typeof stats] * 100).toFixed(2);
    //     return percent;
    // };

    const hoveredRow = shallowRef(null);
    const activeRow = shallowRef<boolean | null>(null);
    
    const className = (index: number, data: any[]) => {
        if (index === 0) return 'first';
        if (index === data.length - 1) return 'last';
        return '';
    }

    const borderBottom = (index: number, data: any[]) => {
        if (data.length < 8 && index === data.length - 1) return '1px solid var(--secondary-color)';
        return index === data.length - 1 ? 'none' : '1px solid var(--secondary-color)';
    };
</script>

<template>
    <TableContainer :count="Object.keys(data[0]).length">
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
                :stats="stats"
                :table-mode="tableMode"
                @mouseenter="hoveredRow = row"
                @mouseleave="hoveredRow = null"
                @active="(value: boolean) => activeRow = value"
            >
                <template #columns>
                    <TableDataColumn 
                        v-for="(column, columnIndex) in Object.keys(row)" 
                        :key="column" 
                        :hovered="hoveredRow === row"
                        :active="activeRow === row"
                        :class-name="className(columnIndex, Object.keys(row))"
                        :name="column"
                        :field="row[column]" 
                        :style="{
                            borderBottom: borderBottom(index, data),
                        }"
                    />
                </template>
            </TableDataRow>
        </template>
    </TableContainer>
</template>