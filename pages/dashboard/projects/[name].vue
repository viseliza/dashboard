<script lang="ts" setup>
    import { 
        PennoeAPI, 
        TemplateAPI, 
        DurakAPI
    } from '~/api';
    import { 
        ServiceItem, 
        Tokens,
        Filter,
        Statistic
    } from '~/models';

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
    serviceStrategy.use('durak', new DurakStrategy());
    serviceStrategy.use('aptekiplus', new AptekiPlusStrategy());

    const api = computed(() => serviceStrategy.getAPI(serviceItem.code));
    const call = (params: any) => serviceStrategy.getDumpRequest(serviceItem.code, activeMode.value, params);
    const modes = computed(() => serviceStrategy.getModes(serviceItem.code));
    const activeMode = shallowRef(route.query.mode as string || 'accounts');
    const displayKeys = computed(() => serviceStrategy.getDisplayKeys(serviceItem.code, activeMode.value));

    const getDisplayData = () => {
        const keys = displayKeys.value;
        return table.value.map((item: any) => {
            return Object.entries(item).reduce((acc: any, [key, value]) => {
                if (keys.includes(key)) acc[key] = value;
                if (key.split('_').length > 1  && key.split('_')[1] === 'at') {
                    
                    acc[key] = value !== 0 
                        ? new Date(value as number * 1_000).toLocaleString()
                        : "—";
                }
                return acc;
            }, {});
        });
    }    

    const dump = new Dump({
        filter_by: route.query.filter_by,
        order: route.query.order,
        query: route.query.query,
        page: route.query.page, 
    }, ['string', 'string', 'string', 'page'], api.value, tokens);

    const stats: Statistic = await serviceStrategy.getStats(serviceItem.code) as Statistic;
    const params = shallowRef(dump.getParams());
    const dumpData = ref(await dump.dump(call, params.value));

    const table = computed(() => dumpData.value.data);
    const totalPages = computed(() => dumpData.value.maxPages);
    const count = computed(() => dumpData.value.count);
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

    watch(() => route.fullPath, async() => {    
        dump.refreshRequestParams(route.query);
        params.value = dump.getParams();
        dumpData.value = await dump.dump(call, params.value);
    });

    const filterMods = computed(() => modes.value.map((mode: string) => ({
        name: mode,
        icon: modesIcons.value[mode as keyof typeof modesIcons.value].icon,
        iconType: modesIcons.value[mode as keyof typeof modesIcons.value].iconType,
    })));

    watch(table, () => {
        displayData.value = getDisplayData();
    })
</script>


<template>
    <Head>
        <Title>Панель - {{ serviceItem.name }}</Title>
    </Head>

    <DashboardHeader 
        :title="'Проект: ' + serviceItem.name + ' (' + count +')'"
        :paths="['Панель', 'Проекты', serviceItem.name]"
    />

    <FiltersContainer>
        <template #top-mods>
            <FiltersMods
                title="Режим"
                :mods="filterMods"
                v-model:active-mode="activeMode"
            />
        </template>

        <template #top-general>
            <LogsFilter
                title="Фильтр по"
                name="filter_by"
                icon="mdi-table-filter"
                iconType="mdi"
                :activeCount="params.filter_by ? 1 : undefined"
                :dropdownItems="Filter.getFilterBy(columns).map((action: any) => ({
                    title: action.name,
                    value: action.value,
                    active: params.filter_by === action.value,
                }))"
            />

            <LogsFilter
                name="order"
                iconType="mdi"
                icon="mdi-sort"
                :activeCount="params.order ? 1 : undefined"
                title="Сортировка"
                :dropdownItems="Filter.getOrder().map((type: any) => ({
                    title: type.name,
                    value: type.value,
                    active: params.order === type.value,
                }))"
            />
        </template>

        <template #top-right>
            <FiltersSearchBox/>
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

    <main>
        <TableContent 
            :data="displayData" 
            :stats="stats" 
            :table-mode="activeMode"
        />
    </main>

    <BasePagination
        v-if="totalPages > 1"
        :total-pages="totalPages"
    />
    <!--<main>
        <BaseHeader :count="dump.count" title="Аккаунты">
            <BaseSearchBar/>
            
            <BaseAddButton name="аккаунт"/>
        </BaseHeader>
        
        <ProjectTable>
            <template #header>
                <td style="
                    width: 40px; 
                    background-color: var(--secondary-sub-color);
                    border: 1px solid var(--secondary-color);
                    opacity: .5;
                "></td>
                
                <ProjectTableCellHeader 
                    v-for="key in Object.keys(displayData(table.data[0]))"
                    :key="key"
                    :name="key"
                    :title="translate[key]"
                />
            </template>

            <template #content>
                <ProjectTabeCell
                    v-for="item in table.data"
                    :key="item"
                    :keys="Object.keys(displayData(table.data[0]))"
                    :item="item"
                    @click="() => handleClick(item)"
                />
            </template>
        </ProjectTable>
    </main>

    <Teleport to='#layout'>
        <ControlBar>
            <div class="controlbar-content">
                <ProjectDonutChart
                    v-if="stats"
                    :stats="stats"
                />
            </div>

            <div v-if="activeModel.id" class="controlbar-content">
                <span>1</span>
                {{ activeModel.id }}
            </div>
        </ControlBar>
    </Teleport> -->
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