<script setup lang="ts">
    import { QueryParams } from '~/utils';
    type Props = {
        mods: any[];
        title: string;
        keyQuery?: string;
        disabled?: boolean;
    }
    
    const activeMode = defineModel<string>('activeMode');
    const props = withDefaults(defineProps<Props>(), {
        keyQuery: 'mode',
    });
    const selectMode = (modeName: string) => {
        if (activeMode.value == modeName) return;
        activeMode.value = modeName;
    }

    watch(activeMode, (value) => {
        QueryParams.updateQueries({
            [props.keyQuery]: value,
        });
    });
</script>

<template>
    <FiltersFilter
        name="table"
        class-name="border-right"
        :title="title"
        :disabled="disabled"
        :style="{
            width: '110px',
        }"
    />

    <div class="mods-container">
        <TooltipsModeContent
            v-for="mode in mods" 
            :key="mode.name" 
            :name="mode.name"
            :isMode="true"
            :isActive="activeMode === mode.name"
            @click="selectMode" 
        >
            <font-awesome-icon v-if="mode.iconType === 'fa'" :icon="mode.icon" />
            <v-icon v-else-if="mode.iconType === 'mdi'">
                {{ mode.icon }}    
            </v-icon>
            <img 
                v-else-if="mode.iconType === 'custom'" 
                class="custom-icon" 
                :class="{ active: activeMode === mode.name }"
                :src="mode.icon" 
                alt=""
            >
        </TooltipsModeContent>
    </div>
</template>

<style scoped>    
    .mods-container {
        position: relative;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
    }
    .custom-icon {
        width: 14px;
        height: 14px;
    }
    .custom-icon.active {
        filter: invert(99%) sepia(1%) saturate(2%) hue-rotate(251deg) brightness(111%) contrast(100%);
    }
</style>