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
        gap: 10px;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
    }
    /* .logo-container .img-container {
        padding: 8px;
        border-radius: 8px;
        background: linear-gradient(90deg,#ad711156,#d18d2652,#f7a83a46);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    } */
    .logo-container .img-container img {
        max-width: none;
        width: 24px;
        height: 24px;
    }
    h1 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: .5px;
        background: linear-gradient(90deg,#ad7111,#d18c26,#f7a73a); 
        background-clip: text;
        color: transparent;
    }
</style>