<template>
    <aside class="sidebar-container">
        <div class="top-side-container">
            <BaseLogo :show-title="true" />

            <ul>
                <slot name="items">

                </slot>
            </ul>
        </div>

        <slot name="modal"></slot>
        
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </aside>
</template>


<style lang="scss" scoped>
    .sidebar-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        height: 100vh;
        width: 240px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .sidebar-container .top-side-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .sidebar-container ul {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .footer {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 30px;
    }
</style>