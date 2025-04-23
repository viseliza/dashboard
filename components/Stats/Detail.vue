<script lang="ts" setup>
    type Props = {
        title: string;
        value: number;
        index: number;
        total: number;
    }
    const props = defineProps<Props>();
    const displayTitle = computed(() => 
        (props.index + 1) + 
        '. ' + 
        props.title
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    );

    function convertValue (value: number) {
        let numericClass = 0;
        let i = 0;
        const obj: {[index: number]: string} = {
            1: 'K',
            2: 'M',
            3: 'B',
            4: 'T',
            5: 'Q'
        }
        
        value.toString().split('.')[0].split('').forEach(digit => {
            i++;

            if (i % 3 === 0) {
                numericClass++;
                value = value / 1000;
            }
        });

        return numericClass 
            ? value.toFixed(1) + obj[numericClass]
            : value;
    }
</script>

<template>
    <div class="stats-detail">
        <div class="left">
            <span>{{ displayTitle }}</span>
            <span>{{ convertValue(Number(value.toFixed(2))) }} / {{ convertValue(total) }}</span>
        </div>

        <div class="right">
            <StatsLineChart 
                :value="Number(value.toFixed(2))"
                :total="total"
                :index="index"
                orientation="horizontal"
            />
        </div>
    </div>
</template>

<style scoped>
    .stats-detail {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .stats-detail .left {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex: 1;
    }
    .stats-detail span {
        font-size: 12px;
        font-weight: 700;
    }
    .stats-detail .right {
        width: 130px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
</style>