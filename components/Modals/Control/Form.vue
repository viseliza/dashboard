<script setup lang="ts">
    import { Tokens } from '~/models';

    type Props = {
        api: any;
        params: Record<string, any>;
        call: any;
        withCategories?: boolean;
        getParams?: (data: any) => { id: string, body: any };
        styles?: Record<string, any>;
        helper?: any;
    }
    const props = defineProps<Props>();
    const showModal = defineModel<boolean>('showModal');
    const data = defineModel<any>('data');
    
    const toggle = shallowRef<boolean>(false);
    const loading = shallowRef<boolean>(false);

    /** Реактивный объект со всеми моделями для формы */
    const models = reactive<{ [key: string]: any }>(
        Object.entries(props.params).reduce((params: any, [key, value]) => {
            if (props.withCategories) {
                params[key] = {};
                Object.keys(value).forEach((_key: any) => {
                    params[key][_key] = {
                        value: value[_key].value,
                        error: false,
                    };
                });
            } else {
                params[key] = {
                    value: value.value,
                    error: false,
                };
            }
            return params;
        }, {})
    );

    const submit = async () => {
        loading.value = true;
        let error = false;

        Object.keys(models).forEach((key) => {
            if (props.withCategories) {
                Object.keys(models[key]).forEach((_key: any) => {
                    if (models[key][_key].value === '' && props.params[key][_key].required) {
                        models[key][_key].error = true;
                        error = true;
                    }
                });
            } else {
                if (models[key].value == '' && props.params[key].required) {
                    models[key].error = true;
                    error = true;
                }
            }
        });
        
        if (error) {
            loading.value = false;
            return;
        }

        const convertedData = props.getParams 
            ? props.getParams.apply(props.helper, [models]) 
            : Object.entries(models).reduce((params: any, [key, value]) => {
                params[key] = models[key].value;
                return params;
            }, {});

        data.value = await props.api.privateCall(
            props.call,
            convertedData,
            Tokens.getTokens()
        )

        loading.value = false;
        showModal.value = false;
    }

    watch(toggle, (value) => {
        if (value) {
            if (props.withCategories) {
                Object.keys(props.params).forEach((key) => {
                    Object.keys(props.params[key]).forEach((_key: any) => {
                        models[key][_key].value = props.params[key][_key].example;
                    });
                });
            } else {
                Object.keys(props.params).forEach((key) => {
                    models[key].value = props.params[key].example;
                });
            }
        } else {
            if (props.withCategories) {
                Object.keys(props.params).forEach((key) => {
                    Object.keys(props.params[key]).forEach((_key: any) => {
                        if (_key === 'enable') {
                            models[key][_key].value = false;
                            return;
                        }
                        models[key][_key].value = '';
                    });
                });
            } else {
                Object.keys(models).forEach((key) => {
                    models[key].value = '';
                });
            }
        }
    });

    const filteredKeys = (key: string, data: any) => {
        return Object.keys(data).filter((_key) => {
            if (_key === 'enable' && key !== 'Основные') return;
            return _key;
        });
    }
</script>

<template>
    <form @submit.prevent="submit">
        <div 
            v-if="!props.withCategories"
            class="form-container"
            :style="props.styles"
        >
            <ModalsControlField 
                v-for="param in Object.keys(props.params)" 
                :key="param" 
                :_key="param"
                :marginRight="true"
                :params="props.params[param]"
                v-model:model="models[param].value"
                v-model:error="models[param].error"
            />
        </div>

        <div 
            v-else
            class="form-container"
            :style="props.styles"
        >
            <ModalsControlCategory
                v-for="key in Object.keys(props.params)"
                :key="key"
                :name="key"
                v-model:enable="models[key].enable.value"
            >
                <ModalsControlField 
                    v-for="param in filteredKeys(key, props.params[key])" 
                    :key="param"
                    :_key="param"
                    :_key-category="key"
                    :params="props.params[key][param]"
                    v-model:model="models[key][param].value"
                    v-model:error="models[key][param].error"
                />
            </ModalsControlCategory>
        </div>

        <div class="form-container-bottom">
            <ModalsControlToggle v-model="toggle" />

            <div class="buttons-container">
                <button 
                    @click="showModal = false"
                    class="cancel-button"
                >
                    Отмена
                </button>

                <button 
                    type="submit"
                    class="save-button"
                >
                    Сохранить
                </button>
            </div>
        </div>
        
        <transition mode="default" name="fade">
            <DashboardLoading :loading="loading" />
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
        padding-right: 15px;
        background-color: var(--inversion-color);
        flex: 1 1 auto; 
        margin-right: 5px;
        overflow-y: auto;
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s linear;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>