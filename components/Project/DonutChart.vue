<script lang="ts" setup>
    // @ts-ignore
    import * as d3 from "d3";

    type Props = {
        stats: any;
    }
    const props = defineProps<Props>();
    const activeMode = shallowRef<string>('account');

    const translate: any = {
        'account': 'Аккаунты',
        'balances': 'Балансы',
        'streaks': 'Штрихи'
    }
    
    const mods = Object.keys(props.stats);
    const margin = 0;
    const width = 80;
    const height = 80;
    const iconsOfMode: any = {
        'account': 'mdi-account',
        'streaks': 'mdi-barcode',
        'balances': 'mdi-wallet'
    }
    let total = 0;
    let radius;
    let arc: any;
    let data_ready: any;
    let colors: any = {};
    const color = d3
            .scaleOrdinal()
            .domain(mods)
            .range(['#CCCC00', '#FFFF00', '#FFFF33', '#FFFF66']);

    Object.keys(props.stats).forEach((key) => {
        if (props.stats[key]) {
            props.stats[key] = Object.fromEntries(
                Object.entries(props.stats[key]).sort((a, b) => {
                    if (a > b) return 1;
                    if (a == b) return 0;
                    if (a < b) return -1; 
                    return 0;
                })
            );
        }
    });

    watch(() => activeMode.value, () => {
        total = 0;
        if (props.stats[activeMode.value]) {
            Object.keys(props.stats[activeMode.value]).forEach((key) => total += props.stats[activeMode.value][key]);
            data_ready = pie(Object.entries(props.stats[activeMode.value]) as any[]);
            
            data_ready.forEach((key: any) => {
                colors[key.data[0]] = color(key.data[1]);
            });        
        } else {
            data_ready = pie(Object.entries({'a': 1}) as any[]);
        }
    });

    radius = Math.min(width, height) / 2 - margin;
    arc = d3
        .arc()
        .innerRadius(radius * 0.87) // This is the size of the donut hole
        .outerRadius(radius * 1)    
        .cornerRadius(2)
        .padAngle(.05);
    
    // Compute the position of each group on the pie:
    const pie = d3
        .pie()
        .sort(null) // Do not sort group by size
        .value((d: any) => d[1]);

    if (props.stats[activeMode.value]) 
        data_ready = pie(Object.entries(props.stats[activeMode.value as any]) as any[]);

    data_ready = pie(Object.entries({'a': 1 }) as any[]);
</script>

<template>
    <div class="chart-container">
        <div class="chart-mods-container">
            <div class="chart-mods">
                <div
                    class="chart-mode"
                    v-for="mode in mods"
                    :key="mode"
                >
                    <button @click="activeMode = mode">   
                        <v-icon>{{ iconsOfMode[mode] }}</v-icon>
                        <div v-if="activeMode === mode" class="mode-active"></div>
                    </button>
                </div>
            </div>

            <span class="chart-mode-title">
                {{ translate[activeMode] || activeMode }}
            </span>
        </div>

        <div class="chart-content">
            <svg
                class="donut-container"
                :viewBox="(-width / 2) + ',' + (-height / 2) + ',' + (width) + ',' + (height)"
            >
                <g class="chart-inner">
                    <text dy='-4%' class="total-text" style="text-anchor: middle;">{{ total }}</text>
                    <text dy='15%' class="sub-total-text" style="text-anchor: middle;">Всего</text>
                    
                    <path 
                    v-for="slice in data_ready"
                    :d="arc(slice)" 
                    :fill="color(slice.data[1]) as string"  
                    />
                </g>
            </svg>

            <div v-if="stats[activeMode]" class="details">
                <ProjectLineChart 
                    v-for="[key, value] in Object.entries(stats[activeMode])"
                    :key="key"
                    :value="value as number"
                    :_key="key"
                    :color="colors[key]"
                    :total="total"
                />
            </div>
            <div v-else class="not-items">
                <span>
                    Данных пока нет!
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .chart-container {
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 10px;
        border-radius: 20px;
        background-color: var(--secondary-color);
    }
    .chart-container .chart-mods-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .chart-mods-container .chart-mode-title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: .9px;
        text-shadow: 1px 1px 0px var(--secondary-color);
    }
    .chart-container .chart-mods {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
    }
    .chart-container .chart-mods .chart-mode {
        padding: 10px;
        background-color: var(--inversion-color);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;   
        z-index: 10;
        position: relative;
    }
    .chart-container .chart-mods .chart-mode button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chart-container .chart-mods .chart-mode .mode-active {
        position: absolute;
        bottom: -10px;
        left: 0;
        height: 30px;
        width: 40px;
        z-index: -1;
        background-clip: repeat;
        background-color: var(--inversion-color);
    }
    .mode-active:before,
    .mode-active:after {
        content: "";
        position: absolute;
        height: 20px;
        width: 25px;
        bottom: 0;
        z-index: -1;
    }
    .mode-active:after {
        right: -25px;
        border-radius: 0 0 0 10px;
        -moz-border-radius: 0 0 0 10px;
        -webkit-border-radius: 0 0 0 10px;
        z-index: -1;
        -webkit-box-shadow: -10px 0 0 0 var(--inversion-color);
        box-shadow: -10px 0 0 0 var(--inversion-color);
    }
    .chart-mode:first-child .mode-active::before {
        left: 0;
        height: 30px;
        background-color: var(--inversion-color);
        bottom: -20px;
    }
    .chart-mode:not(:first-child) .mode-active:before {
        left: -25px;
        border-radius: 0 0 10px 0;
        -moz-border-radius: 0 0 10px 0;
        -webkit-border-radius: 0 0 10px 0;
        -webkit-box-shadow: 10px 0 0 0 var(--inversion-color);
        box-shadow: 10px 0 0 0 var(--inversion-color);
    }

    .chart-container .chart-content {
        display: flex;
        background-color: #fff;
        border-radius: 20px;
        z-index: 100;
        display: flex;
        padding: 10px;
    }
    .chart-container .not-items {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto 0;
        font-weight: 700;
        letter-spacing: 1px;
    }
    .chart-container .chart-content .donut-container {
        min-width: 130px;
        min-height: 130px;
        max-width: 130px;
        max-height: 130px;
        border-radius: 50%;
        margin: 5px;
    }
    .chart-container .chart-content .donut-container .total-text {
        font-size: 12px;
        fill: var(--primary-color);
    }
    .chart-container .chart-content .donut-container .sub-total-text {
        font-size: 8px;
        fill: var(--primary-color);
        opacity: .7;
    }
    
    .chart-container .chart-content .details {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }
</style>