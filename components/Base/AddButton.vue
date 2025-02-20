<script lang="ts" setup>
    type Props = {
        name: string;
    }
    const props = defineProps<Props>();
</script>


<template>
    <button>
        <v-icon>mdi-plus</v-icon>

        <span>Добавить</span>
    </button>
</template>


<style scoped>
    button {
        border-radius: 10px;
        border: 2px solid var(--secondary-color);
        padding: 7px;
        display: flex;
        gap: 5px;
        align-items: center;
        transition: background .3s;
    }
    button:hover {
        background-color: var(--secondary-color);
    }
    button span {
        font-size: 14px;
    }
    button .v-icon {
        font-size: 16px;
    }
</style>