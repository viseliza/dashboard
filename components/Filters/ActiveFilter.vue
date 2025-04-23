<script setup lang="ts">
    const props = defineProps<{
        _key: string;
        value: string | number;
    }>();
    
    const isHover = shallowRef(false);

    const translateKey: any = {
        'time': 'Время',
        'service': 'Сервис',
        'log_type': 'Тип лога',
        'order': 'Порядок',
        'action': 'Действие',
        'limit': 'Лимит',
        'offset': 'Сдвиг',
        'asc': 'По возрастанию',
        'desc': 'По убыванию',
        'day': 'День',
        'weak': 'Неделя',
        'month': 'Месяц',
        'year': 'Год'
    }

    const displayValue = computed(() => {
        return typeof props.value === 'string' && translateKey[props.value.toLowerCase()] 
            ? translateKey[props.value.toLowerCase()] 
            : props.value;
    });
</script>

<template>
    <button 
        @click="QueryParams.removeQuery(props._key)" 
        class="active-filter"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
    >
        <span>
            {{ displayValue }}
        </span>

        <transition mode="default" name="fade">
            <div v-if="isHover" class="active-filter__close">
                <v-icon icon="mdi-close"/>
            </div>
        </transition>

        <span class="active-filter__key">{{ translateKey[_key as keyof typeof translateKey] || _key }}</span>
    </button>
</template>

<style scoped>
    .active-filter {
        margin-bottom: 10px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        min-width: 100px;
        padding: 4px 12px;
        border: 2px solid var(--active-color);
        border-radius: 12px;
        transition: all 0.3s linear;
    }
    .active-filter:hover {
        border-color: var(--delete-color);
    }
    .active-filter span {
        flex: 1 1 auto;
        display: flex;
        margin-right: 20px;
    }
    .active-filter__key {
        position: absolute;
        top: -12px;
        left: 12px;
        background-color: var(--inversion-color);
        z-index: 0;
        font-size: 12px;
        color: var(--active-color);
        font-weight: 700;
        transition: all 0.3s linear;
    }
    .active-filter__close {
        position: absolute;
        top: 6px;
        right: 6px;
        color: var(--delete-color);
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .active-filter:hover .active-filter__key {
        color: var(--delete-color);
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