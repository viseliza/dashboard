<script setup lang="ts">
    defineProps<{
        name: string;
        isActive: boolean;
    }>();
    const emit = defineEmits(['selectMode']);
    const tooltipShow = shallowRef<boolean>(false);
</script>

<template>
    <TooltipsModeContainer
        @mouseenter="tooltipShow = true"
        @mouseleave="tooltipShow = false"
        @click="emit('selectMode', name)"
        :tooltipShow="tooltipShow"
        :name="name"
        :isActive="isActive"
    >
        <slot></slot>
    </TooltipsModeContainer>
</template>