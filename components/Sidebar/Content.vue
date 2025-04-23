<script setup lang="ts">
    import settings from '~/assets/images/navbar/settings.svg';
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

    const logout = () => {
        console.log('logout');
    };
</script>

<template>
    <SidebarContainer>
        <template #items>
            <SidebarLink
                v-for="item in content"
                :key="item.rus"
                :item="item"
                :create-item="createItem"
            />
        </template>

        <template #modal>
            <Teleport
                v-if="createItem.show"
                to="#modal"
            >
                <ModalsControlModal
                    @close="createItem.show = false"
                    title="Создание прокси"
                >
                    <template #content>
                        <ModalsControlForm
                            name="Создане прокси"
                            model="Прокси"
                            @close="createItem.show = false"
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
        </template>

        <template #footer>
            <SidebarLink
                @click="showSettings = true"
                :item="{ rus: 'Настройки', path: settings, add: false }"
                :create-item="createItem"
            />

            <SidebarLink
                @click="logout"
                :item="{ rus: 'Выйти', path: false, add: false }"
                :create-item="createItem"
            >
                <v-icon>mdi-minus-circle-outline</v-icon>
            </SidebarLink>
        </template>
    </SidebarContainer>
</template>