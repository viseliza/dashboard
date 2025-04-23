<template>
    <div class="details-container">
        <slot></slot>
    </div>
</template>

<style scoped>
    .details-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: 10px 20px;
        padding: 10px 0;
        border-bottom: 1px solid var(--secondary-color);
    }
</style>