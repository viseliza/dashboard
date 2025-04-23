<script setup lang="ts">
    type Props = {
        item: any;
        call: any;
        api: any;
    }
    const props = defineProps<Props>();

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
            :item="item"
            :call="call"
            :api="api"
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