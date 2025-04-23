<script setup lang="ts">
    import { Tokens } from '~/models';
    import { useLoader } from '~/store';
    type Props = {
        api: any;
        params: Record<string, any>;
        call: any;
        withCategories?: boolean;
        getParams?: (data: any) => any;
        styles?: Record<string, any>;
        bottomStyles?: Record<string, any>;
        helper?: any;
        name: string;
        model: string;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close', 'success']);
    const data = defineModel<any>('data');
    
    const loaderStore = useLoader();
    const toggle = shallowRef<boolean>(false);

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
        loaderStore.startLoading(
            props.getParams 
                ? props.getParams.apply(props.helper, [models]) 
                : Object.entries(models).reduce((params: any, [key, value]) => {
                    const _value = models[key].value
                    params[key] = _value === undefined ? null : _value;
                    return params;
                }, {}),
            props.name,
            props.model
        );
        const error: any = {};

        Object.keys(models).forEach((key) => {
            if (props.withCategories) {
                Object.keys(models[key]).forEach((_key: any) => {
                    if (models[key][_key].value === '' && props.params[key][_key].required) {
                        models[key][_key].error = true;
                        error[_key] = true;
                    }
                });
            } else {
                if ((!models[key].value && (models[key].value !== false || models[key].value !== 0))  && props.params[key].required) {
                    models[key].error = true;
                    error[key] = true;
                }
            }
        });
        
        if (Object.keys(error).length > 0) {
            const errorDetails = {
                details: {
                    type: 'missing',
                    loc: Object.keys(error),
                }
            }
            loaderStore.setResult(
                'fail',
                'Были заполнены не все обязательные поля, они помечены звездочкой',
                errorDetails
            );
            return;
        }

        const convertedData = props.getParams 
            ? props.getParams.apply(props.helper, [models]) 
            : Object.entries(models).reduce((params: any, [key, value]) => {
                params[key] = models[key].value;
                return params;
            }, {});

        try { 
            data.value = await props.call(convertedData, Tokens.getTokens().access_token);
        } catch (e) {
            loaderStore.setResult(
                'fail', 
                'Произошла какая-то ошибка, проверьте данные и попробуйте еще раз',
                JSON.parse(JSON.stringify(e))
            );
            return;
        }

        loaderStore.setResult(
            'success', 
            'Данные успешно сохранены',
            data.value
        );
        emit('success', convertedData);
        emit('close');
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
            v-if="!withCategories"
            class="form-container"
            :style="{ ...styles }"
        >
            <ModalsControlField 
                v-for="param in Object.keys(props.params)" 
                :key="param" 
                :_key="param"
                :marginRight="!styles?.marginRight"
                :params="props.params[param]"
                v-model:model="models[param].value"
                v-model:error="models[param].error"
            />

            <slot name="disabled-fields" />
        </div>

        <div 
            v-else
            class="form-container"
            :style="{ ...styles }"
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
            
            <slot name="disabled-fields" />
        </div>

        <ModalsControlFooter 
            :styles="bottomStyles"
            @close="emit('close')"
        >   
            <template #bottom-left>
                <slot name="bottom-left" />
            </template>
        </ModalsControlFooter>
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
</style>