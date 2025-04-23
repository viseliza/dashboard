<script lang="ts" setup>
    type Props = {
        style?: Record<string, string>;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close']);
</script>

<template>
    <div 
        class="close-container" 
        :style="props.style"
    >
        <button @click="emit('close')">
            <v-icon>mdi-close</v-icon>
        </button>
    </div>  
</template>

<style scoped>
    .close-container {
        position: absolute;
        top: 15px;
        right: 15px;
        display: flex;
    }
    .close-container button {
        background: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .close-container button .v-icon {
        font-size: 18px;
    }
    .close-container:hover button .v-icon {
        color: var(--delete-color);
    }
</style>