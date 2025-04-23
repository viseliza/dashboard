<script lang="ts" setup>
    import { PennoeAPI, TemplateAPI } from '~/api';
    import { useDumpStore } from '~/store';
    import { Tokens, Log } from '~/models';
    import { QueryParams } from '~/utils';
    import projects from '~/assets/images/navbar/projects.svg';

    const route = useRoute();
    const tokens = new Tokens(Tokens.getTokens());
    const servicesAPI = new PennoeAPI(
        TemplateAPI.x_token,
    );
    
    /** Инициализация стратегии фильтров */
    const filterStrategies = new FilterStrategies();
    filterStrategies.use('general', new GeneralStrategy());
    filterStrategies.use('services_durak', new DurakServiceStrategy());
    filterStrategies.use('services_aptekiplus', new AptekiPlusServiceStrategy());
    filterStrategies.use('streaks_durak', new DurakStreakStrategy());
    filterStrategies.use('streaks_aptekiplus', new AptekiPlusStreakStrategy());

    const table = shallowRef(route.query.table || 'general');
    const time = computed(() => route.query.time);
    const service = computed(() => route.query.service);
    const name = computed(() => table.value !== 'general' && service.value
        ? table.value + '_' + service.value
        : 'general'); 
    
    const initData = () => {
        const filterParams = filterStrategies.getFilters(name.value);
        const requestParams = Object.keys(filterParams).reduce((acc: any, key: string) => {
            acc[key] = route.query[key] as string;
            return acc;
        }, {});

        return {
            requestParams,
            rules: Object.values(filterParams),
        };
    };
    watch(name, async () => {
        const { requestParams, rules } = initData();

        dumpStore.initializate(
            requestParams, 
            rules
        );

        delete requestParams.service;
        const deleteKeys = Object.keys(requestParams);

        if (table.value === 'general')
            deleteKeys.push('service');
        
        deleteKeys.forEach((key) => {
            if (route.query[key])
                QueryParams.removeQuery(key);
        });
    });

    const dumpStore = useDumpStore();

    const { requestParams, rules } = initData();

    dumpStore.initializate(
        requestParams, 
        rules
    );
    const call = async (requestParams: any) => {
        const request = filterStrategies.getRequest(name.value);
        return await request(requestParams, tokens.access_token);
    }
    const actions = computed(() => filterStrategies.getActions(name.value));

    const dump = async () => {
        const params = structuredClone(dumpStore.params);

        if (time.value) {
            const dateConvert = new DateConvert();
            const { 
                from_timestamp, 
                to_timestamp
            } = dateConvert.convert(time.value as string);
            params['from_timestamp'] = from_timestamp;
            params['to_timestamp'] = to_timestamp;
        }
        
        delete params['service'];
        delete params['time'];
        
        const dumpResult = await call(params);

        dumpStore.table = structuredClone(dumpResult.data);
        dumpStore.maxPages = Math.ceil(dumpResult.count / 25);
        dumpStore.count = dumpResult.count;
    }
    await dump();

    const data = computed(() => dumpStore.table);
    const totalPages = computed(() => dumpStore.maxPages);
    const count = computed(() => dumpStore.count);
    const params = computed(() => dumpStore.params);
    const services = await servicesAPI.getServices({}, tokens.access_token);

    watch(params, () => {
        console.log(params.value)
    })
    
    watch(() => route.fullPath, async () => {
        dumpStore.refreshRequestParams(route.query);
        await dump();
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

    const times = computed(() => ([{
        name: 'День',
        code: 'day'
    },{
        name: 'Неделя',
        code: 'weak'
    },{
        name: 'Месяц',
        code: 'month'
    },{
        name: 'Год',
        code: 'year'
    }]));
</script>

<template>
    <Head>
        <Title>Логи</Title>
    </Head>

    <DashboardHeader
        :title="`Логи (${count})`"
        :paths="['Панель', 'Логи']"
    />

    <DashboardCategory title="Таблица">        
        <FiltersContainer>
            <template #top-mods>
                <FiltersMods
                    title="Таблица"
                    key-query="table"
                    :mods="mods"
                    v-model:active-mode="table as string"
                    :disabled="true"
                />
            </template>
    
            <template #top-general>
                <FiltersFilter
                    title="Действие"
                    name="action"
                    :isActive="params.action ? true : false"
                    :dropdownItems="actions.map(action => ({
                        title: action.name,
                        value: action.value,
                        active: params.action === action.value,
                    }))"
                />
    
                <FiltersFilter
                    name="log_type"
                    :isActive="params.log_type ? true : false"
                    title="Тип лога"
                    :dropdownItems="Log.types.map(type => ({
                        title: type.name,
                        value: type.value,
                        active: params.log_type === type.value,
                    }))"
                />
    
                <FiltersFilter
                    name="order"
                    :isActive="params.order ? true : false"
                    title="Порядок"
                    :dropdownItems="Log.orders.map(order => ({
                        title: order.name,
                        value: order.value,
                        active: params.order === order.value,
                    }))"
                />

                <FiltersFilter
                    name="time"
                    title="Время"
                    :isActive="params.time ? true : false"
                    :dropdownItems="times.map(_time => ({
                        title: _time.name,
                        value: _time.code,
                        active: params.time === _time.code,
                    }))"
                />

                <FiltersFilter
                    v-if="table !== 'general'"
                    name="service"
                    :isActive="params.service ? true : false"
                    title="Сервис"
                    :dropdownItems="services.map(service => ({
                        title: service.name,
                        value: service.code,
                        active: params.service === service.code,
                    }))"
                />
            </template>
    
            <template #top-right>
                <FiltersSearchBox
                
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
    
    
        <div class="logs-container">
            <LogsItem
                v-for="log in data"
                :key="log.created_at"
                :log="log"
            />
        </div>
    
        <BasePagination
            v-if="totalPages > 1"
            :total-pages="totalPages"
        />
    </DashboardCategory>
</template>

<style scoped>
    .logs-container {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 0px;
    }
</style>