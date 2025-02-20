<script setup lang="ts">
import Input from '~/components/Input.vue';
import { AuthLogin } from '~/models';
import { TemplateAPI, PennoeAPI } from '~/api';
import type { ErrorMessage } from '~/types/api/base';

definePageMeta({
    layout: 'login',
})

useHead({
    title: 'Панель - Вход'
});

const loginValue = ref<string>('');
const passwordValue = ref<string>('');
const error = ref<ErrorMessage>();

const submit = (async () => {
    const api = new PennoeAPI(TemplateAPI.x_token);
    const authLogin = new AuthLogin({
        username: loginValue.value,
        password: passwordValue.value,
    });

    try {
        const tokens = await api.authorize(authLogin);
        tokens.updateTokens();
        return navigateTo('/dashboard/projects');
    } catch (e: any) {
        error.value = e as ErrorMessage;
    }
})
</script>


<template>
    <Teleport to='body'>
        <Notification 
            v-if="error" 
            :detail="error.detail"
            :message="error.message"
            :code="error.code" 
            @close-notification="error = undefined"
        />
    </Teleport>

    <div class="left-side bg-gradient-base bg-repeat">
        <div class="header">
            <span>Пена пенится</span>
        </div>

        <div class="middle">
            <img src="~/assets/images/logos/beer.svg" alt="">
        </div>

        <div class="footer">
            <div class="left">
                <span class="top">Dashboard</span>
                <span class="bottom">Пенное</span>
            </div>
            <div class="right">
                <img src="~/assets/images/logos/pennoe.svg" alt="">
            </div>
        </div>
    </div>

    <div class="right-side">
        <section id="header" class="header flex flex-col justify-center items-center">
            <div class="tab"></div>
            <h1 class="text-[24px]">Добро пожаловать</h1>
        </section>

        <form class="flex flex-col w-full">
            <fieldset class="flex flex-col w-full gap-[20px]">
                <Input v-model="loginValue" label="Логин" input-type="text" />

                <Input v-model="passwordValue" label="Пароль" input-type="password" />
            </fieldset>

            <button @click.prevent="submit"
                class="w-full transition-all duration-500 mt-[50px] rounded-[12px] py-[15px] text-[#fff] font-bold text-[14px] bg-gradient-to-tl from-[#ff7300] via-[#2e3357] to-[#000000] bg-size-200 bg-pos-0 hover:bg-pos-50 active:bg-100">
                Войти
            </button>
        </form>
    </div>
</template>


<style lang="scss" scoped>
.left-side {
    position: relative;
    padding: 20px;
    margin: 7px;
    display: flex;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-image: linear-gradient(135deg, #ffda75, #ffcb3d, #ffbb00);
    box-shadow:
        rgba(0, 0, 0, 0.05) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.05) 0px 18px 36px -18px inset;
}

.left-side .header span {
    letter-spacing: 1.2px;
    font-size: 12px;
    text-transform: uppercase;
    position: relative;
}

.left-side .header span::before {
    position: absolute;
    content: '';
    right: -90px;
    top: 50%;
    width: 80px;
    height: 1px;
    background-color: #000;
}
.left-side .middle {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-side .middle img {
    width: 250px;
    height: 250px;
}

.left-side .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    padding: 8px 20px;
    align-self: flex-start;
    background: -webkit-linear-gradient(90deg, #525252, #433f4e);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(90deg, #525252, #433f4e);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.left-side .footer .left {
    display: flex;
    flex-direction: column;
    letter-spacing: 1.4px;
    font-size: 18px;
}

.left-side .footer .left .top {
    font-size: 14px;
    color: #fff;
}

.left-side .footer .left .bottom {
    font-size: 18px;
    background: -webkit-linear-gradient(90deg, #db9d00, #ffbf00, #ffd53d);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(90deg, #db9d00, #ffbf00, #ffd53d);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
}

.left-side .footer .left .bottom::after {
    content: '';
    position: absolute;
    height: 2px;
    background-color: #ffa903;
    left: 0px;
}

.left-side .footer .right {
    align-self: center;
    border: 2px solid #ffa903;
    padding: 6px;
    display: flex;
    border-radius: 10px;
}

.left-side .footer .right img {
    background-size: contain;
    /* контролируем размер самого SVG */
    width: 32px;
    /* изменяем размер контейнера */
    height: 32px;
    /* изменяем размер контейнера */
}



.right-side {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    margin-right: 7px;
    padding: 0 20px;
}



@media screen and (max-width: 640px) {
    .left-side {
        gap: 100px;
        margin-bottom: 0;
    }

    .left-side .footer .left .bottom::after {
        width: calc(100vw - 143px);
    }

    .right-side {
        flex: 1 1 auto;
    }

    .tab {
        width: 220px;
        height: 80px;
        position: relative;
        background-color: #f6c333;
        background-repeat: repeat;
        -webkit-border-top-left-radius: 32px;
        -webkit-border-top-right-radius: 32px;
        -moz-border-radius-topleft: 32px;
        -moz-border-radius-topright: 32px;
        border-top-left-radius: 32px;
        border-top-right-radius: 32px;
        transform: rotate(180deg);
    }

    .tab:before,
    .tab:after {
        content: "";
        position: absolute;
        height: 20px;
        width: 25px;
        bottom: 0;
        z-index: -1;
    }

    .tab:after {
        right: -25px;
        border-radius: 0 0 0 10px;
        -moz-border-radius: 0 0 0 10px;
        -webkit-border-radius: 0 0 0 10px;
        z-index: -1;
        -webkit-box-shadow: -10px 0 0 0 #f6c333;
        box-shadow: -10px 0 0 0 #f6c333;
    }

    .tab:before {
        left: -25px;
        border-radius: 0 0 10px 0;
        -moz-border-radius: 0 0 10px 0;
        -webkit-border-radius: 0 0 10px 0;
        -webkit-box-shadow: 10px 0 0 0 #f6c333;
        box-shadow: 10px 0 0 0 #f6c333;
    }

    .right-side .header h1 {
        position: absolute;
        font-size: 18px;
    }
}

@media (min-width: 641px) {
    .left-side {
        flex: 1 1 50%;
    }

    .left-side .footer .left .bottom::after {
        width: 212px;
    }

    .right-side {
        flex: 1 1 50%;
        justify-content: center;
    }
}
</style>