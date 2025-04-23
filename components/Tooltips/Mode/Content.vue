<script setup lang="ts">
    type Props = {
        name: string;
        isActive: boolean;
        isMode?: boolean;
        stop?: boolean;
        isExpanded?: boolean
    };
    const props = withDefaults(defineProps<Props>(), {
        stop: false,
        isMode: false,
        isExpanded: false
    });
    const emit = defineEmits(['click']);
    const tooltipShow = shallowRef<boolean>(false);

    const click = (event: Event) => {
        if (props.stop) {
            event.stopPropagation();
        }
        emit('click', props.name);
    }
</script>

<template>
    <TooltipsModeContainer
        @mouseenter="tooltipShow = true"
        @mouseleave="tooltipShow = false"
        @click="click"
        :tooltipShow="tooltipShow"
        :name="name"
        :isExpanded="isExpanded"
        :isActive="isActive"
        :isMode="isMode"
    >
        <slot></slot>
    </TooltipsModeContainer>
</template>