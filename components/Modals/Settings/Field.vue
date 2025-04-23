<script setup lang="ts">
    import type { Setting } from '~/models';

    const props = defineProps<{
        setting: Setting;
        oldValue: string;
    }>();
    const changed = defineModel<any[]>('changed');
    const showValue = shallowRef(true);
    const focus = shallowRef(false);
    
    const key = computed(() => props.setting.key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').replace('Pigfarm Market', '')); 
    const type = computed(() => {
        if (props.setting.type === 'string') {
            return {
                type: 'mdi',
                icon: 'mdi-alphabetical-variant'
            }
        }
        else if (props.setting.type === 'number')
            return {
                type: 'mdi',
                icon: 'mdi-numeric'
            }
        else if (props.setting.type === 'crontab')
            return {
                type: 'text',
                icon: 'cron'
            }
    });

    const isEqualCheck = () => {
        const findResult = find();
        const isEqual = (props.setting.value ?? '') == (props.oldValue ?? '');

        if (!isEqual && !findResult) {
            changed.value?.push({
                key: props.setting.key,
                value: props.setting.type === 'number' ? Number(props.setting.value) : props.setting.value,
            });
        } else if (!isEqual && findResult && changed.value?.length) {
            const index = changed.value?.findIndex((item: any) => item.key === props.setting.key) ?? 0;
            changed.value[index].value = props.setting.type === 'number' ? Number(props.setting.value) : props.setting.value;
        } else if (isEqual && findResult) {
            const index = changed.value?.findIndex((item: any) => item.key === props.setting.key) ?? 0;
            changed.value?.splice(index, 1);
        }
    };

    const find = () => changed.value?.find((item: any) => item.key === props.setting.key);

    /** При изменении модели проверяется на число и если не число, то заменяется на число */
    if (props.setting.type === 'number') {
        watch(() => props.setting.value, (value) => {
            if (value && !/^\d+$/.test(value as string)) {
                props.setting.value = (value as string).replace(/[^\d]/g, '');
            }
        })
    }
</script>

<template>
    <div class="field-container">
        <div class="field-header">
            <span class="field-key">{{ key }}</span>

            <TooltipsTextContent>
                <template #pretext>
                    {{ setting.title }}
                </template>
            </TooltipsTextContent>
        </div>
        
        <div 
            class="field-container-input" 
            :class="[{ 'focus': focus }, { 'not-equal': find() }]"
        >
            <input
                :type="setting.secret ? (showValue ? 'password' : 'text') : 'text'" 
                @focus="focus = true"
                @blur="focus = false"
                v-model="setting.value"
                @input="isEqualCheck"
                placeholder="Введите значение"
            />

            <button 
                v-if="setting.secret"
                class="input-button"
                :class="{ 'icon-active': !showValue }"
                @click.prevent="showValue = !showValue"
            >
                <v-icon>
                    {{ showValue ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
            </button>

            <TooltipsFieldContainer 
                :active="focus"
                :styles="{ 
                    'top': '40px',
                    'padding': '10px'
                }"
            >
                <TooltipsFieldCheckbox 
                    :item="key"
                    :rule="setting.type"
                    :field="setting.value"
                    top="10px"
                    :styles="{ 
                        'fontSize': '12px'
                    }"
                    :tooltipStyles="{
                        'width': 'auto',
                        'maxWidth': 'calc(100% - 90px)'
                    }"
                />
            </TooltipsFieldContainer>
        </div>
    </div>
</template> 

<style scoped lang="scss">
    .field-container {
        flex: 1 1 calc(50% - 10px);
        max-width: calc(50% - 10px);
        display: flex;
        flex-direction: column;
        align-self: flex-start;
    }
    .field-header {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        position: relative;
    }
    .field-key {
        font-weight: 700;
    }
    .field-container-input {
        margin-top: 10px;
        z-index: 13;
        position: relative;
        outline: 2px solid var(--secondary-color);
        transition: all 0.3s linear;
        border-radius: 5px;
    }
    .field-container-input.focus {
        outline-color: var(--active-color);
    }
    .field-container-input.not-equal {
        outline-color: var(--active-color);
    }
    .field-container-input .input-type {
        position: absolute;
        top: 0;
        left: 0;
        width: 45px;
        font-size: 14px;
        color: var(--text-secondary);
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px 0 0 3px;
        height: 100%;
    }
    .field-container-input input {
        border: none;
        font-weight: 500;
        font-size: 14px;
        caret-color: var(--active-color);
        caret-shape:bar;
        padding: 6px 10px;
        transition: all 0.3s linear;
        width: calc(100% - 70px);
    }
    .field-container-input input:focus-visible {
        outline: none;
    }
    .field-container-input .input-button {
        position: absolute;
        right: 0px;
        bottom: -5px;
        opacity: 1;
        transition: all 0.3s ease;
    }
</style>