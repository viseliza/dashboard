<template>
    <div class="backdrop"></div>

    <div class="card-container-wrapper">
        <div class="card-container">
            <slot name="header"></slot>

            <main>
                <slot name="content"></slot>
            </main>
            
            <footer>
                <div class="footer-left">
                    <slot name="footer-left"></slot>
                </div>

                <div class="footer-right">
                    <slot name="footer-right"></slot>
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped>
    .backdrop,
    .card-container-wrapper,
    .card-container {
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
    }
    .backdrop {
        pointer-events: auto;
        display: block;
        z-index: 10;
        background-color:rgba(0,0,0,0.2);
    }
    .card-container-wrapper {
        width:100vw;
        height:100vh;
        z-index: 11;
    }
    .card-container {
        outline: 3px solid var(--inversion-color);
        border: 1px solid var(--secondary-color); 
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 600px;
        height: 700px;
        border-radius: 20px;
        background: var(--inversion-color);
    }
    .card-container main {
        flex: 1 1 auto;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
    .card-container footer {
        padding: 10px 20px;
        border-top: 1px solid var(--secondary-color);
        display: flex;
        justify-content: space-between;
    }
    .card-container footer .footer-left,
    .card-container footer .footer-right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }
    .card-container footer .footer-right {
        justify-content: flex-end;
    }
</style>