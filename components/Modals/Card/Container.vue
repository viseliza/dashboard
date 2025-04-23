<template>
    <div class="backdrop"></div>

    <div class="card-container-wrapper">
        <div class="card-container">
            <slot name="header"></slot>

            <main>
                <slot name="details"></slot>

                <slot name="content">
                    <div class="params">
                        <slot name="params"></slot>
                    </div>

                    <slot name="footer"></slot>
                </slot>
            </main>
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
        z-index: 20;
        background-color:rgba(0,0,0,0.2);
    }
    .card-container-wrapper {
        width:100vw;
        height:100vh;
        z-index: 21;
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
    }
    .card-container main {
        flex: 1 1 auto;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        border-radius: 0 0 20px 20px;
        background: var(--inversion-color);
    }
    main .params {
        background-color: var(--inversion-color);
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        padding-top: 10px;
        overflow-y: auto;
        flex: 1 1 auto;
    }
</style>