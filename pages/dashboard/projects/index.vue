<script lang="ts" setup>
    import ProjectsMiniCard from '~/components/Projects/MiniCard.vue';
    import ControlBar from '~/components/Dashboard/ControlBar.vue';
    import Card from '~/components/Projects/Card.vue';
    import { PennoeAPI, TemplateAPI } from '~/api';
    import { ServiceItem, Tokens } from '~/models';
    import type { ErrorMessage } from '~/types';

    useHead({
        title: 'Панель - Проекты'
    });

    const api = new PennoeAPI(TemplateAPI.x_token);
    const error = shallowRef();
    let services: Array<ServiceItem> = [];
    const tokens = Tokens.getTokens();

    try {
        services = await api.privateCall(
            api.getServices,
            '',
            tokens
        );
    } catch (e: any) {
        error.value = e as ErrorMessage;
    }
</script>


<template>
    <DashboardHeader 
        title="Проекты"
        :paths="['Панель', 'Проекты']"
    />

    <main>
        <div class="cards-container">
            <Card
                v-for="service in services"
                :key="service.code"
                :service="service"
            />
        </div>
    </main>
    
    <Teleport to='#layout'>
		<ControlBar>
            <div class="controlbar-content">
                <ProjectsMiniCard 
                    v-for="service in services"
                    :key="service.code"
                    :service="service"
                />
            </div>
        </ControlBar>
    </Teleport>
</template>

<style scoped>
	main {
        display: flex;
		flex-direction: column;
        padding: 20px;
        padding-top: 10px;
        margin-right: 400px;
	}
    .cards-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .controlbar-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-bottom: 2px solid var(--secondary-color);
    }
    @media screen and (max-width: 1600px) {
        .cards-container {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media screen and (max-width: 1350px) {
        main { 
            margin: 0;
        }
    }
</style>