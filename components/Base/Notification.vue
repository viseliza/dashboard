<script setup lang="ts">
    import type { NotificationProps } from '~/types/props/notification';

    const props = defineProps<NotificationProps>();
    const emit = defineEmits(['closeNotification']);

    setTimeout(() => {
        emit('closeNotification');
    }, 5000);
</script>

<template>
    <div class="error-notification-container">
        <div class="error-notification">
            <div class="icon-container">
                <v-icon class="flex justify-center items-center">
                    mdi-alert-circle
                </v-icon>
            </div>
            <div class="message-container">
                <span class="title">{{ detail }} ({{ code }})</span>
                <p class="message">{{ message }}</p>
            </div>

            <button 
                @click="$emit('closeNotification')"
                class="close-button"
            >
                <v-icon class="flex justify-center items-center">
                    mdi-close
                </v-icon>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .error-notification-container {
        position: absolute;
        z-index: 10;
    }

    .error-notification {
        position: relative;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: center; 
        gap: 15px;
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border: 2px solid #fff;
    }

    .error-notification .icon-container {
        padding: 6px;
        color: red;
        align-self: flex-start;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .error-notification .message-container {
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1 1 auto;
    }

    .error-notification .title {
        font-size: 14px;
        font-weight: 600;
    }

    .error-notification .message {
        font-size: 14px;
        color: #5f5f5f;
    }

    .error-notification .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #5f5f5f;
    }


    @media screen and (max-width: 640px) {
        .error-notification-container {
            width: calc(100vw - 40px);
            top: 20px;
            left: 20px;
        }

        .error-notification {
            background: -webkit-linear-gradient(90deg,#d30c22,#e52c22,#f74220); /* Chrome 10-25, Safari 5.1-6 */ 
            background: linear-gradient(90deg,#e42037,#e52c22,#f74220); 
            color: #fff;
        }
        
        .error-notification .message {
            font-size: 12px;
            color: #ccc;
        }
        
        .error-notification .close-button {
            color: #ccc;
        }
    }

    @media (min-width: 641px) {
        .error-notification-container {
            top: 20px;
            right: 20px;
            width: 380px; 
        }

        .error-notification {
            
            background: linear-gradient(180deg, #f5191928 0%, #fe818123 50%, rgba(255, 255, 255, 0) 100%);
        }
    }
</style>


