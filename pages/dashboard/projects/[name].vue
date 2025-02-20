<script lang="ts" setup>
    import ControlBar from '~/components/Dashboard/ControlBar.vue';
    import DashboardHeader from '~/components/Dashboard/Header.vue';
    import { 
        PennoeAPI, 
        TemplateAPI, 
        DurakAPI
    } from '~/api';
    import { 
        ServiceItem, 
        Tokens
    } from '~/models';

    const route = useRoute();
    const tokens = new Tokens(Tokens.getTokens());
    
    const serviceAPI = new DurakAPI(TemplateAPI.x_token);
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

    useHead({
        title: `Панель - ${serviceItem.name}`
    });

    let activeModel: any = reactive({});
    const [ tableData, stats ] = await Promise.all([
        serviceAPI.dumpAccounts({}, tokens.access_token),
        serviceAPI.getStats({}, tokens.access_token),
    ]);

    const translate: any = {
        'id': 'ID',
        'token': 'Токен',
        'balance': 'Баланс',
        'mode': 'Режим',
        'enable': 'Включен',
        'created_at': 'Создан',
        'updated_at': 'Обновлен',
        'data': 'Данные',
    }

    function displayData(data: any) {
        const dataCopy = Object.assign({}, data);
        delete dataCopy.data;
        delete dataCopy.enable;
        return dataCopy;
    }

    watch(() => route.fullPath, () => {
        console.log(route.fullPath)
    });

    const handleClick = (data: any) => {
        activeModel = data;
        console.log(activeModel)
    }
</script>


<template>
    <DashboardHeader :title="'Проект: ' + serviceItem.name"/>

    <main>
        <BaseHeader :count="tableData.count" title="Аккаунты">
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
                    v-for="key in Object.keys(displayData(tableData.data[0]))"
                    :key="key"
                    :name="key"
                    :title="translate[key]"
                />
            </template>

            <template #content>
                <ProjectTabeCell
                    v-for="item in tableData.data"
                    :key="item"
                    :keys="Object.keys(displayData(tableData.data[0]))"
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
    </Teleport>    
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        padding: 20px;
        margin-right: 400px;
    }

    .controlbar-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-bottom: 2px solid var(--secondary-color);
    }

    @media screen and (max-width: 1350px) {
        main { 
            margin: 0;
        }
    }
</style>