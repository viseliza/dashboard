<script lang="ts" setup>
    import durak from '~/assets/images/logos/durak.svg';
    import aptekiplus from '~/assets/images/logos/aptekiplus.svg';
    import pennoe from '~/assets/images/logos/pennoe.svg';
    import { ServiceItem } from '~/models';

    const data: any = { 
        'durak': { 
            color: '#ffffff',
            path: durak,
            bg_gradient_from: 'rgba(234, 230, 255, .8)', 
            bg_gradient_to: 'rgba(233, 232, 232, .5)',
        },
        'aptekiplus': { 
            color: '#1963af',
            path: aptekiplus,
            bg_gradient_from: 'rgba(39, 96, 211, .5)', 
            bg_gradient_to: 'rgba(18, 131, 202, .5)',
        },
        'default': {
            color: '#ccc',
            path: pennoe,
            bg_gradient_from: 'rgba(209, 209, 204, .5)',
            bg_gradient_to: 'rgba(220, 221, 219, .5)',
        }
    };

    const props = defineProps<{
        'service': ServiceItem
    }>();
</script>


<template>
    <NuxtLink
        :style="{ background: data[service.code] ? data[service.code].color : data['default'].color }"    
        class="card-container"
        :to="'/dashboard/projects/' + service.code"
    >
        <div class="card-header">
            <img :src="data[service.code] ? data[service.code].path : data['default'].path" alt="">
        </div>

        <section class="card-content">
            <h1>{{ service.name }}</h1>
            <h2>Код: {{ service.code }}</h2>
        </section>
    </NuxtLink>
</template>


<style scoped>
    .card-container {
        display: flex;
        position: relative;
        flex-direction: column;
        border-radius: 15px;
    }
    .card-container .card-header {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        height: 180px;
        padding-bottom: 30px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .card-container .card-header img {
        width: 80px;
        height: 80px;
    }
    .card-container .card-content {
        padding: 10px 20px;
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 0px;
        height: 70px;
        z-index: 10;
        width: 100%;
        backdrop-filter: blur(15px);
        background: rgba(255, 255, 255, .2);
        border-radius: 0 0 15px 15px;
        border: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 -10px 10px rgba(0,0,0,0.02);
        transition: .5s;
    }
    .card-container:hover .card-content {
        height: 180px;
        border-radius: 15px;
    }
    .card-container .card-content h1 {
        font-size: 16px;
        font-weight: 700;
        letter-spacing:  .5px;
    }
    .card-container .card-content h2 {
        font-size: 14px;
        opacity: .7;
    }
</style>