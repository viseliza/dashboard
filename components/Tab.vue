<script lang="ts" setup>
    import Tab_Item from './Tab_Item.vue';
</script>


<template>
    <section class="tab__main">
		<Tab_Item active/>
		<Tab_Item/>
		<Tab_Item/>
    </section>
</template>


<style scoped>
    .tab__main {
        display: flex;
        flex-direction: row;
        margin: 0 15px;
    }
</style>