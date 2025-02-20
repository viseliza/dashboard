<script lang="ts" setup>
    import ThemeSwitcher from '../Base/ThemeSwitcher.vue';

    interface Props {
        title: string;
    }

    defineProps<Props>();
</script>

<template>
    <header>
        <section class="left">
            <h1>{{ title }}</h1>
        </section>

        <div class="right">
            <ThemeSwitcher/>
        </div>
    </header>
</template>

<style scoped>
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 2px solid var(--secondary-color);   
    }

    header .left h1 {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: .5px;
    }

    header .right {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
</style>