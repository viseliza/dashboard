<script lang="ts" setup>
    import { useDumpStore, useServiceStore } from '~/store';
    import { PennoeAPI, TemplateAPI } from '~/api';
    import {
        ServiceItem, 
        Tokens,
        Filter,
        Statistic
    } from '~/models';
    import type { TableMode } from '~/types';

    const route = useRoute();
    const tokens = new Tokens(Tokens.getTokens());
    const pennoeAPI = new PennoeAPI(TemplateAPI.x_token);

    const service = await pennoeAPI.privateCall(
        pennoeAPI.getServices,
        '',
        tokens
    );
    const [ serviceItem ] = service.filter((item: ServiceItem) => item.code === route.params.name);

    if (!serviceItem) {
        throw createError({
            status: 404,
            message: 'Сервис не найден!'
        });
    }

    /** Registration of services */
    const serviceStrategy = new ServicesStrategy();	

    /** Strategy methods */
    const serviceData = computed(() => ({
        code: serviceItem.code,
        mode: activeMode.value
    }));

    /** Strategy methods */
    const api = computed(() => serviceStrategy.getAPI(serviceData.value));
    const call = (params: any) => serviceStrategy.getDumpRequest(serviceData.value, params);
    const updateCall = (params: any) => serviceStrategy.getUpdateRequest(serviceData.value, params);
    const updateParams = computed(() => serviceStrategy.getUpdateRequestParams(serviceData.value));
    const modes = computed(() => serviceStrategy.getModes(serviceData.value));
    const activeMode = shallowRef(route.query.mode as string || 'accounts');
    const displayKeys = computed(() => serviceStrategy.getDisplayKeys(serviceData.value));
    const isRelink = computed(() => serviceStrategy.getRelinkRequestParams(serviceData.value));
    const isRefresh = computed(() => serviceStrategy.getRefreshRequestParams(serviceData.value));
    
    /** Init service store */
    const serviceStore = useServiceStore();
    serviceStore.updateParams({
        tableMode: activeMode.value,
        serviceCode: serviceItem.code,
        isRefresh: isRefresh.value,
        isRelink: isRelink.value,
        requestParams: updateParams.value,
    });

    /** Table dump methods */
    const dumpStore = useDumpStore();
    dumpStore.initializate({
        filter_by: route.query.filter_by,
        order: route.query.order,
        query: route.query.query,
        page: route.query.page, 
    }, ['string', 'string', 'string', 'page']);
    
    const stats: Statistic = await serviceStrategy.getStats(serviceData.value) as Statistic;
    serviceStore.stats = structuredClone(stats);
    
    const getDisplayData = () => {
        const keys = displayKeys.value;
        return table.value.map((item: any) => {
            return Object.entries(item).reduce((acc: any, [key, value]) => {
                if (keys.includes(key)) {
                    acc[key] = value;
                    if (key.split('_').length > 1  && key.split('_')[1] === 'at') {
                        
                        acc[key] = value !== 0 
                            ? new Date(value as number * 1_000).toLocaleString()
                            : "—";
                    }
                } 
                return acc;
            }, {});
        });
    }    

    /** Dump methods */
    const dump = async () => {
        const params = dumpStore.params;
        const dumpResult = await call(params);

        dumpStore.table = structuredClone(dumpResult.data);
        dumpStore.maxPages = Math.ceil(dumpResult.count / 25);
        dumpStore.count = dumpResult.count;
    }
    await dump();

    const table = computed(() => dumpStore.table);
    const totalPages = computed(() => dumpStore.maxPages);
    const count = computed(() => dumpStore.count);
    const params = computed(() => dumpStore.params);
    const displayData = ref(getDisplayData());
    
    const columns = computed(() => Object.keys(displayData.value[0]));
    const modesIcons = computed(() => ({
        'accounts': {
            icon: 'fa-solid fa-users',
            iconType: 'fa',
        },
        'streaks': {
            icon: 'fa-solid fa-barcode',
            iconType: 'fa',
        },
    }));

    /** After route params change */
    watch(() => route.fullPath, async() => {    
        dumpStore.refreshRequestParams(route.query);
        await dump();
        serviceStore.updateParams({
            tableMode: route.query.mode as TableMode || 'accounts',
            serviceCode: serviceItem.code,
            isRefresh: isRefresh.value,
            isRelink: isRelink.value,
            requestParams: updateParams.value,
        });
    });

    /** Display data methods */
    watch(table, () => {
        displayData.value = getDisplayData();
    });

    /** Filter mods methods */
    const filterMods = computed(() => modes.value.map((mode: string) => ({
        name: mode,
        icon: modesIcons.value[mode as keyof typeof modesIcons.value].icon,
        iconType: modesIcons.value[mode as keyof typeof modesIcons.value].iconType,
    })));

    /** Actions */
    const actionConfirmation = shallowRef<boolean>(false);
    const acceptDelete = shallowRef<boolean | undefined>(undefined);
    const actions = computed(() => serviceStrategy.getActions(serviceData.value));
    const actionsShow = reactive(Object.entries(actions.value).reduce((acc: any, [key, value]) => {
        acc[key] = false;
        return acc;
    }, {}));

    watch(acceptDelete, (value) => {
        Object.keys(actionsShow).forEach((action: any) => {
            actionsShow[action] = false;
        });

        if (value) {

            /** Wipe Request */
            /** ... */
        }

        acceptDelete.value = undefined; 
    });
