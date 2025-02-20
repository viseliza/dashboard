<script lang="ts" setup>
    import { 
        AptekiPlus, 
        ConcurentRequest, 
        Letual, 
        Magnit, 
        Signatures, 
        TashirPizza
    } from '~/utils';

    /** Инициализация стратегии для работы с сигнатурами */
    const signatures = new Signatures();

    /** Регистрация сигнатур в стратегию */
    signatures.use('concurentRequest', new ConcurentRequest());
    signatures.use('magnit', new Magnit()); 
    signatures.use('letual', new Letual());
    signatures.use('aptekiPlus', new AptekiPlus());
    signatures.use('tashirPizza', new TashirPizza());
</script>

<template>
    <DashboardHeader title="Утилиты"/>

    <main>
        <UtilsItem 
            v-for="signature in Object.keys(signatures.strategies)"
            :key="signature"
            :title="signatures.getTitle(signature)"
            :description="signatures.getDescription(signature)"
            :style="signatures.getStyle(signature)"
            :params="signatures.getParams(signature)"
        />
    </main>
</template>

<style scoped lang="scss">
    main {
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
</style>