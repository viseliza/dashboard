<template>
    <div class="stats-container">
        <div class="header">
            <slot name="charts"/>
        </div>

        <div class="content"> 
            <h4>
                <slot name="title"/>
            </h4>

            <div class="content-container"> 
                <slot name="content"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .stats-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        border: 1px solid var(--secondary-color);
    }
    .stats-container:first-child {
        border-right: none;
        border-radius: 20px 0 0 20px;
    }
    .stats-container:last-child {
        border-left: none;
        border-radius: 0 20px 20px 0;
    }
    .stats-container .header {
        display: flex;
        position: relative;
        flex-direction: row;
        gap: 25px;
        justify-content: center;
        align-items: center;
        padding: 30px;
    }
    .stats-container .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 10px;
        padding: 20px 0;
        margin: 0 20px;
        border-top: 1px solid var(--secondary-color);
    }
    .stats-container .content h4 {
        display: flex;
        align-items: center;
        gap: 10px;  
        font-weight: 700;
    }
    .stats-container .content .content-container {
        display: flex;
        flex-direction: column;
    }
</style>