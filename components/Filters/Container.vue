<template>    
    <div class="filters-container">
        <div class="filters-container__top">
            <div class="filters-container__top-left">
                <slot name="top-mods"></slot>

                <div class="filters-container__top-general">
                    <slot name="top-general"></slot>
                </div>
            </div>

            <div class="filters-container__top-right">
                <slot name="top-right"></slot>
            </div>
        </div>

        <div class="filters-container-bottom">
            <slot name="active-filters"></slot>
        </div>
    </div>
</template>

<style scoped>
    .filters-container {
        flex: 0 1 auto;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        gap: 15px;
    }
    .filters-container__top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 2px solid var(--secondary-color);
        border-bottom: 2px solid var(--secondary-color);
    }
    .filters-container__top-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 10px;
    }
    .filters-container__top-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .filters-container__top-structure {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
    }
    .filters-container__top-structure-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: var(--secondary-color);
        border-radius: 5px;
    }
    .filters-container__top-general {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        padding-left: 15px;
        border-left: 2px solid var(--secondary-color);
    }

    .filters-container-bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
</style>