</script>

<template>
    <Head>
        <Title>Панель - {{ serviceItem.name }}</Title>
    </Head>

    <DashboardHeader 
        :title="'Проект: ' + serviceItem.name"
        :paths="['Панель', 'Проекты', serviceItem.name]"
    />

    <DashboardCategory 
        title="Статистика"
        :contentStyles="{
            'flexDirection': 'row',
            'padding': '0 20px',
        }"
    >
        <StatsContent
            v-for="stat in Object.keys(stats)"
            :key="stat"
            :title="stat"
            :stat="stats[stat as keyof typeof stats]"
        />
    </DashboardCategory>

    <DashboardCategory 
        title="Таблица"
        :styles="{
            'gap': '10px',
        }"
    >
        <ActionsContent>
            <ActionsAction
                v-for="action in Object.keys(actions)"
                :key="action"
                :title="action"
                @click="actionsShow[action] = true"
        >
            <Teleport
                v-if="actionsShow[action]"
                to="#modal"
            >
                <ModalsConfirmModal
                    v-if="action === 'Удалить все'"
                    :title="'Удалить все ' + (activeMode === 'accounts' ? 'аккаунты' : 'штрихи')"
                    :confirmation="actionConfirmation"
                    @accept="(value) => acceptDelete = value"
                >
                    <span>
                        Для данного действия требуется дополнительное подтверджение. Чтобы подтвердить <b>удаление всех записей таблицы</b>, введите <b>«Подтверждаю, что хочу удалить все {{ activeMode === 'accounts' ? 'аккаунты' : 'штрихи' }}»</b> в поле ниже и нажмите на кнопку "Подтвердить"
                    </span>

                    <ActionsInput 
                        :text="'Подтверждаю, что хочу удалить все ' + (activeMode === 'accounts' ? 'аккаунты' : 'штрихи')" 
                        @confirmation="actionConfirmation = $event"
                    />
                </ModalsConfirmModal>


                <ModalsControlModal 
                    v-else
                    :title="action + ' ' + (activeMode === 'accounts' ? 'аккаунт' : 'штрих')"
                    :height="'400px'"
                    @close="actionsShow[action] = false"
                >
                    <template #content>
                        <ModalsControlForm
                            :name="action + ' ' + (activeMode === 'accounts' ? 'аккаунт' : 'штрих')"
                            :model="activeMode === 'accounts' ? 'Account' : 'Streak'"
                            @close="actionsShow[action] = false"
                            :api="api"
                            :call="actions[action].request"
                            :params="actions[action].params"
                            :styles="{
                                'padding': '0',
                                'padding-top': '15px',
                            }"
                        />
                    </template>
                    </ModalsControlModal>
                </Teleport>
            </ActionsAction>
        </ActionsContent>

        <FiltersContainer>
            <template #top-mods>
                <FiltersMods
                    title="Режим"
                    :mods="filterMods"
                    v-model:active-mode="activeMode"
                    :disabled="true"
                />
            </template>

            <template #top-general>
                <FiltersFilter
                    title="Фильтр по"
                    name="filter_by"
                    :isActive="params.filter_by ? true : false"
                    :dropdownItems="Filter.getFilterBy(columns).map((action: any) => ({
                        title: action.name,
                        value: action.value,
                        active: params.filter_by === action.value,
                    }))"
                />

                <FiltersFilter
                    name="order"
                    :isActive="params.order ? true : false"
                    title="Сортировка"
                    :dropdownItems="Filter.getOrder().map((type: any) => ({
                        title: type.name,
                        value: type.value,
                        active: params.order === type.value,
                    }))"
                />
            </template>

            <template #active-filters>
                <FiltersActiveFilter
                    v-for="[key, value] in Object.entries(params).filter(([key]) => key !== 'limit' && key !== 'offset')"
                    :key="key"
                    :_key="key"
                    :value="value as string"
                />
            </template>
        </FiltersContainer>

        <main>
            <TableContent 
                :data="displayData" 
                :call="updateCall"
                :api="api"
            />
        </main>
    </DashboardCategory>

    <BasePagination
        v-if="totalPages > 1"
        :total-pages="totalPages"
    />
</template>

<style scoped>
    main {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 0;
        overflow-x: auto;
        min-width: 700px;
    }
    .controlbar-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-bottom: 2px solid var(--secondary-color);
    }

    @media screen and (max-width: 620px) {
        .searchBox:hover > .searchInput {
            width: 150px;
            padding: 0 6px;
        }
    }
    @media screen and (max-width: 1350px) {
        main { 
            margin: 0;
        }
    }
</style>