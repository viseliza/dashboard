<script setup lang="ts">
    defineProps<{
        style?: Record<string, string>
    }>();
    const showTooltip = shallowRef(false);
</script>

<template>
    <TooltipsTextContainer
        :showTooltip="showTooltip"
        :style="style"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
    >
        <template #pretext>
            <slot name="pretext" />
        </template>

        <template #tooltip-text>
            <slot name="tooltip-text">
                <slot name="pretext" />
            </slot>
        </template>
    </TooltipsTextContainer>
</template>
