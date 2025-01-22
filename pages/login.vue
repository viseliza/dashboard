<script setup lang="ts">
    import Input from '~/components/Input.vue'; "@/components/Input.vue"

    definePageMeta({
        layout: 'login'
    })
</script>


<template>
    <section id="left" class="m-[7px] flex-[1_1_50%] rounded-[15px] flex flex-col gap-[10px] justify-center items-center bg-gradient-base bg-repeat">
        <div class="my-class opacity-70"></div>
        <span class="text-[20px]">Панелька</span>
    </section>

    <section id="right" class="flex flex-col gap-[20px] justify-center items-center m-[7px] flex-[1_1_50%]">
        <section id="header" class="flex flex-col justify-center items-center">
            <h1>Добро пожаловать</h1>
            <h2>в панель «<span class="text-[#f9bc4a]">Пенного»</span></h2>
        </section>

        <section class="flex flex-col w-full">
            <Input/>
        </section>

        <button>
            Войти
        </button>
    </section>
</template>


<style lang="scss" scoped>
    .my-class {
        width: 100px;
        height: 100px;
        background-image: url('~/assets/images/logos/pennoe.svg');
    }

    h1 {
        font-size: 24px;
    }

    span, h2 {
        font-size: 16px;
    }
</style>