<script lang="ts" setup>
    import { ProxyAPI } from '~/api';
    import { Tokens } from '~/models';
    import { useLoader } from '~/store';

    type Props = {
        api: any;
        params: Record<string, any>;
        call: any;
        getParams?: (data: any) => { id: string, body: any };
        styles?: Record<string, any>;
        helper?: any;
        name: string;
        model: string;
    }
    type Checkboxes = {
        auth: boolean;
        update: boolean;
    }

    const props = defineProps<Props>();
    const showModal = defineModel<boolean>('showModal');
    const api = new ProxyAPI('');
    const tokens = new Tokens(Tokens.getTokens());

    const checkboxes = reactive<Checkboxes>({
        auth: false,
        update: false,
    });

    const template = computed(() => {
        let template = 'HOST:PORT';
        template += checkboxes.auth ? ':USERNAME:PASSWORD' : '';
        template += checkboxes.update ? ':LINK:SECONDS' : '';
        return template;
    });
    
    const data = ref<any>([{
        value: template.value,
        auth: checkboxes.auth,
        update: checkboxes.update,
        error: false
    }]);
    const loading = useLoader();
    const currentIndex = shallowRef<number>(0);

    const toggleDefault = shallowRef<boolean>(false);
    const isSelect = shallowRef<boolean>(false);
    const showNotification = shallowRef<boolean>(false);

    const submit = async () => {
        let params = [];
        for (const item of data.value) {
            params.push(convertToParams(item, template.value));
        }
        
        loading.startLoading(
            params,
            props.name,
            props.model
        );

        try {
            const response = await api.createMany({ data: params }, tokens.access_token);

            loading.setResult(
                'success', 
                'Данные успешно сохранены', 
                response
            );
        } catch (error) {
            loading.setResult(
                'fail', 
                'Ошибка при создании прокси', 
                error
            );
        }
        showNotification.value = true;
    }

    const convertToParams = (prevData: any, templateData: string) => {
        const splited = prevData.value.split(':').map((item: string) => item.trim());
        const templateSplited = templateData.split(':');

        const params: Record<string, any> = {
            host: splited[0],
            port: Number(splited[1]),
            checkInternet: true,
            enable: true,
            mode: 'refresher',
            type: 'socks5'
        };
        const indexOf = (key: string) => templateSplited.indexOf(key);

        Object.keys(prevData).filter((key: string) => key !== 'value' && key !== 'error').forEach((key: string) => {
            const enable = prevData[key as keyof Checkboxes];
            params[key] = { enable }
            params[key][key === 'auth' ? 'username' : 'link'] = enable
                ? splited[indexOf(key === 'auth' ? 'USERNAME' : 'LINK')] 
                : null;
            params[key][key === 'auth' ? 'password' : 'seconds'] = enable 
                ? splited[indexOf(key === 'auth' ? 'PASSWORD' : 'SECONDS')] 
                : null;
            if (key === 'update' && splited[indexOf('SECONDS')]) {
                params[key].seconds = Number(splited[indexOf('SECONDS')]);
            }
        });
        
        return params;
    }

    const codeParams = computed(() => {
        if (data.value[currentIndex.value].error) return {};

        return convertToParams(
            data.value[currentIndex.value], 
            template.value
        );
    });

    function stringfy(key: string, value: any) {
        return value === null ? null : value;
    }

    watch(toggleDefault, (value) => {
        if (value) data.value[currentIndex.value].value = template.value;
    });

    watch(checkboxes, (value) => {
        if (!isSelect.value) {
            data.value[currentIndex.value].value = template.value;
            data.value[currentIndex.value].auth = checkboxes.auth;
            data.value[currentIndex.value].update = checkboxes.update;
        }
        isSelect.value = false;
    });

    const removeItem = (index: number) => {
        if (data.value.length > 1) {
            if (currentIndex.value === index) currentIndex.value = index - 1;
            data.value?.splice(index, 1);
        }
    }

    const selectItem = (index: number) => {
        currentIndex.value = index;
        isSelect.value = true;
        checkboxes.auth = data.value[currentIndex.value].auth;
        isSelect.value = true;
        checkboxes.update = data.value[currentIndex.value].update;
    }
</script>

<template>
    <form @submit.prevent="submit">
        <div 
            class="form-container"
            :style="props.styles"
        >
            <ModalsControlManyContent
                :checkboxes="checkboxes"
                :toggle="toggleDefault"
                v-model:model="data[currentIndex].value"
                v-model:template="template"
                @error="(value) => data[currentIndex].error = value"
            />

            <div class="code-container">
                <span class="code-container-title">Предварительный просмотр</span>

                <BaseCode
                    :styles="{
                        fontSize: '12px'
                    }"
                    isExpandable
                    :stringfy="stringfy"
                    :data="codeParams"
                />
            </div>

            <ModalsControlManyArray 
                @add="() => selectItem(data.length - 1)"
                v-model:model="data"
            >
                <ModalsControlManyItem
                    v-for="(item, index) in data"
                    :key="item"
                    :model="item.value"
                    :index="index"
                    :active="currentIndex === index"
                    :error="item.error"
                    @select="selectItem"
                    @remove="removeItem"
                />
            </ModalsControlManyArray>
        </div>        

        <div class="form-container-bottom">
            <ModalsControlToggle v-model="toggleDefault" />

            <div class="buttons-container">
                <button 
                    @click="showModal = false"
                    class="cancel-button"
                >
                    Отмена
                </button>

                <button 
                    :disabled="data[currentIndex].error"
                    type="submit"
                    class="save-button"
                >
                    Сохранить
                </button>
            </div>
        </div>
        
        <transition mode="default" name="fade"> 
            <Teleport 
                v-if="showNotification" 
                to='#notification'
        >
                <BaseNotification 
                    detail="Обновление данных"
                    message="На данной странице данные не обновляются. Чтобы посмотреть изменения - обновите страницу."
                    :code="101" 
                    @close="showNotification = false"
                />
            </Teleport>
        </transition>
    </form>
</template>

<style scoped lang="scss">
    form {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        height: 100%;
    }
    form .form-container {
        display: flex;
        flex-direction: column;
        border-radius: 0 0 10px 10px;
        gap: 10px;
        padding: 20px;
        background-color: var(--inversion-color);
        flex: 1 1 auto; 
        overflow-y: auto;
    }
    form .form-container .top-container .title {
        font-size: 12px;
        font-weight: 700;
    }
    form .form-container .code-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 5px;
    }
    form .form-container .code-container .code-container-title {
        font-size: 12px;
        font-weight: 700;
    }

    form .form-container-bottom {
        display: flex;
        justify-content: space-between;
        padding: 15px 0px 0;
    }
    form .form-container-bottom .buttons-container {
        display: flex;
        gap: 10px;
    }
    form .form-container-bottom .buttons-container button {
        padding: 7px 16px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 5px;
    }
    form .form-container-bottom .buttons-container .cancel-button {
        outline: 1px solid var(--text-secondary);
    }
    form .form-container-bottom .buttons-container .save-button {
        background-color: var(--text-primary);
        color: var(--inversion-color);
    }
    form .form-container-bottom .buttons-container .save-button:disabled {
        background-color: var(--text-secondary);
        color: var(--inversion-color);
        cursor: default;
    }
    form .form-container .form-category::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--secondary-color);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s linear;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>