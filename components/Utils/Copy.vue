<script lang="ts" setup>
    const props = defineProps<{
        text: string;
    }>();
    const isActive = shallowRef(false);

    const copyToClipboard = () => { 
        navigator.clipboard.writeText(props.text);
        isActive.value = true;
        setTimeout(() => {
            isActive.value = false;
        }, 2000);
    };
</script>

<template>
    <button 
        class="copy-button" 
        :class="{ 'copy-button-active': isActive }"
        @click="copyToClipboard"
    >
        <v-icon>mdi-content-copy</v-icon>
        
        <span class="tooltip">Скопировано</span>
    </button>
</template>


<style scoped>
    .copy-button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        transition: all 0.2s linear;
    }
    .copy-button:hover {
        background-color: var(--secondary-color);
    }
    .copy-button .v-icon {
        color: var(--text-primary);
        font-size: 16px;
        transition: all 0.2s linear;
    }
    .copy-button .tooltip {
        position: absolute;
        padding: 5px 10px;
        border-radius: 5px;
        background: #fff;
        font-size: 12px;
        opacity: 0;
        z-index: 1;
        transition: opacity .2s linear, transform .2s linear;
    }
    .copy-button .tooltip:before {
        content: '';
        position: absolute;
        top: -9px;
        left: calc(50% - 10px);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
    }
    .copy-button.copy-button-active .tooltip {
        opacity: 1;
        transform: translateY(40px);        
    }
</style>