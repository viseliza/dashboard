<script lang="ts" setup>
    type Props = {
        array: any[];
        placeholder: string;
    }

    const props = defineProps<Props>();
    const query = shallowRef('');

    const filteredArray = shallowRef<any[]>([]);

    watch(() => query.value, () => {
        filteredArray.value = props.array.filter((item: any) => {
            return item.title.toLowerCase().includes(query.value.toLowerCase()) || item.value.toLowerCase().includes(query.value.toLowerCase());
        });
    });

    defineExpose({
        filteredArray
    });
</script>

<template>
    <div class="search-container">  
        <v-icon>mdi-magnify</v-icon>
        <input 
            type="text" 
            :placeholder="placeholder" 
            v-model="query" 
        />
    </div>
</template>

<style scoped>
    .search-container {
        background-color: var(--secondary-color);
        border-radius: 10px;
        padding: 8px 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
    .search-container input {
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
    }
    .search-container .v-icon {
        color: var(--text-secondary);
    }
</style>