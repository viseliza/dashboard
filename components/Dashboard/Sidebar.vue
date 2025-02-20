<script setup lang="ts">
    import projects from '~/assets/images/navbar/projects.svg';
    import proxies from '~/assets/images/navbar/proxies.svg';
    import utils from '~/assets/images/navbar/utils.svg';
    import logs from '~/assets/images/navbar/logs.svg';
    import Logo from '../Base/Logo.vue';

    
    const content = [
        { rus: 'Проекты', eng: 'projects', path: projects, add: false },
        { rus: 'Прокси', eng: 'proxies', path: proxies, add: true },
        { rus: 'Логи', eng: 'logs', path: logs, add: false },
        { rus: 'Утилиты', eng: 'utils', path: utils, add: false },
    ];
    

    const route = useRoute();
    const searchValue = ref<string>('');
</script>


<template>
    <aside class="sidebar-container">
        <div class="top-side-container">
            <Logo :show-title="true" />

            <ul>
                <NuxtLink
                    class="nav-item"
                    v-for="item in content"
                    :key="item.rus"
                    :to="'/dashboard/' + item.eng"
                    :class="{ 'active': route.path.split('/')[2].indexOf(item.eng) !== -1 }"
                >   
                    <div class="left">
                        <div class="img-container">
                            <img :src="item.path" alt="">
                        </div>
                        <span>{{ item.rus }}</span>
                    </div>

                    <button v-if="item.add" class="right">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </button>
                </NuxtLink>
            </ul>
        </div>
        
        <footer class="footer">
            <div class="nav-item">
                <div class="left">
                    <div class="img-container">
                        <img src="~/assets/images/navbar/settings.svg" alt="">
                    </div>
                    <span>Настройки</span>
                </div>
            </div>

            <div class="nav-item">
                <div class="left">
                    <div class="img-container">
                        <v-icon>mdi-minus-circle-outline</v-icon>
                    </div>
                    <span>Выйти</span>
                </div>
            </div>
        </footer>
    </aside>
</template>


<style lang="scss" scoped>
    .sidebar-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        height: 100vh;
        width: 240px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 2px solid var(--secondary-color);
    }
    .sidebar-container .top-side-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .sidebar-container ul {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .sidebar-container .nav-item {
        display: flex;
        justify-content: space-between;
        align-items: center;    
        border-radius: 10px;
    }

    /*****************/
    /**** L E F T ****/
    /*****************/
    .sidebar-container .nav-item .left {
        display: flex;
        align-items: center;
        gap: 15px;
        flex: 1 1 auto;
    }
    .sidebar-container .nav-item .left:hover,
    .sidebar-container .nav-item .right:hover {
        cursor: pointer;
    }
    .sidebar-container .nav-item .left:hover > span,
    .sidebar-container .nav-item.active .left span {
        color: var(--text-primary);
    }
    .sidebar-container .nav-item .left .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sidebar-container .nav-item .left:hover > .img-container img,
    .sidebar-container .nav-item .left:hover > .img-container .v-icon,
    .sidebar-container .nav-item.active > .left .img-container img {
        filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%);
    }
    .sidebar-container .nav-item .left span {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-secondary);
        transition: 0.5s;
    }
    .sidebar-container .nav-item .left img,
    .sidebar-container .nav-item .left .v-icon {
        font-size: 20px;
        max-width: none;
        transition: 0.5s;
        width: 20px;
        height: 20px;
        filter: invert(66%) sepia(0%) saturate(11%) hue-rotate(156deg) brightness(95%) contrast(93%);
    }
    /*******************/
    /**** R I G H T ****/
    /*******************/
    .sidebar-container .nav-item .right {
        background-color: var(--secondary-color);
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
    .sidebar-container .nav-item .right .v-icon {
        font-size: 16px;
    }

    .footer {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 30px;
    }
</style>