<template>
    <Teleport to="#loading">
        <div class="loader-backdrop"></div>

        <div class="loader-wrapper">
            <div class="left-side">
                <div class="wrapper">
                    <slot name="status-circle"></slot>
                    
                    <slot name="status-text"></slot>

                    <slot name="status-button"></slot>
                </div>
            </div>

            <div class="right-side">
                <slot name="close"></slot>
                
                <header>
                    <h2>Детали выполнения</h2>
                </header>

                <div class="task">
                    <span class="title">Задача</span>
                    <span>
                        <slot name="task-name"></slot>
                    </span>
                </div>

                <slot name="data"></slot>

                <slot name="footer"></slot>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
    .loader-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: auto;
        display: block;
        z-index: 23;
        background-color:rgba(0,0,0,0.2);
    }
    .loader-wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 800px;
        height: 600px;
        transform: translate(-50%, -50%);
        padding: 20px;
        z-index: 24;
        display: flex;
        flex-direction: row;
        border-radius: 15px;
        background-color: var(--inversion-color);
    }
    .left-side,
    .right-side {
        width: 50%;
        flex: 1 1 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    .left-side {
        justify-content: center;
        align-items: center;
    }
    .left-side .wrapper {
        display: flex;
        flex-direction: column;
        gap: 40px;
        justify-content: center;
        align-items: center;
        width: 280px;
    }
    
    .right-side {
        position: relative;
        padding: 20px;
        border-radius: 15px;
        background-color: var(--secondary-sub-color);
    }
    .right-side header {
        display: flex;
    }
    .right-side header h2 {
        font-size: 14px;
        font-weight: 700;
    }
    .right-side .task {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .right-side .task span {
        font-size: 12px;
    }
    .right-side .task .title {
        font-weight: 600;
    }
</style>