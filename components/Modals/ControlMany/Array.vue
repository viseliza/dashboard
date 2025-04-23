<script setup lang="ts">
    const array = defineModel<any[]>('model');
    const emit = defineEmits(['add']);

    const addItem = () => {
        array.value?.push({
            value: 'HOST:PORT',
            auth: false,
            update: false
        });
        emit('add');
    }
</script>

<template>
    <section class="proxies-container">
        <h4 class="title">Список проксей</h4>

        <div class="content-container">
            <slot></slot>

            <div 
                @click="addItem"
                class="add-button"
            >
                <v-icon>mdi-plus</v-icon>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .proxies-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        flex: 1 1 auto;
        justify-content: flex-end;
    }
    .proxies-container .title {
        font-size: 12px;
        margin-left: 10px;
        font-weight: 700;
    }
    .proxies-container .content-container {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
        padding: 10px;
        border-radius: 15px;
        border: 1px solid var(--secondary-color);
    }
    .proxies-container .content-container .add-button {
        position: absolute;
        bottom: 3px;
        right: 5px;
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
        background-color: var(--secondary-sub-color);
        border-radius: 15px;
        padding: 5px;
        outline: 1px solid var(--secondary-color);
        cursor: pointer;
        transition: background-color 0.2s linear;
    }
    .proxies-container .content-container .add-button .v-icon {
        font-size: 16px;
    }
    .proxies-container .content-container .add-button:hover {
        background-color: var(--secondary-color);
    }
</style>