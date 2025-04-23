<script lang="ts" setup>
    import { useDumpStore, useServiceStore } from '~/store';
    
    const dumpStore = useDumpStore();
    const serviceStore = useServiceStore();
    const serviceStrategy = new ServicesStrategy();
    
    const refresh = async () => {
        const params = dumpStore.params;
        const dumpResult = await serviceStrategy.getDumpRequest({
            code: serviceStore.serviceCode,
            mode: serviceStore.tableMode,
        }, params);

        dumpStore.table = structuredClone(dumpResult.data);
        dumpStore.maxPages = Math.ceil(dumpResult.count / 25);
        dumpStore.count = dumpResult.count;
    }
</script>

<template>
    <button 
        class="refresh-button" 
        @click="refresh"
    >
        <v-icon>
            mdi-refresh
        </v-icon>
    </button>
</template>

<style scoped>
    .refresh-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        outline: 2px solid var(--secondary-color);
        border-radius: 5px;
    }
    .refresh-button .v-icon {
        font-size: 20px;
        transition: transform 0.3s linear;
    }
    .refresh-button:hover .v-icon {
        transform: rotate(20deg);
    }
    .refresh-button:active .v-icon {
        transform: rotate(360deg);
    }
</style>