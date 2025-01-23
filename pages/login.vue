<script setup lang="ts">
    import Input from '~/components/Input.vue';

    definePageMeta({
        layout: 'login'
    })

    useHead({
        title: 'Панель - Вход'
    });

    const loginValue = ref<string>('');
    const passwordValue = ref<string>('');
</script>


<template>
    <section class="m-[10px] sm:m-[7px] sm:flex-[1_1_50%] aspect-[1.5/1] sm:aspect-auto bg-gradient-base bg-repeat rounded-[15px] flex flex-col gap-[10px] justify-center items-center">
        <div class="my-class opacity-70"></div>
    </section>

    <section class="flex flex-col gap-[30px] justify-center items-center ml-[10px] mr-[17px] sm:flex-[1_1_50%]">
        <section id="header" class="flex flex-col justify-center items-center">
            <h1 class="text-[24px]">Добро пожаловать</h1>
            <h2 class="text-[16px]">в панель 
                «<span class="text-[16px] text-[#f9bc4a]">Пенного</span>»
            </h2>
        </section>

        <section class="flex flex-col w-full">
            <Input
                v-model="loginValue"
                label="Логин"
            />
            
            <Input
                v-model="passwordValue"
                label="Пароль"
            />
        </section>
        <button 
            class="w-full transition-all duration-500  rounded-[12px] py-[15px] text-[#fff] font-bold text-[14px] bg-gradient-to-tl from-[#ff7300] via-[#2e3357] to-[#000000] bg-size-200 bg-pos-0 hover:bg-pos-50 active:bg-100"
        >
            Войти
        </button>
    </section>
</template>


<style lang="scss" scoped>
    .my-class {
        width: 100px;
        height: 100px;
        background: url('~/assets/images/logos/pennoe.svg');
    }
</style>