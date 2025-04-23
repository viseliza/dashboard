<script setup lang="ts">
    type Props = {  
        title: string;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['click']);
    const icons = computed(() => ({
        'Добавить': 'mdi-account-plus-outline',
        'Добавить несколько': 'mdi-account-multiple-plus-outline',
        'Удалить все': 'mdi-delete-outline',
    }));
</script>

<template>
    <button class="action" @click="emit('click')">
        <v-icon>{{ icons[title as keyof typeof icons] }}</v-icon>
        {{ title }}
    </button>

    <slot>

    </slot>
</template>

<style scoped>
    .action {
        display: flex;
        flex-direction: row;
        margin: 6px 0;
        gap: 10px;
        align-items: center;
        font-weight: 700;
    }
</style>