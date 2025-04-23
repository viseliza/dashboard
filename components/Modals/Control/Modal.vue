<script lang="ts" setup>
    type Props = {
        title: string;
        height?: string;
        outline?: boolean;
    }
    const props =  withDefaults(defineProps<Props>(), {
        outline: true
    });
    const emit = defineEmits(['close']);
</script>

<template>
    <div class="backdrop"></div>

    <div class="modal-container-wrapper">
        <div 
            class="modal-container" 
            :style="{ 
                'height': height ? height : '700px',
                'outline': outline ? '2px solid rgb(var(--inversion-color-rgb), .3)' : 'none'
            }"
        >
            <header>
                <h1>{{ title }}</h1>

                <button @click="emit('close')">
                    <v-icon>mdi-close</v-icon>
                </button>
            </header>

            <div class="modal-content">
                <slot name="content"></slot>
            </div>

            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<style scoped>
    .backdrop,
    .modal-container-wrapper,
    .modal-container {
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
    .modal-container-wrapper {
        z-index: 21;
    }
    .modal-container {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 600px;
        height: 700px;
        border-radius: 10px;
        background: var(--inversion-color);
    }
    .modal-container header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 2px solid var(--secondary-color);
    }
    .modal-container header button {
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .modal-container header button:hover {
        color: var(--delete-color);
    }
    .modal-container header h1 {
        font-size: 16px;
        font-weight: 700;   
    }
    .modal-content {
        padding: 15px 20px;
        padding-top: 0;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
    }
</style>