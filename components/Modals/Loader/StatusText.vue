<script setup lang="ts">
    type Props = {
        headerText: string,
        detailsText: string
    }
    const props = defineProps<Props>();
</script>

<template>
    <div class="loader-text">
        <h2>{{ headerText }}</h2>
        <span>{{ detailsText }}</span>
    </div>
</template>

<style scoped lang="scss">
    .left-side .loader-text {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .left-side .loader-text h2 {
        font-size: 16px;
        font-weight: 700;
    }
    .left-side .loader-text span {
        display: flex;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }
</style>