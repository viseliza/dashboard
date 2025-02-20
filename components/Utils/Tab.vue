<script lang="ts" setup>
    const props = defineProps<{
        title: string;
        enabled: boolean;
    }>();

    const mode = defineModel<string>('mode');
</script>

<template>

    <button 
        :disabled="!enabled"
        class="group"
        @click="mode = title"
        :class="{ ['active']: mode === title, ['enabled']: enabled }"
    >
        <span>{{ title }}</span>
        <span class="tab-line left"></span>
        <span class="tab-line right"></span>
    </button>
</template>

<style scoped>
    .group {
        background-color: var(--inversion-color);
        position: relative;
        padding-top: 12px;
    }
    .group:first-child {
        margin-left: 15px;
        border-top-left-radius: 10px;
    }
    .group:last-child {
        margin-right: 15px;
        border-top-right-radius: 10px;
    }
    .group:hover {
        cursor: default;
    }
    .group .tab-line {
        position: absolute;
        bottom: -2px;
        height: 2px;
        background-color: var(--active-color);
        width: 0;
        transition: width 0.3s ease-in-out;
    }
    .group.active .tab-line {
        width: 50%;
    }
    .group .tab-line.left {
        left: 50%;
        right: 0;
    }
    .group .tab-line.right {
        right: 50%;
    }
    .group.enabled:hover .tab-line {
        width: 50%;
    }
    .group.enabled:hover {
        cursor: pointer;
    }
</style>