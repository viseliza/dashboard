<script lang="ts" setup>
    type Props = {
        tabs: any;
    }
    const props = defineProps<Props>();
    const selectedTab = defineModel<string>("selectedTab");
</script>

<template>
    <div class="stats-tabs">
        <div 
            class="tab" 
            v-for="tab in tabs" 
            :key="tab"
            @click="selectedTab = tab"
        >
            <span>{{ tab }}</span>
        </div>
    </div>
</template>

<style scoped>
    .stats-tabs {
        display: flex;
        flex-direction: row;
    }
</style>