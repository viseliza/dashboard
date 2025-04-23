<script setup lang="ts">
    type Props = {  
        borderBottom?: boolean;
        borderTop?: boolean;
    }
    const props = withDefaults(defineProps<Props>(), {
        borderBottom: true,
        borderTop: true,
    });
</script>

<template>
    <div 
        class="actions-container"
        :class="{
            'actions-container--border-bottom': borderBottom,
            'actions-container--border-top': borderTop,
        }"
    >
        <div class="title">
            <v-icon>mdi-cog-play-outline</v-icon>
            Действия
        </div>

        <div class="actions">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .actions-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;   
        flex: 0 1 auto;
        margin: 0 20px;
        padding: 5px 10px;
        gap: 15px;
    }   
    .actions-container--border-bottom {
        border-bottom: 2px solid var(--secondary-color);
    }
    .actions-container--border-top {
        border-top: 2px solid var(--secondary-color);
    }
    .actions-container .title {
        font-size: 14px; 
        transition: all 0.3s linear;
        font-weight: 700;
        padding-right: 15px;
        border-right: 2px solid var(--secondary-color);
    }
    .actions-container .actions {
        display: flex;
        flex-direction: row;
        gap: 15px;
    }
</style>