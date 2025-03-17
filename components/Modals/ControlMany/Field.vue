<script setup lang="ts">
    const props = defineProps<{
        style?: string;
        error: boolean;
        active: boolean;
    }>();
</script>

<template>
    <div 
        class="field-container"
        :style="style"
    >
        <div 
            class="field-container-content"
            :class="{ 'active': active, 'error': error }"
        >
            <div class="checkbox-header">
                <span>Прокси</span>

                <div class="checkbox-container">
                    <slot name="checkboxes"></slot>
                </div>
            </div>

            <slot name="input"></slot>
        </div>

        <TooltipsFieldContainer :active="active">
            <slot name="content"></slot>
        </TooltipsFieldContainer>
    </div>
</template>

<style scoped>
    .field-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }    
    .field-container-content {
        display: flex;
        border: 2px solid var(--secondary-color);
        border-radius: 15px;
        padding: 10px;
        width: 100%;
        flex-direction: column;
        gap: 5px;
        transition: border-color linear 200ms;
    }
    .field-container-content.active {
        border-color: var(--active-color);
    }
    .field-container-content.error {
        border-color: var(--delete-color);
    }
    .field-container-content .checkbox-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        gap: 20px;
    }
    .field-container-content .checkbox-container {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    .field-container-content .checkbox-header span {
        font-size: 12px;
        font-weight: 700;
    }
    
</style>