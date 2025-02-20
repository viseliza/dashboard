<script lang="ts" setup>
    type Props = {
        header?: boolean;
        logo?: string;
        title?: string;  
    }
    withDefaults(defineProps<Props>(), {
        header: false,
        logo: '',
        title: ''
    });
</script>


<template>
    <aside class="controlbar-container">
        <header v-if="header">
            <div class="img-container">
                <img :src="logo" alt="">
            </div>
            <h2>{{ title }}</h2>
        </header>

        <slot>
        </slot>
    </aside>
</template>


<style scoped>
    .controlbar-container {
        position: fixed;
        top: 68px;
        right: 0;
        bottom: 0;
        z-index: 1;
        height: 100vh;
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-left: 2px solid var(--secondary-color);
    }
    .controlbar-container header {
        aspect-ratio: 5/3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        gap: 20px;
        background: linear-gradient(90deg,#d1d1cc,#dcdddb,#d1d1cc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .controlbar-container header .img-container {
        padding: 18px;
        border-radius: 50%;
        background-color: var(--inversion-color);
        backdrop-filter: blur(15px);
        background: rgba(255, 255, 255, .5);
        border: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 -10px 10px rgba(0,0,0,0.02);
        
    }
    .controlbar-container header img {
        width: 32px;
        height: 32px;
    }
    .controlbar-container header h2 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
    }
    @media screen and (max-width: 1350px) {
        .controlbar-container { 
            display: none;
        }
    }
</style>