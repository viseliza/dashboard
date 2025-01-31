<script lang="ts" setup>
    import Header from '~/components/Header.vue';
import { ServiceItem } from '~/models';

    useHead({
        title: 'Панель - Проекты'
    });


    
    const service = new ServiceItem({
        code: 'aptekiplus',
        name: 'Аптеки Плюс'
    });
</script>

<template>
    <Header title="Проекты"/>
    
    <main>
        <div class="cards-container">
            <Card
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
    }
</style>