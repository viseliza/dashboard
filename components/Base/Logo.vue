<script lang="ts" setup>
    type Props = {
        showTitle: boolean;
    }
    defineProps<Props>();
</script>

<template>
    <section class="logo-container">
        <div class="img-container">
            <img src="~/assets/images/logos/pennoe-logo.svg" alt="Пена">
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
        padding: 30px;
    }
    .logo-container .img-container img {
        max-width: none;
        width: 38px;
        height: 38px;
    }
    h1 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: .3px;
        background: linear-gradient(90deg,#ad7111,#d18c26,#f7a73a); 
        background-clip: text;
        color: transparent;
    }
</style>