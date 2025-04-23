<script setup lang="ts">
    import { iconsDictionary } from '~/utils';

    const props = defineProps<{
        _key: string;
        params: any;
        error: boolean;
        _keyCategory?: string;
        marginRight?: boolean;
        disabled?: boolean;
    }>();
    const model = defineModel<any>('model');
    const error = defineModel<boolean>('error');

    /** Иконка для поля */
    const icon = iconsDictionary[props._key as keyof typeof iconsDictionary] || {
        'type': 'mdi',
        'icon': 'mdi-code-braces'
    };

    /** Вычисляемое значение для названия поля, которое ставит первую букву заглавной  и убирает нижнее подчеркивание*/
    const computedTitle = computed(() => {
        return props._key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    });

    /** При изменении модели проверяется на число и если не число, то заменяется на число */
    if (props.params.type === 'number') {;
        watch(model, (value) => {
            model.value = Number(value ? value.toString().replace(/[^\d-]/g, '') : '0' );
        })
    }

    watch(model, (value) => {
        if (error.value && value !== '') {
            error.value = false;
        }
    });
</script>

<template>
    <div class="field-container" :style="{ marginRight: props.marginRight ? '5px' : '0' }">
        <div class="field-container-title">
            <BaseIcon :name="_key" :styles="{
                'width': '20px',
                'height': '20px',
            }"/>

            <div class="field-container-title-text">
                <span :style="{ opacity: .4 }">
                    {{ computedTitle }}
                </span>

                <span v-if="params.required" class="required-field">*</span>
            </div>
        </div>

        <div v-if="!Array.isArray(params.type)" class="field-container-input">
            <textarea
                v-if="params.type === 'object'"
                :disabled="props.disabled"
                :class="{ 'error-input': error }"
                v-model="model"
                :placeholder="params.example"
            />

            <input 
                v-else
                :class="{ 
                    'error-input': error,
                    'disabled-input': props.disabled
                }"
                :disabled="props.disabled"
                type="text" 
                v-model="model"
                :placeholder="params.example"
            />
        </div>

        <div v-else class="field-container-checkbox">
            <ModalsControlCheckBox 
                v-for="item in params.type"
                :key="item"
                :disabled="props.disabled"
                :_key="props._key + _keyCategory"
                :item="item"
                v-model="model"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .field-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .field-container:last-child {
        margin-bottom: 15px;
    }
    .field-container-title {
        display: flex;
        align-items: center;
        min-width: 35%;
        gap: 15px;
    }
    .field-container-title .v-icon,
    .field-container-title .fa {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
    }
    .field-container-title .v-icon {
        filter: invert(72%) sepia(2%) saturate(1046%) hue-rotate(182deg) brightness(102%) contrast(87%);
        font-size: 20px;
    }
    .field-container-title svg {
        font-size: 16px;
        filter: invert(72%) sepia(2%) saturate(1046%) hue-rotate(182deg) brightness(102%) contrast(87%);
    }
    .field-container-title-text {
        display: flex;
        align-items: center;
        position: relative;
    }
    .field-container-title-text span {
        font-weight: 700;
    }
    .field-container-title .required-field {
        position: absolute;
        right: -10px;
        top: 0;
        font-size: 12px;
        color: red;
    }
    .field-container-input {
        flex: 1 1 auto;
    }
    .field-container-input input::-webkit-input-placeholder {
        color: var(--active-color);
    }
    .field-container-input .error-input {
        border-color: red;
    }
    .field-container-input .error-input input::-webkit-input-placeholder {
        color: red;
    }
    .field-container-input .disabled-input {
        color: var(--text-secondary);
    }
    .field-container-input input {
        outline: none;
        font-weight: 700;
        font-size: 12px;
        caret-color: var(--active-color);
        caret-shape:bar;
        border-radius: 5px;
        border: 1px solid var(--secondary-color);
        padding: 8px 10px;
        width: 100%;
        transition: all 0.3s ease-in-out;
    }
    .field-container-input input:focus {
        border-color: var(--active-color);
    }

    .field-container-checkbox {
        flex: 1 1 auto;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 10px;
    }
    textarea {
        border-radius: 5px;
        width: 100%;
        resize: none;
        border: 1px solid var(--secondary-color);
        outline: none;
        font-weight: 700;
        padding: 8px 10px;
        font-size: 12px;
        caret-color: var(--active-color);
        transition: all 0.3s ease-in-out;
    }
    textarea:focus {
        border-color: var(--active-color);
    }
</style>
