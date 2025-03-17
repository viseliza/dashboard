<script setup lang="ts">
    const loading = defineModel<boolean>('loading', {
        type: Boolean,
        required: true,
    });
</script>

<template>
    <div class="loading-backdrop" v-if="loading">
        <div class="loading-container">
            <div class="loading"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .loading-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading-container {
        display: flex;
        height: 150px;
        border-radius: 15px;
        background-color: var(--secondary-color);
        justify-content: center;
        align-items: center;
    }
    .loading {
        width: 8px;
        height: 40px;
        border-radius: 4px;
        display: block;
        margin: 20px auto;
        position: relative;
        background: currentColor;
        color: #FFF;
        box-sizing: border-box;
        animation: animloader .8s .8s linear infinite alternate;
    }

    .loading::after, .loading::before {
        content: '';
        width: 8px;
        height: 40px;
        border-radius: 4px;
        background: currentColor;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
        box-sizing: border-box;
        animation: animloader .8s  0.8s  linear infinite alternate;
    }
    .loading::before {
        left: -20px;
        animation-delay: 0s;
    }

    @keyframes animloader {
        0%   { height: 48px} 
        100% { height: 4px}
    }
</style>