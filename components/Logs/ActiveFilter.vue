<script setup lang="ts">
    defineProps<{
        _key: string;
        value: string | number;
        queryParams: QueryParams;
    }>();

    const isHover = shallowRef(false);

    const translateKey: any = {
        'log_type': 'Тип лога',
        'order': 'Порядок',
        'action': 'Действие',
        'limit': 'Лимит',
        'offset': 'Сдвиг',
        'asc': 'По возрастанию',
        'desc': 'По убыванию',
    }
</script>


<template>
    <button 
        @click="queryParams.updateQueries({ [_key]: undefined })" 
        class="active-filter"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
    >
        <span>
            {{ 
                typeof value === 'string' && translateKey[value.toLowerCase()] 
                    ? translateKey[value.toLowerCase()] 
                    : value 
            }}
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
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        min-width: 100px;
        padding: 4px 12px;
        border: 2px solid var(--active-color);
        border-radius: 25px;
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
        z-index: 100;
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