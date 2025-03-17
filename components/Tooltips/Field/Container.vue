<script setup lang="ts">
    const props = defineProps<{
        active: boolean;
        styles?: Record<string, string>;
    }>();
</script>

<template>
    <div 
        class="tooltip" 
        :class="{ 'show': active }" 
        :style="styles"
    >
        <div class="tooltip-content">
            <slot></slot>
        </div>
    </div>

</template>

<style scoped>
    .tooltip {
        position: absolute;
        top: 100px;
        left: 0;
        width: 100%;
        gap: 5px;
        z-index:0;
        padding: 20px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border-radius: 5px;
        background-color: var(--active-color);
        transform: translateY(10px);
        opacity: 0;
        transition: transform linear .2s, opacity linear .2s;
    }
    .tooltip-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-sizing: border-box;
        white-space: normal; 
        word-break: break-all;
        font-size: 12px;
        box-shadow: 0 1px 1px 0 rgba(black, 0.26);
        border-radius: 4px;
        color: var(--inversion-color);
        transform: translateY(10px);
        opacity: 0;
        transition: transform .2s linear, opacity .2s linear;
    }
    .tooltip.show {
        z-index: 1;
        transform: translateY(0);
        opacity: 1;
    }
    .tooltip.show .tooltip-content {
        transform: translateY(0);
        opacity: 1;
    }
</style>