<script setup lang="ts">
    import { reactive } from 'vue';

    const props = defineProps<{
        params: any;
    }>();

    /** Реактивный объект со всеми моделями для формы */
    const models = reactive<{ [key: string]: any }>(
        Object.entries(props.params).reduce((params: any, [key, value]) => {
            params[key] = '';
            return params;
        }, {})
    );

    const submit = () => {
        console.log(props.params);
        console.log(models);
    }
</script>

<template>
    <form @submit.prevent="submit">
        <UtilsInput 
            v-for="param in Object.keys(params)" 
            :key="param" 
            :_key="param"
            :params="params[param]"
            v-model="models[param]"
        />
        <button type="submit">Submit</button>
    </form>
</template>

<style scoped lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        border-radius: 0 0 10px 10px;
        flex: 1 1 auto;
        height: 100%;
        background-color: var(--inversion-color);
    }
</style>