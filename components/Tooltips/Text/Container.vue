<script setup lang="ts">
    type Props = {
        showTooltip: boolean,
        style?: Record<string, string>,
        stylesTooltip?: Record<string, string>,
        stylesTooltipText?: Record<string, string>,
        zIndex?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        zIndex: 12
    });
</script>   

<template>
    <div 
        class="tooltip-container"
        :style="style"
    >
        <div 
            class="tooltip-pretext" 
        >
            <slot name="pretext" />
        </div>
        
        <div 
            class="tooltip" 
            :style="stylesTooltip" 
            :class="{ 'show': showTooltip }"
        >
            <div 
                class="tooltip-text" 
                :style="stylesTooltipText"
            >
                <slot name="tooltip-text" />
            </div>
        </div>
    </div>
</template>


<style scoped>
    .tooltip-container {
        color: var(--text-secondary);
        border-bottom: 1px dashed var(--text-secondary);
    }
    .tooltip-container .tooltip-pretext {
        font-size: 12px;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
    .tooltip-container .tooltip {
        position: absolute;
        top: 45px;
        left: 0;
        width: 100%;
        z-index: v-bind(zIndex);
        padding: 10px;
        border-radius: 5px;
        background-color: var(--inversion-color);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        transform: translateY(10px);
        opacity: 0;
        transition: transform linear 300ms, opacity linear 300ms;
    }
    .tooltip-container .tooltip-text {
        box-sizing: border-box;
        white-space: normal; 
        word-break: break-all;
        font-size: 12px;
        box-shadow: 0 1px 1px 0 rgba(black, 0.26);
        border-radius: 4px;
        color: var(--text-primary);
        transform: translateY(10px);
        opacity: 0;
        transition: transform .3s ease-in-out, opacity .3s ease-in-out;
        background-color: var(--inversion-color);
    }
    .tooltip-container .tooltip.show {
        transform: translateY(0);
        z-index: 15 !important;
        opacity: 1;
    }
    .tooltip-container .tooltip.show .tooltip-text {
        transform: translateY(0);
        opacity: 1;
    }
</style>