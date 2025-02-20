<template>
    <button class="filter-box">
        <v-icon>
            mdi-tune-vertical-variant
        </v-icon>

        <span>Фильтры</span>
    </button>
</template>


<style scoped>
    .filter-box {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        padding: 7px;
        border-radius: 10px;
        border: 2px solid var(--secondary-color);
        transition: background .3s;
    }
    .filter-box:hover {
        background-color: var(--secondary-color);
    }
    .filter-box .v-icon {
        font-size: 16px;
    }
</style>