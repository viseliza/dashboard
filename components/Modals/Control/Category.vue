<script setup lang="ts">
    type Props = {
        name: string;
    }
    const props = defineProps<Props>();
    const enable = defineModel<boolean>('enable');
    
    const description = computed(() => ({
        'Обновление данных': 'Поля для обновления данных',
        'Авторизация': 'Данные для входа на прокси',
        'Обновление': 'Периодичность обновления прокси',
        'Данные': 'Основные параметры объекта',
    }));
    
    const titles = computed(() => ([
        'Обновление данных',
        'Авторизация',
        'Обновление',
        'Данные',
    ]));

    const show = computed(() => {
        return titles.value.includes(props.name) ? enable.value : true;
    });
</script>

<template>
    <div class="category">
        <div 
            v-if="titles.includes(props.name)"
            class="checkfield"
        >
            <div class="left">
                <span class="title">
                    {{ name }}
                </span>
                <span class="description">
                    {{ description[name as keyof typeof description] }}
                </span>
            </div>

            <div class="right">
                <ModalsControlManyCheckbox 
                    :name="name" 
                    :scale="1.3"
                    v-model="enable"
                />
            </div>
        </div>


        <div 
            class="content" 
            :class="{ 'show': show }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .category {
        position: relative;
        display: flex;
        margin-right: 5px;
        flex-direction: column;
        padding-bottom: 5px;
        gap: 10px;
    }
    .category:not(:first-child) {
        padding-top: 20px;
    }
    .category:not(:first-child)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--secondary-color);
    }
    .category .checkfield {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .category .checkfield .left {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .category .checkfield .left .title {
        font-size: 14px;
        font-weight: 700;
    }
    .category .checkfield .left .description {
        font-size: 14px;
        color: var(--text-secondary);
    }
    .category .checkfield .right {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .category .content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 100%;
        max-height: 0px;
        background-color: var(--inversion-color);
        overflow: hidden;
        transition: max-height 0.3s linear;
    }
    .category .content.show {
        max-height: 100%;
    }
</style>