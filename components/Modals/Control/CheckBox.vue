<script lang="ts" setup>
    const model = defineModel<any>();
    const props = defineProps<{
        item: string;
        _key: string;
        disabled?: boolean;
    }>();

    const translate = {
        'true': 'Включен',
        'false': 'Выключен',
    }
</script>

<template>
    <div 
        class="checkbox-container"
        :class="{ 'active-checkbox': model === item }"
    >
        <input
            type="checkbox" 
            v-model="model"
            :value="item"
            :disabled="props.disabled"
            :id="_key+item"
            :true-value="item"
            :false-value="null"
        />

        <label :for="_key+item">{{ translate[item as keyof typeof translate] || item }}</label>
    </div>
</template>

<style scoped lang="scss">
    .checkbox-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 auto;
        border-radius: 5px;
        border: 2px solid var(--secondary-color);
        transition: all 0.3s ease-in-out;
    }
    .checkbox-container input { 
        display: none;
    }
    .checkbox-container label {
        padding: 5px 8px;
        border-radius: 5px;
        font-size: 12px;
        flex: 1 1 auto;
        text-align: center;
        font-weight: 700;
        transition: all 0.3s ease-in-out;
    }
    .checkbox-container.active-checkbox { 
        border-color: var(--active-color);
        background-color: rgba(var(--active-color-rgb), 0.1);
    }
    .checkbox-container.active-checkbox label {
        color: var(--active-color);
    }
</style>