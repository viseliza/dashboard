<script lang="ts" setup>
    const props = defineProps<{
        item: string;
        rule: string;
        field: string | number | undefined;
        styles?: Record<string, string>;
        tooltipStyles?: Record<string, string>;
        top?: string;
    }>();
    const model = defineModel<boolean>();

    const translate = computed(() => ({
        'host': 'Хост',
        'port': 'Порт',
        'username': 'Логин',
        'password': 'Пароль',
        'link': 'Ссылка',
        'seconds': 'Секунды',
    }));

    const types = computed(() => ({
        'string': 'строка',
        'number': 'число',
    }));

    const top = computed(() => {
        if (props.top) return props.top;
        return '8px';
    });

    const validate = () => {
        if (model.value && props.field === undefined) model.value = false;
        else if (!model.value && props.field !== undefined) model.value = true;

        if (props.rule === 'number') {
            if (isNaN(Number(props.field)) || !props.field) model.value = false;
            else model.value = true;
        }
    };
    validate();

    watch(() => props.field, (value) => {
        validate();
    });
</script>

<template>
    <div class="checkbox-container">
        <input 
            :id="'check' + item" 
            type="checkbox"
            v-model="model"
            :disabled="true"
            :true-value="true"
            :false-value="false"
            :style="styles"
        >
        <label 
            :for="'check' + item"
            :style="{ ...styles, 'flex': tooltipStyles ? '1 1 auto' : '1' }"
        >
            <div 
                class="tooltip-text text"
                :style="{ ...tooltipStyles, ...styles }"
            >
                {{ translate[item as keyof typeof translate] || item }}
            </div>
            <div 
                class="tooltip-text type"
                :style="styles"
            >
                (тип: {{ types[rule as keyof typeof types] }})
            </div>
        </label>
    </div>
</template>

<style scoped lang="scss">
    .checkbox-container {
        display: flex;
        width: 100%;
        position: relative;
    }
    .tooltip-text.text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    label {
        position: relative;
        cursor: pointer;
        gap: 10px;
        display: flex;
        font-weight: 700;
        align-items: center;
        width: fit-content;
        transition: color .3s ease;

        &::before,
        &::after {
            content: "";
            position: absolute;
        }
        &::before {
            height: 2px;
            width: 8px;
            left: -27px;
            background: var(--inversion-color);
            border-radius: 2px;
            transition: background .3s ease;
        }
        &:after {
            height: 4px;
            width: 4px;
            top: v-bind(top);
            left: -25px;
            border-radius: 50%;
        }
    }
    input[type="checkbox"] {
        display: flex;
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;
        height: 16px;
        width: 16px;
        outline: none;
        border: 0;
        margin: 0 16px 0 0;
        cursor: pointer;
        background: var(--active-color);
        display: grid;
        align-items: center;
        &::before,
        &::after {
            content: "";
            position: absolute;
            height: 2px;
            top: auto;
            background: var(--inversion-color);
            border-radius: 2px;
        }
        &::before {
            width: 0px;
            right: 60%;
            transform-origin: right bottom;
        }
        &::after {
            width: 0px;
            left: 40%;
            transform-origin: left bottom;
        }
        &:checked {
            &::before {
                animation: check-01 .4s ease forwards;
            }
            &::after {
                animation: check-02 .4s ease forwards;
            }
            +label {
                color: var(--inversion-color);
                animation: move .3s ease .1s forwards;
                &::before {
                    background: var(--secondary-color);
                    animation: slice .4s ease forwards;
                }
                &::after {
                    animation: firework .5s ease forwards .1s;
                }
            }
        }
    }
    @keyframes move {
        50% {
            padding-left: 8px;
            padding-right: 0px;
        }
        100% {
            padding-right: 4px;
        }
    }
    @keyframes slice {
        60% {
            width: auto;
            left: 4px;
        }
        100% {
            width: 100%;
            left: -2px;
            padding-left: 0;
        }
    }
    @keyframes check-01 {
        0% {
            width: 4px;
            top: auto;
            transform: rotate(0);
        }
        50% {
            width: 0px;
            top: auto;
            transform: rotate(0);
        }
        51% {
            width: 0px;
            top: v-bind(top);
            transform: rotate(45deg);
        }
        100% {
            width: 5px;
            top: v-bind(top);
            transform: rotate(45deg);
        }
    }
    @keyframes check-02 {
        0% {
            width: 4px;
            top: auto;
            transform: rotate(0);
        }
        50% {
            width: 0px;
            top: auto;
            transform: rotate(0);
        }
        51% {
            width: 0px;
            top: v-bind(top);
            transform: rotate(-45deg);
        }
        100% {
            width: 10px;
            top: v-bind(top);
            transform: rotate(-45deg);
        }
    }
    @keyframes firework {
        0% {
            opacity: 1;
            box-shadow: 0 0 0 -2px var(--secondary-color), 0 0 0 -2px var(--secondary-color), 0 0 0 -2px var(--secondary-color), 0 0 0 -2px var(--secondary-color), 0 0 0 -2px var(--secondary-color), 0 0 0 -2px var(--secondary-color);
        }
        30% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            box-shadow: 0 -15px 0 0px var(--secondary-color), 14px -8px 0 0px var(--secondary-color), 14px 8px 0 0px var(--secondary-color), 0 15px 0 0px var(--secondary-color), -14px 8px 0 0px var(--secondary-color), -14px -8px 0 0px var(--secondary-color);
        }
    }
</style>