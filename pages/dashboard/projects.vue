<script lang="ts" setup>
    import Header from '~/components/Dashboard/Header.vue';
    import { PennoeAPI, TemplateAPI } from '~/api';
    import { ServiceItem, Tokens } from '~/models';
    import type { ErrorMessage } from '~/types';

    useHead({
        title: 'Панель - Проекты'
    });

    const api = new PennoeAPI(TemplateAPI.x_token);
    const error = ref();
    let services: Array<ServiceItem> = [];

    try {
        const tokens = Tokens.getTokens();
        services = await api.getServices('', tokens.access_token);
    } catch (e: any) {
        error.value = e as ErrorMessage;
    }
</script>

<template>
    <Header title="Проекты"/>
    
    <main>
        <div class="cards-container">
            <Card
                v-for="service in services"
                :key="service.code"
                :service="service"
            />
        </div>
    </main>
</template>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
        padding: 20px;
	}
    .cards-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
</style>