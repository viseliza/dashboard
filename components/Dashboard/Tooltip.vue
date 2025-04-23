<script setup lang="ts">
    const showTooltip = shallowRef(false);
    type Props = { 
        text: string,
        style?: Record<string, string>
    }
    const props = defineProps<Props>();
</script>   

<template>
    <div 
        class="tooltip-container"
        :style="style"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
    >
        <div 
            class="tooltip-pretext" 
        >
            {{ text }}
        </div>
        
        <div class="tooltip" :class="{ 'show': showTooltip }">
            <div class="tooltip-text">
                {{ text }}
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
        z-index: 12;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border: 2px solid var(--secondary-color);
        border-radius: 5px;
        background-color: var(--inversion-color);
        transform: scale(0);
        transition: transform 0ms linear 200ms;
    }
    .tooltip-container .tooltip-text {
        box-sizing: border-box;
        padding: 10px;
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
        transform: scale(1);
        transition: transform 0ms linear;
    }
    .tooltip-container .tooltip.show .tooltip-text {
        transform: translateY(0);
        opacity: 1;
    }
</style>