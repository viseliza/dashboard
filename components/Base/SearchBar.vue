<script lang="ts" setup>
    const route = useRoute();
    const router = useRouter();
    const queryValue = shallowRef(route.query.query || '');

    function buttonClick() {
        const prevQueries = route.query;
        delete prevQueries['query'];
        
        const result = JSON.parse(JSON.stringify({ 
            ...prevQueries,
            query: queryValue.value
        }));
        
        router.push({
            path: route.path,
            query: { ...result },
            replace: true
        });
    }
</script>


<template>
    <div class="search-container">
        <v-icon class="search">mdi-magnify</v-icon>
        
        <input 
            v-model="queryValue"
            type="text"
            placeholder="Введите UUID..."
        >
        <button 
            @click="buttonClick"
            class="send-button"
        >
            <v-icon >mdi-arrow-right-thin</v-icon>
        </button>
    </div>
</template>


<style scoped>
    .search-container {
        position: relative;
        padding: 7px;
        display: flex;
        align-items: center;
        height: 100%;
        width: 280px;
        border: 2px solid var(--secondary-color);
        border-radius: 10px;
    }
    .search-container .v-icon.search {
        position: absolute;
        left: 7px;
        top: 8px;
        color: var(--text-secondary);
    }
    .search-container input {
        outline: none;
        margin-left: 25px;
        width: 100%;
    }
    .search-container .send-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px;
        border-radius: 5px;
        background-color: var(--secondary-color);
    }
    .search-container .send-button .v-icon {
        font-size: 16px;
    }
</style>