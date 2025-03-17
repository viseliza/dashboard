<script setup lang="ts">
    const searchValue = shallowRef('');
    const searchHovered = shallowRef(false);

    const search = () => {
        if (searchValue.value) {
            QueryParams.updateQueries({
                query: searchValue.value
            });
        } else {
            QueryParams.removeQuery('query');
        }
    }
</script>

<template>

    <div 
        class="searchBox" 
        :class="{ hovered: searchHovered }"
        @mouseenter="searchHovered = true" 
        @mouseleave="searchHovered = false"
    >
        <input 
            class="searchInput"
            type="text"
            name="query"
            placeholder="Поиск"
            v-model="searchValue"
        >
        <button class="searchButton" @click="search">
            <v-icon>
                mdi-magnify
            </v-icon>
        </button>
    </div>
</template>

<style scoped>
    .searchBox {
        outline: 2px solid var(--secondary-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
    }
    .searchBox.hovered > .searchInput {
        width: 240px;
        padding: 5px 10px;
    }
    .searchBox.hovered > .searchButton {
        background: var(--secondary-sub-color);
    }
    .searchButton {
        padding: 5px;
        outline: 2px solid var(--secondary-color);
        border-radius: 10px;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background linear 0.2s;
    }
    .searchButton .v-icon {
        font-size: 20px;
    }
    .searchInput {
        border:none;
        background: none;
        outline:none;
        float:left;
        padding: 0;
        font-size: 12px;
        transition: 0.4s;
        width: 0px;
    }
</style>