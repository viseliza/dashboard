<script lang="ts" setup>
    type Props = {
        name: string;
        styles?: Record<string, string>;
    }
    const props = defineProps<Props>();
    const icon = iconsDictionary[props.name as keyof typeof iconsDictionary] || {
        'type': 'mdi',
        'icon': 'mdi-code-braces'
    }

    defineExpose({
        icon: icon.icon,
        type: icon.type
    });
</script>   

<template>
    <font-awesome-icon 
        v-if="icon.type === 'fa'" 
        :icon="icon.icon" 
        :style="{ height: styles?.height, width: styles?.width }" 
    />

    <v-icon 
        v-else-if="icon.type === 'mdi'" 
        :icon="icon.icon" 
        :style="{ fontSize: styles?.fontSize, height: styles?.height, width: styles?.width }" 
    />
</template>

<style scoped lang="scss">
    .v-icon,
    .fa {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>