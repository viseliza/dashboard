<script setup lang="ts">
    type Props = {
        tableMode: 'accounts' | 'streaks';
        id: string;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close']);

    const icons = computed(() => ({
        'accounts': 'mdi-account',
        'streaks': 'mdi-barcode'
    }));

    const translateKey = computed(() => ({
        'accounts': 'Аккаунт',
        'streaks': 'Штрих'
    }));
</script>

<template>
    <header>
        <div class="top">
            <div class="mode-container">
                <v-icon :icon="icons[tableMode]"/>
            </div>

            <div class="actions-container">
                <ModalsCardAction 
                    icon="mdi-plus" 
                    title="Добавить"
                    @click="console.log('add')"
                />
            </div>
        </div>

        <div class="title-container">
            <h2>
                {{ translateKey[tableMode] }}
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
    header .top::before {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        border-radius: 18px 18px 0 0;
        background-color: var(--secondary-color);
    }
    header .top .mode-container {
        border: 1px solid var(--secondary-color);
        outline: 2px solid var(--inversion-color);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 50%;
        background-color: var(--inversion-color);
    }
    header .top .mode-container .v-icon {
        font-size: 34px;
    }
    header .top .actions-container {
        align-self: flex-end;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    header .title-container {
        align-self: flex-start;
        padding: 0 20px;
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: flex-start;
    }
    header .title-container h2 {
        font-size: 16px;
        font-weight: 700;
    }
    header .title-container h3 {
        font-size: 14px;
        color: var(--text-secondary);
    }
</style>
