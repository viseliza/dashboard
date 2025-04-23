<script setup lang="ts">
    import { 
        useLoader, 
        useServiceStore, 
        useDumpStore 
    } from '~/store';
    type Props = {
        item: any;
        call: any;
        api: any;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close']);
    const data = ref<any>({});
    const loaderStore = useLoader();
    const serviceStore = useServiceStore();
    const dumpStore = useDumpStore();
    const serviceStrategy = new ServicesStrategy();

    const serviceHelper = serviceStore.requestParams 
        ? new ServiceHelper(
            serviceStore.requestParams,
            Object.keys(serviceStore.requestParams).reduce((result: any, key) => {
                let data = {} as any;
                Object.keys(props.item).filter(_el => {
                    if (_el === key) data = props.item[key];
                });
                result[key] = data;
                return result;
            }, {})
        )
        : null;

    const fieldsEnabled = shallowRef<boolean>(false);
    const error = shallowRef<boolean>(false);

    const deleteItem = async () => {
        loaderStore.startLoading(
            props.item,
            'Удалить ' + displayTableMode.value,
            displayTableMode.value
        );

        try {
            const request = await serviceStrategy.getDeleteRequest({
                code: serviceStore.serviceCode,
                mode: serviceStore.tableMode
            }, { id: props.item.id });

            loaderStore.setResult(
                'success', 
                'Данные успешно удалены',
                request
            );
            dumpStore.deleteItem(props.item.id);
            emit('close');
        } catch (e) {
            loaderStore.setResult(
                'fail', 
                'Произошла какая-то ошибка, проверьте данные и попробуйте еще раз',
                JSON.parse(JSON.stringify(e))
            );
            return;
        }
    }

    const displayTableMode = computed(() => {
        return serviceStore.tableMode.charAt(0).toUpperCase() + serviceStore.tableMode.slice(1);
    });

    const details = computed(() => ([
        'balance',
        'created_at',
        'updated_at',
        'mode',
        'points',
    ]));

    const detailsData = computed(() => 
        Object.keys(props.item).filter((key) => details.value.includes(key))
    );

    const enabled = computed(() => {
        if (props.item.enable !== undefined) return 'enable';
        if (props.item.opened !== undefined) return 'opened';
        return '';
    });

    const formFields = computed(() => {
        return Object.keys(props.item).filter((key) => !details.value.includes(key) && key !== enabled.value);
    });
</script>

<template>
    <ModalsCardContainer>
        <template #header>
            <ModalsCardHeader 
                :enabled="enabled"
                :status="enabled ? item[enabled] : ''"
                :id="item.id"
                @close="emit('close')"
            />
        </template>

        <template #details>
            <ModalsCardDetails>
                <ModalsCardDetail 
                    v-for="detail in detailsData"
                    :name="detail"
                    :value="item[detail]"
                />
            </ModalsCardDetails>
        </template>
        
        <template 
            v-if="serviceStore.requestParams"
            #content 
        >
            <ModalsControlForm 
                @success="(data) => dumpStore.updateItem(item.id, data)"
                :name="'Обновление ' + serviceStore.tableMode === 'accounts' ? 'аккаунта' : 'штриха'"
                :model="serviceStore.tableMode.charAt(0).toUpperCase() + serviceStore.tableMode.slice(1)"
                :with-categories="true"
                :api="api"
                :call="call"
                v-model:data="data"
                :helper="serviceHelper"
                :params="serviceHelper?.serviceParams"
                :get-params="serviceHelper?.getUpdateParams"
                :styles="{ 
                    marginRight: '0px',
                    paddingTop: '10px',
                    gap: '0px'
                }"
                :bottom-styles="{
                    padding: '10px 20px',
                    borderTop: '1px solid var(--secondary-color)'
                }"
            >
                <template #disabled-fields>
                    <ModalsControlCategory
                        name="Данные"
                        v-model:enable="fieldsEnabled"
                    >
                        <ModalsControlField 
                            v-for="key in formFields" 
                            :key="key"
                            :_key="key"
                            _key-category="Основные"
                            :disabled="true"
                            :params="props.item[key]"
                            v-model:model="item[key]"
                            v-model:error="error"
                        />
                    </ModalsControlCategory>
                </template>

                <template #bottom-left>
                    <ModalsCardButton 
                        mdiIcon="mdi-trash-can-outline"
                        textColor="var(--delete-color)"
                        hoverTextColor="var(--inversion-color)"
                        backgroundColor="var(--delete-color-rgb)"
                        @click="deleteItem"
                    >
                        Удалить
                    </ModalsCardButton>
                </template>
            </ModalsControlForm>
        </template>

        <template #params v-else>
            <ModalsControlCategory
                name="Данные"
                v-model:enable="fieldsEnabled"
            >
                <ModalsControlField 
                    v-for="key in formFields" 
                    :key="key"
                    :_key="key"
                    _key-category="Основные"
                    :disabled="true"
                    :params="props.item[key]"
                    v-model:model="item[key]"
                    v-model:error="error"
                />
            </ModalsControlCategory>
        </template>

        <template 
            v-if="!serviceStore.requestParams"
            #footer
        >
            <ModalsControlFooter 
                :styles="{
                    padding: '10px 20px',
                    borderTop: '1px solid var(--secondary-color)'
                }"
                :buttons="false"
                @close="emit('close')"
            >   
                <template #bottom-left>
                    <ModalsCardButton 
                        mdiIcon="mdi-trash-can-outline"
                        textColor="var(--delete-color)"
                        hoverTextColor="var(--inversion-color)"
                        backgroundColor="var(--delete-color-rgb)"
                        @click="deleteItem"
                    >
                        Удалить
                    </ModalsCardButton>
                </template>
            </ModalsControlFooter>
        </template>
    </ModalsCardContainer>
</template>

<style scoped>
    .params {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>