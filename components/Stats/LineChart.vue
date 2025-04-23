<script lang="ts" setup>
import type { CSSProperties } from 'vue';

    type Props = {
        value: number;
        index: number;
        total: number;
        orientation?: 'vertical' | 'horizontal';
    }
    const props = withDefaults(defineProps<Props>(), {
        orientation: 'vertical'
    });
    const percent = computed(() => ((Number(props.value) / props.total) * 100).toFixed(1));

    const fill = computed(() => {
        const fill = Number(percent.value);
        if (fill < 5 && fill != 0)
            return '5%';
        return `${fill}%`;
    });

    const style = computed(() => ({
        'vertical': {
            value: props.index + 1,
            container: {
                flexDirection: 'column' as CSSProperties['flexDirection'],
                gap: '0'
            },
            text: {
                order: '0'
            },
            chart: {
                height: '80px',
                width: '12px'
            },
            line: { 
                height: fill.value,
                width: '100%',
                bottom: '0'
            } 
        },
        'horizontal': { 
            value: percent.value + '%',
            container: {
                gap: '10px',
                flexDirection: 'row' as CSSProperties['flexDirection']
            },
            text: {
                order: '-1'
            },
            chart: {
                width: '70px',
                height: '12px'
            },
            line: { 
                width: fill.value,
                height: '100%',
                left: '0'
            } 
        }
    }));
</script>

<template>
    <section 
        class="line-chart-container" 
        :style="style[props.orientation].container"
    >
        <div 
            class="chart" 
            :style="style[props.orientation].chart"
        >
            <div 
                class="line"
                :style="style[props.orientation].line"
            />
        </div>

        <h4 :style="style[props.orientation].text">
            {{ style[props.orientation].value }}
        </h4>
    </section>
</template>

<style scoped>
    .line-chart-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .line-chart-container .chart {
        position: relative;
        border-radius: 10px;
        background-color: var(--secondary-color);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .line-chart-container .chart .line {
        position: absolute;
        border-radius: 10px;
        background-color: var(--active-color);
    }
    .line-chart-container h4 {
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-weight: 700;
    }
</style>