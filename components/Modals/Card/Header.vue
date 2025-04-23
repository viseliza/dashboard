<script setup lang="ts">
    import { useServiceStore } from '~/store';
    type Props = {
        id: string;
        enabled: string;
        status: boolean;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close']);
    const serviceStore = useServiceStore();

    const icons = computed(() => ({
        'accounts': 'mdi-account',
        'streaks': 'mdi-barcode',
        'relink': 'mdi-link-edit',
        'refresh': 'mdi-refresh'
    }) as any);

    const translateKey = computed(() => ({
        'accounts': 'Аккаунт',
        'streaks': 'Штрих',
        'enable': 'Включен',
        'opened': 'Открыт',
        'relink': 'Обновление ссылки',
        'refresh': 'Обновление данных'
    }) as any);

    const backgroundColor = computed(() => ({
        'true': 'rgba(var(--accept-color-rgb), .1)',
        'false': 'rgba(var(--delete-color-rgb), .1)',
    }));

    const borderColor = computed(() => ({
        'true': 'rgba(var(--accept-color-rgb), .7)',
        'false': 'rgba(var(--delete-color-rgb), .7)',
    }));

    const actions = computed(() => {
        const actions = [];
        if (serviceStore.isRelink) actions.push('relink');
        if (serviceStore.isRefresh) actions.push('refresh');
        return actions;
    });
</script>

<template>
    <header>
        <div class="top">
            <div class="wrapper"></div>

            <div class="mode-container">
                <v-icon :icon="icons[serviceStore.tableMode]"/>
            </div>

            <div class="actions-container">
                <ModalsCardAction 
                    v-for="action in actions"
                    :key="action"
                    :type="action"
                    :id="id"
                    :icon="icons[action]" 
                    :title="translateKey[action]"
                />
            </div>
        </div>

        <div class="title-container">
            <h2>
                {{ translateKey[serviceStore.tableMode] }}

                <div 
                    v-if="enabled" 
                    class="enabled-container"
                    :style="{
                        backgroundColor: backgroundColor[status.toString() as 'true' | 'false'],
                        borderColor: borderColor[status.toString() as 'true' | 'false'],
                        color: borderColor[status.toString() as 'true' | 'false'],
                    }"
                >
                    <div 
                        class="enabled-status" 
                        :class="{ 'enabled': status }"
                        :style="{
                            backgroundColor: borderColor[status.toString() as 'true' | 'false'],
                        }"
                    ></div>

                    {{ translateKey[enabled as 'enable' | 'opened'] }}
                </div>
            </h2>
            <h3>
                {{ id }}
            </h3>
        </div>

        <button @click="emit('close')" class="close-button">
            <v-icon>mdi-close</v-icon>
        </button>
    </header>
</template>

<style scoped>
    header {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    header .close-button {
        position: absolute;
        z-index: 14;
        top: 10px;
        right: 10px;
        transition: color 0.3s ease;
    }
    header .close-button:hover {
        color: var(--delete-color);
    }
    header .top {
        padding: 20px;
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    header .top .wrapper {
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        border-radius: 18px 18px 0 0;
    }
    header .top .wrapper::after,
    header .top .wrapper::before {
        content: "";
        position: absolute;
        bottom: 0px;
        box-shadow: 0 19px 0 0 #fff;
    }
    header .top .wrapper::after {
        left: 0;
        height: 40px;
        width: 40px;
        border-bottom-left-radius: 40%;
    }
    header .top .wrapper::before {
        right: 0;
        height: 40px;
        width: 40px;
        border-bottom-right-radius: 40%;
    }
    header .top::after {
        content: '';
        position: absolute;
        bottom: 0;
        z-index: -1;
        left: 0;
        right: 0;
        height: 50%;
        background: var(--inversion-color);
    }
    header .top .mode-container {
        border: 1px solid var(--secondary-color);
        outline: 2px solid var(--inversion-color);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 15;
        padding: 24px;
        border-radius: 50%;
        background-color: var(--inversion-color);
    }
    header .top .mode-container .v-icon {
        font-size: 34px;
    }
    header .top .actions-container {
        align-self: flex-end;
        display: flex;
        z-index: 15;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    header .title-container {
        width: 100%;
        background: var(--inversion-color);
        align-self: flex-start;
        padding: 0 20px;
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: flex-start;
    }
    header .title-container h2 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: 700;
    }
    header .title-container h3 {
        font-size: 14px;
        color: var(--text-secondary);
    }
    header .title-container .enabled-container {
        display: flex;
        gap: 10px;
        justify-content: center;
        font-size: 12px;
        align-items: center;
        padding: 3px 10px;
        border: 1px solid var(--secondary-color);
        border-radius: 20px;
    }   
    header .title-container .enabled-container .enabled-status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--secondary-color);
    }
</style>
