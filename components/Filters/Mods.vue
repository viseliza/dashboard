<script setup lang="ts">
    import { QueryParams } from '~/utils';
    interface Props {
        mods: any[];
        title: string;
        keyQuery?: string;
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
    <LogsFilter
        name="mode"
        icon="mdi-playlist-edit"
        :title="title"
        class-name="border-right"
        iconType="mdi"
    />

    <div class="mods-container">
        <TooltipsModeContent
            v-for="mode in mods" 
            :key="mode.name" 
            :name="mode.name"
            :isActive="activeMode === mode.name"
            @selectMode="selectMode" 
        >
            <font-awesome-icon v-if="mode.iconType === 'fa'" :icon="mode.icon" />
            <v-icon v-else-if="mode.iconType === 'mdi'">
                {{ mode.icon }}    
            </v-icon>
            <img v-else-if="mode.iconType === 'custom'" class="custom-icon" :src="mode.icon" alt="">
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
</style>