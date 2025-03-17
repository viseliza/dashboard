<script setup lang="ts">
    type Props = {
        value: string,
        background?: string,
        isBoolean?: boolean
    }
    const props = withDefaults(defineProps<Props>(), {
        isBoolean: undefined
    });

    const translate = {
        'streaks': 'Штрихи',
        'refresher': 'Рефрешер',
        'checkInternet': 'Проверка интернета',
        'enable': 'Активен',
    }
</script>

<template>
    <div class="tag" :style="{ background: background }">
        <div 
            v-if="isBoolean === true || isBoolean === false"
            class="status" 
            :style="{ background: isBoolean ? '#0fba82' : '#e74343' }"
        />

        <span class="text">{{ translate[value as keyof typeof translate] || value }}</span>
    </div>
</template>

<style>
    .tag {
        display: flex;
        align-items: center;
        z-index: 2;
        justify-content: center;
        gap: 5px;
        padding: 2px 10px;
        border-radius: 10px;   
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .tag .status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
    .tag .text {
        font-size: 12px;
        font-weight: 500;
    }
</style>