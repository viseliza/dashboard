<template>
    <div class="backdrop"></div>

    <div class="modal-container-wrapper">
        <div class="modal-container-confirm">
            <header>
                <slot name="header">
                </slot>
            </header>

            <main>
                <slot name="content">
    
                </slot>
            </main>

            <footer>
                <slot name="footer">
                </slot>
            </footer>
        </div>
    </div>
</template>


<style scoped>
    .backdrop,
    .modal-container-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .backdrop {
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 20;
        pointer-events: auto;
    }
    .modal-container-wrapper {
        z-index: 21;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .modal-container-confirm {
        outline: 2px solid rgb(var(--inversion-color-rgb), .3);
        display: flex;
        flex-direction: column;
        width: 600px;
        border-radius: 10px;
        background: var(--inversion-color);
    }
    .modal-container-confirm header,
    .modal-container-confirm main,
    .modal-container-confirm footer {
        display: flex;
        padding: 15px 20px;
    }
    .modal-container-confirm header {
        justify-content: center;
        border-bottom: 1px solid var(--secondary-color);
    }
    .modal-container-confirm header {
        font-size: 14px;
        font-weight: 700;
    }
    .modal-container-confirm main {
        flex: 1 1 auto;
        flex-direction: column;
        gap: 10px;
    }
    .modal-container-confirm footer {
        border-top: 1px solid var(--secondary-color);
        flex-direction: row;
        justify-content: flex-end;
        gap: 10px;
    }
</style>