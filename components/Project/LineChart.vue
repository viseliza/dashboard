<script lang="ts" setup>
    type Props = {
        _key: string;
        value: number;
        total: number;
        color: any;
    }
    const props = defineProps<Props>();
    
    function replaceValue (value: number) {
        let numericClass = 0;
        let i = 0;
        const obj: {[index: number]: string} = {
            1: 'K',
            2: 'M',
            3: 'B'
        }
        
        value.toString().split('').forEach(digit => {
            i++
            
            if (i % 3 === 0) {
                numericClass++;
                value = value / 1000;
            }
        });

        return numericClass 
            ? value.toFixed(1) + obj[numericClass]
            : value;
    }

    /** Доля значения от общего значения
     * 
     * @param {number} num
     */
    function getPercent(num: any) {
        return Math.round(num * 100 / props.total);
    }
</script>


<template>
     <div class="detail">
        <div class="detail-top">
            <span>{{ _key }}</span>

            <span class="percent">{{ replaceValue(value) }} из {{ replaceValue(total) }}</span>
        </div>

        <div class="detail-bottom">
            <div
                class="detail-bottom-inner"
                :style="{ 
                    'width': getPercent(value)
                        ? getPercent(value) + '%'
                        : 1 + '%', 
                    'background': color
                }" 
            />
        </div>
    </div>
</template>

<style scoped>
    .detail {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .detail .detail-top {
        display: flex;
        justify-content: space-between;
    }
    .detail .detail-top span {
        font-size: 12px;
    }
    .detail .detail-top .percent {
        opacity: .7;
    }
    .detail .detail-bottom {
        position: relative;
        width: 100%;
        height: 8px;
        border-radius: 20px;
        background-color: var(--alpha-yellow);
    }
    .detail .detail-bottom .detail-bottom-inner {
        height: 8px;
        position: absolute;
        right: 0;
        background-color: yellow;
        border-radius: 20px;
    }
</style>