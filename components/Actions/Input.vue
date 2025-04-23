<script setup lang="ts">
    type Props = {
        text: string;
    }
    const props = defineProps<Props>();
    const value = shallowRef<string>('');
    const emit = defineEmits(['confirmation']);

    watch(value, (value) => {
        if (value === props.text) {
            emit('confirmation', true);
        } else if (value !== props.text) {
            emit('confirmation', false);
        }
    });
</script>

<template>
    <div class="input">
        <input type="text" v-model="value" />
    </div>
</template>

<style scoped>
    .input {
        display: flex;
        flex-direction: row;
        border: 1px solid var(--secondary-color);
        border-radius: 5px;
        padding: 10px;
    }
    input {
        outline: none;
        flex: 1 1 auto;
    }
</style>