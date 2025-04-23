<script setup lang="ts">
    const searchValue = shallowRef('');
    const searchHovered = shallowRef(false);
    const searchFocused = shallowRef(false);
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
        :class="{ hovered: searchHovered || searchFocused }"
        @mouseenter="searchHovered = true" 
        @mouseleave="searchHovered = false"
    >
        <div class="icon">
            <v-icon>
                mdi-barcode-scan
            </v-icon>
        </div>

        <input 
            class="searchInput"
            type="text"
            name="query"
            placeholder="Введите id штриха"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            v-model="searchValue"
        >
        <button v-if="false" class="searchButton" @click="search">
            <v-icon>
                mdi-magnify
            </v-icon>
        </button>
    </div>
</template>

<style scoped>
    .searchBox {
        outline: 2px solid var(--secondary-color);
        border-radius: 5px;
        display: flex;
        align-items: center;
    }
    .searchBox.hovered > .searchInput {
        width: 240px;
        padding: 5px 10px;
        padding-left: 5px;
    }
    .searchBox.hovered > .searchButton {
        border-radius: 0 5px 5px 0;
        background: var(--secondary-color);
    }
    .searchBox .icon {
        color: var(--text-secondary);
        padding: 5px;
    }
    .searchButton {
        padding: 5px;
        border-radius: 5px;
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