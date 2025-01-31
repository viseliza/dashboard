<script lang="ts" setup>
    type Props = {
        showTitle: boolean;
    }
    const props = defineProps<Props>();
</script>

<template>
    <section class="logo-container">
        <div class="img-container">
            <img src="~/assets/images/logos/pennoe.svg" alt="Пена">
        </div>
        <h1 v-if="showTitle">Пенное</h1>
    </section>
</template>

<style scoped>
    .logo-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
    }
    .logo-container .img-container {
        padding: 12px;
        border-radius: 15px;
        background: linear-gradient(90deg,#ad711156,#d18d2652,#f7a83a46);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .logo-container .img-container img {
        max-width: none;
        width: 24px;
        height: 24px;
    }
    h1 {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1.2px;
        background: linear-gradient(90deg,#ad7111,#d18c26,#f7a73a); 
        background-clip: text;
        color: transparent;
    }
</style>