<!-- <script setup lang="ts">
    import projects from '~/assets/images/navbar/projects.svg';
    import proxies from '~/assets/images/navbar/proxies.svg';
    import utils from '~/assets/images/navbar/utils.svg';
    import logs from '~/assets/images/navbar/logs.svg';
    import Logo from '../Base/Logo.vue';
    import Tooltip from '../Base/Tooltip.vue';
    
    const content = [
        { rus: 'Проекты', eng: 'projects', path: projects },
        { rus: 'Прокси', eng: 'proxies', path: proxies },
        { rus: 'Логи', eng: 'logs', path: logs },
        { rus: 'Утилиты', eng: 'utils', path: utils },
    ];

    const route = useRoute();
</script>


<template>
    <aside class="sidebar-container">
        <div class="top-side-container">
            <Logo :show-title="true" />
    
            <ul>
                <a
                    class="nav-item"
                    v-for="item in content"
                    :key="item.rus"
                    :href="item.eng"
                    :class="{ 'active': route.path.split('/')[2].indexOf(item.eng) !== -1 }"
                >
                    <div class="img-container">
                        <img :src="item.path" alt="">
                    </div>
                    <span>{{ item.rus }}</span>
                </a>
            </ul>
        </div>
        
        <footer class="footer">
            <div class="nav-item">
                <div class="img-container">
                    <img src="~/assets/images/navbar/settings.svg" alt="">
                </div>
                <Tooltip text="Настройки"/>
            </div>
        </footer>
    </aside>
</template>


<style lang="scss">
    .sidebar-container {
        position: fixed;
        left: 0;
        left: 0;
        bottom: 0;
        z-index: 9999;
        height: 100vh;
        width: 88px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        white-space: nowrap;
        overflow-x: hidden;
        transition: 0.5s;
        background-color: var(--sidebar-color);
        padding: 20px;
        border-right: 2px solid var(--border-sidebar);   
    }
    .sidebar-container:hover {
        width: 250px;
    }
    .sidebar-container .top-side-container {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }
    .sidebar-container .header {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .sidebar-container .header img {
        width: 40px;
        height: 40px;
    }
    .sidebar-container .header h1 {
        font-size: 16px;
        letter-spacing: 1.2px;
        font-weight: 700;
    }

    .sidebar-container ul {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .sidebar-container .nav-item {
        display: flex;
        gap: 20px;
        align-items: center;
        position: relative;
    }
    .sidebar-container .nav-item.active span,
    .sidebar-container .nav-item.active:hover span  {
        color: var(--active-color);
    }
    .sidebar-container .nav-item:hover .tooltip {
        display: block;
    }
    .sidebar-container .nav-item:hover > span {
        color: var(--text-primary);
    }
    .sidebar-container .nav-item.active > .img-container {
        background: var(--active-color);
    }
    .sidebar-container .nav-item.active > .img-container img,
    .sidebar-container .nav-item.active:hover > .img-container img {
        filter: invert(100%) sepia(8%) saturate(0%) hue-rotate(36deg) brightness(109%) contrast(107%);
    }
    .sidebar-container .nav-item:hover > .img-container img {
        filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%);
    }
    .sidebar-container .nav-item span {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1.1px;
        color: var(--text-secondary);
        transition: 0.5s;
    }
    .sidebar-container .nav-item .img-container {
        padding: 12px;
        border-radius: 15px;
        background-color: var(--inversion-color);
    }
    .sidebar-container .nav-item img {
        max-width: none;
        transition: 0.5s;
        width: 24px;
        height: 24px;
        filter: invert(66%) sepia(0%) saturate(11%) hue-rotate(156deg) brightness(95%) contrast(93%);
    }

    .footer {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style> -->

<script setup lang="ts">
    import DashboardInput from '~/components/Dashboard/Input.vue';
    import projects from '~/assets/images/navbar/projects.svg';
    import proxies from '~/assets/images/navbar/proxies.svg';
    import utils from '~/assets/images/navbar/utils.svg';
    import logs from '~/assets/images/navbar/logs.svg';
    import Logo from '../Base/Logo.vue';

    
    const content = [
        { rus: 'Проекты', eng: 'projects', path: projects },
        { rus: 'Прокси', eng: 'proxies', path: proxies },
        { rus: 'Логи', eng: 'logs', path: logs },
        { rus: 'Утилиты', eng: 'utils', path: utils },
    ];

    const route = useRoute();
    console.log(route.path.split('/'))
    const searchValue = ref<string>('');
</script>


<template>
    <aside class="sidebar-container">
        <div class="top-side-container">
            <Logo :show-title="true" />

            <div class="input-box-container">
                <DashboardInput
                    v-model="searchValue"
                />
            </div>

            <ul>
                <span class="pre-title">Основное</span>
                <a
                    class="nav-item"
                    v-for="item in content"
                    :key="item.rus"
                    :href="item.eng"
                    :class="{ 'active': route.path.split('/')[2].indexOf(item.eng) !== -1 }"
                >
                    <div class="img-container">
                        <img :src="item.path" alt="">
                    </div>
                    <span>{{ item.rus }}</span>
                </a>
            </ul>
        </div>
        
        <footer class="footer">
            <div class="nav-item">
                <div class="img-container">
                    <img src="~/assets/images/navbar/settings.svg" alt="">
                </div>
                <span>Настройки</span>
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
        z-index: 9999;
        height: calc(100vh - 20px);
        width: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        white-space: nowrap;
        overflow-x: hidden;
        transition: 0.5s;
        background-color: var(--sidebar-color);
        border: 1px solid var(--border-color);   
        margin: 10px;
        margin-right: 0;
        border-radius: 12px 0 0 12px;
    }
    .sidebar-container .top-side-container {
        display: flex;
        flex-direction: column;
    }
    .sidebar-container .top-side-container .input-box-container {
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
    }
    .sidebar-container ul {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .sidebar-container ul .pre-title {
        font-size: 12px;
        color: var(--text-secondary);
        margin-left: 5px;
    }
    .sidebar-container .nav-item {
        padding: 5px 10px;
        border-radius: 8px;
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .sidebar-container .nav-item.active {
        border: 1px solid var(--border-color);
        background-color: var(--sidebar-bg-active);
    }
    .sidebar-container .nav-item.active span,
    .sidebar-container .nav-item.active:hover span  {
        color: var(--sidebar-text-active);
    }
    .sidebar-container .nav-item:hover > span {
        color: var(--text-primary);
    }
    .sidebar-container .nav-item.active > .img-container img,
    .sidebar-container .nav-item.active:hover > .img-container img {
        filter: invert(20%) sepia(100%) saturate(2561%) hue-rotate(249deg) brightness(82%) contrast(92%);
    }
    .sidebar-container .nav-item:hover > .img-container img {
        filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%);
    }
    .sidebar-container .nav-item span {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-secondary);
        transition: 0.5s;
    }
    .sidebar-container .nav-item img {
        max-width: none;
        transition: 0.5s;
        width: 18px;
        height: 18px;
        filter: invert(66%) sepia(0%) saturate(11%) hue-rotate(156deg) brightness(95%) contrast(93%);
    }

    .footer {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 15px;
    }
</style>