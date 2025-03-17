<script setup lang="ts">
    const props = defineProps<{
        stats: any;
        tableMode: string;
        item: any;
    }>();

    const isActive = shallowRef(false);
    const emit = defineEmits(['mouseenter', 'mouseleave', 'active']);

    watch(isActive, (value) => {
        emit('active', value);
    })
</script>

<template>
    <div 
        class="data-row" 
        @click="isActive = true" 
        @mouseleave="emit('mouseleave')"
        @mouseenter="emit('mouseenter')"
    >
        <slot name="columns"></slot>
    </div>

    <Teleport v-if="isActive" to="#modal">
        <ModalsCardModal 
            :stats="stats"
            :item="item"
            :table-mode="tableMode"
            @close="isActive = false"
        >
            <slot name="modal"></slot>
        </ModalsCardModal>
    </Teleport>
</template>

<style scoped>
    .data-row {
        display: contents;
    }
    .data-row.active {
        background: var(--secondary-color);
    }
</style>