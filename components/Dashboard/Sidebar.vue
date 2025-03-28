<script setup lang="ts">
    import projects from '~/assets/images/navbar/projects.svg';
    import proxies from '~/assets/images/navbar/proxies.svg';
    import logs from '~/assets/images/navbar/logs.svg';
    import { ProxyHelper } from '~/utils';
    import { ProxyAPI } from '~/api';

    const showSettings = defineModel<boolean>('showSettings', {
        type: Boolean,
        required: true,
    });
    
    const content = [
        { rus: 'Проекты', eng: 'projects', path: projects, add: false },
        { rus: 'Прокси', eng: 'proxies', path: proxies, add: true },
        { rus: 'Логи', eng: 'logs', path: logs, add: false },
        { rus: 'Утилиты', eng: 'utils', path: false, add: false, icon: 'fa-signature' },
    ];
    
    const createItem = reactive({
        show: false,
        name: '',
        data: {},
    });
    const proxyHelper = new ProxyHelper();

    const route = useRoute();
</script>


<template>
    <aside class="sidebar-container">
        <div class="top-side-container">
            <BaseLogo :show-title="true" />

            <ul>
                <div
                    class="nav-item"
                    v-for="item in content"
                    :key="item.rus"
                    :class="{ 'active': route.path.split('/')[2].indexOf(item.eng) !== -1 }"
                >   
                    <NuxtLink 
                        :to="'/dashboard/' + item.eng" 
                        class="left"
                    >
                        <div class="img-container">
                            <font-awesome-icon v-if="!item.path && item.icon" :icon="item.icon" />
                            <img v-else :src="(item.path as string)" alt="">
                        </div>
                        <span>{{ item.rus }}</span>
                    </NuxtLink>

                    <button 
                        v-if="item.add" 
                        class="right"
                        @click="() => {
                            createItem.show = true;
                            createItem.name = item.rus;
                        }"
                    >
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </button>
                </div>
            </ul>
        </div>

        <Teleport to="#modal">
            <ModalsControlModal
                v-if="createItem.show"
                v-model:showModal="createItem.show"
                title="Создание прокси"
            >
                <template #content>
                    <ModalsControlForm
                        v-model:show-modal="createItem.show"
                        v-model:data="createItem.data"
                        :with-categories="true"
                        :api="new ProxyAPI('')"
                        :call="new ProxyAPI('').create"
                        :params="proxyHelper.proxyParams"
                        :get-params="proxyHelper.getProxyParams"
                        :helper="proxyHelper"
                        :styles="{
                            'padding': '0',
                            'padding-top': '15px',
                            'gap': '0',
                            'max-height': '580px',
                            'overflow-y': 'auto',
                        }"
                    />
                </template>
            </ModalsControlModal>
        </Teleport>
        
        <footer class="footer">
            <button
                class="nav-item"
                @click="showSettings = true"
            >
                <div class="left">
                    <div class="img-container">
                        <img src="~/assets/images/navbar/settings.svg" alt="">
                    </div>
                    <span>Настройки</span>
                </div>
            </button>

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
    .sidebar-container .nav-item .left:hover > .img-container svg,
    .sidebar-container .nav-item .left:hover > .img-container .v-icon,
    .sidebar-container .nav-item.active > .left .img-container img,
    .sidebar-container .nav-item.active > .left .img-container svg,
    .sidebar-container .nav-item.active > .left .img-container .v-icon {
        filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%);
    }
    .sidebar-container .nav-item .left span {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-secondary);
        transition: 0.5s;
    }
    .sidebar-container .nav-item .left img,
    .sidebar-container .nav-item .left svg,
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