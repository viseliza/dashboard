<script lang="ts" setup>
    import ThemeSwitcher from './ThemeSwitcher.vue';

    interface Props {
        title: string;
    }

    const props = defineProps<Props>();
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
        padding: 20px 20px 20px 30px;
        border-bottom: 2px solid var(--border-sidebar);
    }

    header .left h1 {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 1px;
    }

    header .right {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
</style>