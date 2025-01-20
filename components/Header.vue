<script setup>
    const props = defineProps({
        title: String
    });

    function href(href) {
        let array = href.split('/');
        array.splice(href.split('/').length - 1);
        return array.length === 1 ? '/' : array.join('/');
    }
</script>

<template>
    <section class="header">
        <slot name="left">
            <nuxt-link 
                class="back"
                :to="`${href($route.path)}`"
            >
                <img width="20" height="20" src="~/assets/images/actions/chevron_up.svg">
                <span>Назад</span>
            </nuxt-link>
        </slot>

        <slot name="middle">
            <h1>{{ title }}</h1>
        </slot>

        <slot name="right">
            <button class="actions">
                <img src="~/assets/images/actions/dots.svg">
            </button>
        </slot>
    </section>
</template>


<style scoped>
    .header {
        position: relative;
        margin: 15px;
    }
    .back {
        position: absolute;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 12px;
        color: #007AFF;
        width: 80px;
    }
    .back img {
        rotate: -90deg;
    }

    h1 {
        margin: 0 auto;
        font-size: 14px;
        text-align: center;
    }

    .actions {
        position: absolute;
        right: 0;
        display: flex;
        justify-content: end;
        align-items: center;
    }
    .actions img {

        rotate: 90deg;
        border-radius: 50%;
        border: 2px solid #007AFF;
    }
</style>