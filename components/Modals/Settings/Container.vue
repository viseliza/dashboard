<script setup lang="ts">
    const showSettings = defineModel<boolean>('showSettings', {
        type: Boolean,
        required: true,
    });
</script>

<template>
    <div class="backdrop"></div>

    <div class="settings-container-wrapper">
        <div class="settings-container">
            <header>
                <h1>Настройки</h1>
    
                <button @click="showSettings = false">
                    <v-icon>mdi-close</v-icon>
                </button>
            </header>
    
            <aside>
                <slot name="aside"></slot>
            </aside>
    
            <main>
                <div class="content-container">
                    <slot name="content"></slot>
                </div>
            </main>

            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<style scoped>
    .backdrop,
    .settings-container-wrapper,
    .settings-container {
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
    }
    .backdrop {
        pointer-events: auto;
        display: block;
        z-index: 20;
        background-color:rgba(0,0,0,0.2);
    }
    .settings-container-wrapper {
        width:100vw;
        height:100vh;
        z-index: 21;
    }
    .settings-container {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 800px;
        height: 700px;
        border-radius: 10px;
        background: var(--inversion-color);
    }
    .settings-container header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 2px solid var(--secondary-color);
    }
    .settings-container header button {
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .settings-container header button:hover {
        color: var(--delete-color);
    }
    .settings-container header h1 {
        font-size: 18px;
        font-weight: 700;
    }
    .settings-container aside {
        padding: 20px 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 0;
        top: 58px;
        bottom: 0;
        width: 200px;
        border-right: 2px solid var(--secondary-color);
    }
    .settings-container footer,
    .settings-container main {
        padding: 20px;
        margin-left: 200px;
    }
    .settings-container main {
        display: flex;
        flex: 1 1 auto;
        align-items: flex-start;
    }
    .settings-container .content-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
    }
</style>