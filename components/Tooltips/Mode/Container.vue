<script setup lang="ts">
    type Props = {
        name: string;
        isActive: boolean;
        tooltipShow: boolean;
        isMode?: boolean;
        isExpanded: boolean;
    };
    const props = defineProps<Props>();
    const emit = defineEmits(['click']);

    const tranlateKey = computed(() => ({
        'general': 'Обычный',
        'accounts': 'Аккаунты',
        'streaks': 'Штрихи',
        'services': 'Сервисы',
    }));

</script>

<template>
    <button 
        class="mode-container"
        :class="{ 
            expanded: isExpanded,
            active: isActive, 
            mode: !isMode
        }"
        @click="(event) => emit('click', event)"
    >
        <slot></slot>

        <div class="tooltip" :class="{ show: tooltipShow && !isExpanded }">
            {{ tranlateKey[name as keyof typeof tranlateKey] || name }}
        </div>
    </button>
</template>


<style scoped>
    .mode-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        background: var(--secondary-color);
        transition: background linear .3s, color linear .3s;
    }
    .mode-container.mode {
        background: transparent;
    }
    .mode-container.active {
        background: var(--active-color);
        color: var(--inversion-color);
    }
    .mode-container.expanded {
        background: var(--secondary-sub-color)
    }
    .mode-container .tooltip {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        font-weight: 700;
        font-size: 12px;
        position: absolute;
        top: 45px;
        padding: 2px 10px;
        left: 0;
        width: 100px;
        z-index: 0;
        border-radius: 5px;
        outline: 2px solid var(--text-primary);
        background: var(--text-primary);
        color: var(--inversion-color);
        opacity: 0;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 29px 0px;
        transform: translate(calc(100% - 135px), 10px);
        transition: transform linear .2s, opacity linear .2s, background linear .2s, color linear .2s;
    }
    .mode-container .tooltip::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid var(--text-primary);
        transition: border-bottom-color linear .2s;
    }
    .mode-container.active .tooltip {
        background: var(--active-color);
        outline-color: var(--active-color);
        color: var(--inversion-color);
    }
    .mode-container.active .tooltip::before {
        border-bottom-color: var(--active-color);
    }
    .mode-container .tooltip.show {
        transform: translate(calc(100% - 135px), 0);
        opacity: 1;
        z-index: 1;
    }
</style>