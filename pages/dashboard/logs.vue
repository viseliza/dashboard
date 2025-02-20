<script lang="ts" setup>
    import { LogsAPI, TemplateAPI } from '~/api';
    import { Tokens, Log } from '~/models';

    useHead({
        title: 'Логи',
    });

    const route = useRoute();
    const router = useRouter();
    const tokens = new Tokens(Tokens.getTokens());
    const logsAPI = new LogsAPI(
        TemplateAPI.x_token,
        tokens.access_token, 
    );
    const queryParams = new QueryParams(route, router);

    const dump = new Dump({
        action: route.query.action,
        log_type: route.query.log_type,
        from_timestamp: route.query.from_timestamp,
        to_timestamp: route.query.to_timestamp,
        order: route.query.order,
        page: route.query.page,
    }, ['string', 'string', 'timestamp', 'timestamp', 'string', 'page'], logsAPI, tokens);

    const dumpData = ref(await dump.dump());
    const totalPages = ref(dump.maxPages);

    watch(() => route.fullPath, async () => {
        dump.refreshRequestParams(route.query);
        dumpData.value = await dump.dump();
        totalPages.value = dump.maxPages;
    });
</script>

<template>
    <DashboardHeader title="Логи"/>

    <div class="filters-container">
        <div class="filters-container__top">
            <div class="filters-container__top-left">
                <LogsFilter
                    :queryParams="queryParams"
                    name="structure"
                    icon="fa-solid fa-bars-staggered"
                    title="Структура"
                    class-name="border-right"
                    iconType="fa"
                />
    
                <div class="filters-container__top-structure">
                    <div class="filters-container__top-structure-icon">
                        <font-awesome-icon icon="fa-solid fa-list-ul" />
                    </div>
                </div>
    
                <div class="filters-container__top-general">
                    <LogsFilter
                        :queryParams="queryParams"
                        name="action"
                        icon="fas fa-sliders-h"
                        :activeCount="dump.getParams().action ? 1 : undefined"
                        title="Действие"
                        iconType="fa"
                        :dropdownItems="Log.actions.map(action => ({
                            title: action.name,
                            value: action.value,
                            active: dump.getParams().action === action.value,
                        }))"
                    />
    
                    <LogsFilter
                        :queryParams="queryParams"
                        name="log_type"
                        icon="mdi-information-variant-circle-outline"
                        :activeCount="dump.getParams().log_type ? 1 : undefined"
                        title="Тип лога"
                        iconType="mdi"
                        :dropdownItems="Log.types.map(type => ({
                            title: type.name,
                            value: type.value,
                            active: dump.getParams().log_type === type.value,
                        }))"
                    />
    
                    <LogsFilter
                        :queryParams="queryParams"
                        name="order"
                        :activeCount="dump.getParams().order ? 1 : undefined"
                        icon="mdi-swap-vertical"
                        title="Порядок"
                        iconType="mdi"
                        :dropdownItems="Log.orders.map(order => ({
                            title: order.name,
                            value: order.value,
                            active: dump.getParams().order === order.value,
                        }))"
                    />
                </div>
            </div>

            <div class="filters-container__top-right">
                <BaseTabs/>
            </div>
        </div>

        <div class="filters-container-bottom">
            <LogsActiveFilter
                :queryParams="queryParams"
                v-for="[key, value] in Object.entries(dump.getParams()).filter(([key]) => key !== 'limit' && key !== 'offset')"
                :key="key"
                :_key="key"
                :value="value as string"
            />
        </div>

    </div>

    <div class="logs-container">
        <LogsItem
            v-for="log in dumpData.data"
            :key="log.created_at"
            :log="log"
        />
    </div>

    <BasePagination
        :route="route"
        :router="router"
        :queryParams="queryParams"
        v-model="totalPages"
    />
</template>

<style scoped>
    .logs-container {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
    .filters-container {
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-bottom: 0;
        gap: 15px;
    }
    .filters-container__top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid var(--secondary-color);
    }
    .filters-container__top-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 10px;
    }
    .filters-container__top-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .filters-container__top-structure {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
    }
    .filters-container__top-structure-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: var(--secondary-color);
        border-radius: 5px;
    }
    .filters-container__top-general {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        padding-left: 15px;
        border-left: 2px solid var(--secondary-color);
    }

    .filters-container-bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

</style>