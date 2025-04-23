<script setup lang="ts">
    import { useServiceStore, useDumpStore, useLoader } from '~/store';
    import { ServicesStrategy } from '~/utils';
    type Props = {
        type: string;
        icon: string;
        title: string;
        id: string;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['click']);

    const serviceStore = useServiceStore();
    const serviceStrategy = new ServicesStrategy();
    const dumpStore = useDumpStore();
    const loaderStore = useLoader();

    const calls = computed(() => ({
        relink: serviceStrategy.getRelinkRequest,
        refresh: serviceStrategy.getRefreshRequest,
    }));

    const displayTableMode = computed(() => serviceStore.tableMode.charAt(0).toUpperCase() + serviceStore.tableMode.slice(1));

    const handleClick = async () => {
        const prevItem = dumpStore.getItem(props.id);
        loaderStore.startLoading(
            prevItem, 
            "Обновление ссылки " + displayTableMode.value, 
            displayTableMode.value
        );

        try {
            const response = await calls.value[props.type as 'relink' | 'refresh'].apply(serviceStrategy, [{
                code: serviceStore.serviceCode,
                mode: serviceStore.tableMode,
            }, { id: props.id }]);

            loaderStore.setResult(
                'success', 
                'Ссылка успешно обновлена',
                response
            );

            dumpStore.updateItem(props.id, response);
        } catch (error) {
            loaderStore.setResult(
                'fail', 
                'Произошла какая-то ошибка, проверьте данные и попробуйте еще раз',
                JSON.parse(JSON.stringify(error))
            );
            return;
        }
    }
</script>

<template>
    <button @click="handleClick">
        <v-icon :icon="icon"/>
        {{ title }}
    </button>
</template>

<style scoped>
    button {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        font-size: 14px;
        font-weight: 400;
        border-radius: 8px;
        border: 2px solid var(--secondary-color);
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: var(--secondary-sub-color);
    }
    button .v-icon {
        font-size: 18px;
    }
</style>
