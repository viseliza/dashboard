<script lang="ts" setup>
    import { 
        AptekiPlus, 
        ConcurentRequest, 
        Letual, 
        Magnit,
        Signatures,
        TashirPizza
    } from '~/utils';


    /** Инициализация стратегий сигнатур */
    const signatures = new Signatures();
    
    /** Регистрация сигнатур в стратегию */
    signatures.use('concurentRequest', new ConcurentRequest());
    signatures.use('magnit', new Magnit());
    signatures.use('letual', new Letual());
    signatures.use('aptekiPlus', new AptekiPlus());
    signatures.use('tashirPizza', new TashirPizza());    
</script>

<template>
    <Head>
        <title>Утилиты</title>
    </Head>

    <DashboardHeader 
        title="Утилиты"
        :paths="['Панель', 'Утилиты']"
    />
    
    <main>
        <UtilsItem 
            v-for="signature in Object.keys(signatures.strategies)"
            :key="signature"
            :signatures="signatures"
            :signature="signature"
        />
    </main>
</template>

<style scoped lang="scss">
    main {
        padding: 20px;
        padding-top: 0;
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 10px));
        gap: 20px;
    }
    @media screen and (min-width: 1600px) {
        main {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media screen and (max-width: 640px) {
        main {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>