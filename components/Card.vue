<script lang="ts" setup>
    import durak from '~/assets/images/logos/durak.svg';
    import aptekiplus from '~/assets/images/logos/aptekiplus.svg';
    import pennoe from '~/assets/images/logos/pennoe.svg';
    import { ServiceItem } from '~/models';

    const data: any = { 
        'durak': { 
            color: '#ffffff',
            path: durak 
        },
        'aptekiplus': { 
            color: '#1963af',
            path: aptekiplus 
        },
        'default': {
            color: '#ccc',
            path: pennoe
        }
    };

    const props = defineProps<{
        'service': ServiceItem
    }>();
</script>


<template>
    <div
        class="card-container"
    >
        <div  
            :style="{ background: data[service.code] ? data[service.code].color : data['default'].color }"
            class="card-header"
        >
            <img :src="data[service.code] ? data[service.code].path : data['default'].path" alt="">
        </div>

        <section class="card-content">
            <h1>{{ service.name }}</h1>
            <h2>Код: {{ service.code }}</h2>
        </section>
    </div>
</template>


<style scoped>
    .card-container {
        display: flex;
        flex-direction: column;
        border-radius: 15px;
    }
    .card-container .card-header {
        border-radius: 15px 15px 0 0;
        padding: 20px 120px;
    }
    .card-container .card-header img {
        width: 80px;
        height: 80px;
    }
    .card-container .card-content {
        padding: 15px 20px;
        color: var(--text-primary);
        position: relative;
        border-radius: 0 0 15px 15px;
        background: linear-gradient(90deg, rgba(39, 96, 211, .5), rgba(18, 131, 202, .5));
        backdrop-filter: blur( 14px );
        -webkit-backdrop-filter: blur( 14px );
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
    .card-container .card-content h1 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing:  .5px;
    }
    .card-container .card-content h2 {
        color: var(--text-secondary);
        font-size: 14px;
        opacity: .7;
    }
</style>