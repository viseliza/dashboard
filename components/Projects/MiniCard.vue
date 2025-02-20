<script lang="ts" setup >
    import durak from '~/assets/images/logos/durak.svg';
    import pennoe from '~/assets/images/logos/pennoe.svg';
    import aptekiplus from '~/assets/images/logos/aptekiplus.svg';
    import { ServiceItem } from '~/models';

    const data: any = { 
        'durak': { 
            color: '#ffffff',
            path: durak,
            bg_gradient_from: 'rgba(234, 230, 255, .8)', 
            bg_gradient_to: 'rgba(233, 232, 232, .5)',
            gradient: 'linear-gradient(135deg, white 0%, white 50%, #ffffff 100%)'
        },
        'aptekiplus': { 
            color: '#1963af',
            path: aptekiplus,
            bg_gradient_from: 'rgba(39, 96, 211, .5)', 
            bg_gradient_to: 'rgba(18, 131, 202, .5)',
            gradient: 'linear-gradient(135deg, white 0%, white 50%, #1963af 100%)'
        },
        'default': {
            color: '#ccc',
            path: pennoe,
            bg_gradient_from: 'rgba(209, 209, 204, .5)',
            bg_gradient_to: 'rgba(220, 221, 219, .5)',
            gradient: 'linear-gradient(135deg, white 0%, white 50%, #ccc 100%)'
        }
    };

    const props = defineProps<{
        'service': ServiceItem
    }>();

    const serviceData = computed(() => data[props.service.code] || data['default']);
    const { gradient } = serviceData.value;
</script>


<template>
    <NuxtLink
        class="card-container"
        :to="'/dashboard/projects/' + service.code"
    >
        <div class="left">
            <h1>{{ service.name }}</h1>
            <h2>Код сервиса: {{ service.code }}</h2>
        </div>

        <div class="right">
            <div
                :style="{ background: serviceData.color }"     
                class="img-container"
            >
                <img :src="serviceData.path" alt="">
            </div>
        </div>
    </NuxtLink>
</template>


<style scoped>
    .card-container { 
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
        padding: 20px;
        border-radius: 12px;
        background: v-bind(gradient);
        border: 2px solid var(--secondary-color);
        transition: all 0.5s;
        background-size: 200% 200%;
        background-position: 0% 0%;
    }
    .card-container:hover {
        background-position: 100% 100%;
    }
    
    .card-container .left {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .card-container .left h1 {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .5px;
    }
    .card-container .left h2 {
        font-size: 14px;
        opacity: .5;
        font-weight: 500;

    }
    
    .card-container .right {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-container .right .img-container {
        padding: 8px;
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .card-container .right img {
        width: 30px;
        height: 30px;
    }
</style>