<script setup lang="ts">
    type Props = {
        status: string
    }
    const props = defineProps<Props>();
</script>

<template>
    <div class="loader-container">
        <div 
            class="loader"
            :class="status"
        ></div>
    </div>
</template>

<style scoped lang="scss">
    .loader-container {
        position: relative;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .loader {
        position: absolute;
        content: '';
        top: calc(50% - 2rem);
        left: calc(50% - 2rem);
        width: 4rem;
        height: 4rem;
        border: 5px solid var(--secondary-color);
        border-radius: 50%;
        overflow: hidden;
        transition: all linear 0.3s;
        animation: spin 1s linear infinite;
    }
    .success {
        border: none;
        background: linear-gradient(#16c082, #17bc80);
        outline: 10px solid rgba(var(--accept-color-rgb), 0.15);
    }
    .fail {
        border: none;
        background: rgba(var(--delete-color-rgb), 0.7);
        outline: 10px solid rgba(var(--delete-color-rgb), 0.15);
    }
    .loader.success {
        &::before {
            height: calc(7px * 0.8);
            width: calc(2.5rem * 0.8);
            position: absolute;
            top: 65%;
            left: 44%;
            background-color: var(--inversion-color);
            background: linear-gradient(210deg, #ebfcf4 0%, #cdf2e5 100%);
            transform: rotate(-45deg);
            transform-origin: 0% 50%;
            border-radius: 4px;
            animation: baseGrow 1s;
            content: '';
        }
        
        &::after {
            height: calc(7px * 0.8);
            width: calc(1.5rem * 0.8);
            position: absolute;
            top: 65%;
            left: 50%;
            background: linear-gradient(185deg, #ebfcf4 0%, #cdf2e5 100%);
            transform: rotate(-135deg);
            transform-origin: 0% 50%;
            border-radius: 4px;
            animation: tipGrow 1s;
            content:'';
        }  
    }
    .loader.fail {
        &::before {
            width: calc(3rem * 0.8);
            height: calc(0.5rem * 0.8);
            background: #f7d9d9;
            transform-origin: 50% 50%;
            top: calc(50% - 0.2rem);
            left: calc(50% - (1.5rem * 0.8));
            transform: rotate(45deg);
            position: absolute;
            content: '';
            border-radius: 8px;
            animation: leftIn 0.3s linear;
        }
        
        &::after {
            content: '';
            width: calc(3rem * 0.8);
            height: calc(0.5rem * 0.8);
            background: #f7d9d9;
            transform-origin: 50% 50%;
            top: calc(50% - 0.2rem);
            right: calc(50% - (1.5rem * 0.8));
            transform: rotate(-45deg);
            position: absolute;
            border-radius: 8px;
            animation: rightIn 0.3s linear;
        } 
    }
    .loader.success, .loader.fail {
        animation: pop 1.2s ease-in-out;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
            border-top: 4px solid var(--active-color);
        }
        100% {
            transform: rotate(360deg);
            border-top: 4px solid var(--active-color);
        }
    }

    @keyframes tipGrow {
        0% {
            width: 0px;
            left: 0;
            top: 0;
        }
        25% {
            width: 0px;
            left: 0;
            top: 0; 
        }
        50% {
            top: 0%;
            left: 0%;
            width: 0;
        }
        75% {
            top: 0%;
            left: 0%;
            width: 0rem;
        }
        100% {
            top: 65%;
            left: 50%;
            width: calc(1.5rem * 0.8);
        }
    }

    @keyframes baseGrow {
        0% {
            width: 0;
        }
        90% {
            width: 0;
        }
        100% {
            width: calc(2.5rem * 0.8);
        }
    }

    @keyframes pop {
        0% {
            transform: scale(1);
            outline-width: 1px;
        }
        80% {
            transform: scale(1);    
            outline-width: 7px;
        }
        100% {
            transform: scale(1.1);
            outline-width: 12px;
        }
    }

    @keyframes leftIn {
        0% {
            left: 0;
            top: 0;
            width: 0;
        }
        100% {
            top: calc(50% - 0.2rem);
            left: calc(50% - 1.5rem * 0.8);
            width: calc(3rem * 0.8);
        }
    }

    @keyframes rightIn {
        0% {
            right: 0;
            top: 0;
            width: 0;
        }
        100% {
            top: calc(50% - 0.25rem);
            right: calc(50% - 1.5rem);
            width: calc(3rem * 0.8);
        }
    }
</style>