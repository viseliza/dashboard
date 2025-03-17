<script lang="ts" setup>
    import { LogsAPI, TemplateAPI } from '~/api';
    import { Tokens, Log } from '~/models';
    import projects from '~/assets/images/navbar/projects.svg';

    const route = useRoute();
    const tokens = new Tokens(Tokens.getTokens());
    const logsAPI = new LogsAPI(
        TemplateAPI.x_token,
        tokens.access_token, 
    );

    const dump = new Dump({
        action: route.query.action,
        log_type: route.query.log_type,
        from_timestamp: route.query.from_timestamp,
        to_timestamp: route.query.to_timestamp,
        order: route.query.order,
        page: route.query.page,
    }, ['string', 'string', 'timestamp', 'timestamp', 'string', 'page'], logsAPI, tokens);

    const dumpData = ref(await dump.dump());
    const logs = computed(() => dumpData.value.data);
    const totalPages = computed(() => dumpData.value.maxPages);
    const count = computed(() => dumpData.value.count);
    const params = ref(dump.getParams());

    watch(() => route.fullPath, async () => {
        dump.refreshRequestParams(route.query);
        dumpData.value = await dump.dump();
        params.value = dump.getParams();
    });

    const mods = computed(() => [{
        name: 'general',
        icon: 'fa-solid fa-list-ul',
        iconType: 'fa',
    },{
        name: 'services',
        icon: projects,
        iconType: 'custom',
    },{
        name: 'streaks',
        icon: 'fa-solid fa-barcode',
        iconType: 'fa',
    }]);
    const activeMode = shallowRef('general');
</script>

<template>
    <Head>
        <Title>Логи</Title>
    </Head>

    <DashboardHeader
        :title="`Логи (${count})`"
        :paths="['Панель', 'Логи']"
    />

    <FiltersContainer>
        <template #top-mods>
            <FiltersMods
                :mods="mods"
                v-model:active-mode="activeMode"
                title="Режим"
            />
        </template>

        <template #top-general>
            <LogsFilter
                title="Действие"
                name="action"
                icon="fas fa-sliders-h"
                :activeCount="params.action ? 1 : undefined"
                iconType="fa"
                :dropdownItems="Log.actions.map(action => ({
                    title: action.name,
                    value: action.value,
                    active: params.action === action.value,
                }))"
            />

            <LogsFilter
                name="log_type"
                icon="mdi-information-variant-circle-outline"
                :activeCount="params.log_type ? 1 : undefined"
                title="Тип лога"
                iconType="mdi"
                :dropdownItems="Log.types.map(type => ({
                    title: type.name,
                    value: type.value,
                    active: params.log_type === type.value,
                }))"
            />

            <LogsFilter
                name="order"
                :activeCount="params.order ? 1 : undefined"
                icon="mdi-swap-vertical"
                title="Порядок"
                iconType="mdi"
                :dropdownItems="Log.orders.map(order => ({
                    title: order.name,
                    value: order.value,
                    active: params.order === order.value,
                }))"
            />
        </template>

        <template #top-right>
            <BaseTabs/>
        </template>

        <template #active-filters>
            <LogsActiveFilter
                v-for="[key, value] in Object.entries(params).filter(([key]) => key !== 'limit' && key !== 'offset')"
                :key="key"
                :_key="key"
                :value="value as string"
            />
        </template>
    </FiltersContainer>


    <div class="logs-container">
        <LogsItem
            v-for="log in logs"
            :key="log.created_at"
            :log="log"
        />
    </div>

    <BasePagination
        v-if="totalPages > 1"
        :total-pages="totalPages"
    />
</template>

<style scoped>
    .logs-container {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 5px;
    }
</style>