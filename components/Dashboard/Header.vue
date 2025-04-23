<script lang="ts" setup>
    import ThemeSwitcher from '../Base/ThemeSwitcher.vue';
    import pennoeLogo from '~/assets/images/logos/pennoe-logo.svg';

    interface Props {
        title: string;
        description?: string;
        paths?: string[];
    }

    defineProps<Props>();
</script>

<template>
    <header>
        <div class="navigation">
            <div class="logo">
                <img :src="pennoeLogo" alt="Pennoe logo">
            </div>

            <template v-for="path in paths" :key="path">
                <v-icon>mdi-chevron-right</v-icon>
                <span class="path">{{ path }}</span>
            </template>
        </div>

        <section class="content">
            <div class="title">
                <h1>{{ title }}</h1>
                <h2 v-if="description">{{ description }}</h2>
            </div>

            <div class="right">
                <!-- <ThemeSwitcher/> -->
            </div>
        </section>
    </header>
</template>

<style scoped>
    header {
        flex: 0 1 auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        padding-bottom: 0;
    }
    header .navigation {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
    header .navigation .logo {
        width: 20px;
        height: 20px;
    }
    header .navigation .v-icon {
        font-size: 20px;
        color: var(--text-secondary);
    }
    header .navigation .path {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .5px;
    }

    header .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    header .content .title h1 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: .3px;
    }
    header .content .title h2 {
        font-size: 14px;
        letter-spacing: .3px;
        opacity: .8;
    }

    header .right {
        display: flex;
        align-self: flex-start;
        flex-direction: row;
        gap: 10px;
    }
</style>