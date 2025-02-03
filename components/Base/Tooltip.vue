<script lang='ts' setup>
    type Props = {
        text: string;
    }
    
    defineProps<Props>();
</script>

<template>
    <div class="tooltip">
        {{ text }}
    </div>
</template>

<style scoped>
    .tooltip {
        padding: 10px;
        position: absolute;
        width: auto;
        white-space: nowrap;
        word-wrap: no-wrap;
        box-shadow: 1px 1px 20px #aaa;
        border-radius: 5px;
        background-color: #fff;
        top: 5px;
        left: 50%;
        transform: translate(-50%);
        transform-style: preserve-3d;
        z-index: 200;
        font-size: 0.9em;
        display: none;
    }
    .tooltip:after {
        content: "";
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        transform-origin: 50% 50%;
        transform: rotate(45deg) translateX(-50%);
        background-color: #fff;
        left: 0;
        top: 50%;
        z-index: 400;
    }
    .tooltip:before {
        content: "";
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        transform-origin: 50% 50%;
        transform: rotate(45deg) translateX(-50%) translateZ(-1px);
        background-color: #fff;
        left: 0;
        top: 50%;
        z-index: -1;
        box-shadow: -1px -1px 20px #aaa;
    }
</style>