<script setup lang="ts">
    import type { NotificationProps } from '~/types';

    const props = defineProps<NotificationProps>();
    const emit = defineEmits(['close']);
    const isHovered = shallowRef(false);
    const leftSeconds = shallowRef(10);
    
    const styles = computed(() => {
        if (props.code >= 100 && props.code < 200) {
            return {
                'type': 'info',
                'icon': 'mdi-information-outline',
                'color': 'blue',
            }
        }
        else if (props.code >= 200 && props.code < 300) {
            return {
                'type': 'success',
                'icon': 'mdi-check-circle',
                'color': 'green',
            }
        }
        else if (props.code >= 300 && props.code < 400) {
            return {
                'type': 'error',
                'icon': 'mdi-alert-circle',
                'color': 'red',
            }
        }
        return {
            'type': 'error',
            'icon': 'mdi-alert-circle',
            'color': 'red',
        }

    });

    const timer = setTimeout(() => {
        emit('close');
    }, 10_000);
    const interval = setInterval(() => {
        leftSeconds.value--;
    }, 1_000);

    watch(isHovered, (value) => {
        if (value) {
            clearTimeout(timer);
            clearInterval(interval);
        }
    });
</script>

<template>
    <div class="notification-container">
        <div 
            :class="{ [styles.color]: true, 'hovered': isHovered }" 
            class="notification" 
            @mouseover="isHovered = true"
        >
            <div class="icon-container">
                <v-icon class="flex justify-center items-center" :color="styles.color">
                    {{ styles.icon }}
                </v-icon>
            </div>
            <div class="message-container">
                <span class="title">
                    {{ detail }} 
                    <span v-if="!isHovered" class="left-seconds">({{ leftSeconds }} сек.)</span>
                </span>
                <p class="message">{{ message }}</p>
            </div>

            <button 
                @click="$emit('close')"
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
    .notification-container {
        position: fixed;
        background: var(--inversion-color);
        z-index: 10;
    }
    .notification {
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
    .notification .icon-container {
        padding: 6px;
        align-self: flex-start;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .notification .message-container {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1 1 auto;
    }
    .notification .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: 600;
    }
    .notification .left-seconds {
        font-size: 14px;
    }
    .notification .message {
        font-size: 14px;
        color: #5f5f5f;
    }
    .notification .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #5f5f5f;
        transition: color 0.3s linear;
    }
    .notification .close-button:hover {
        color: rgba(255, 0, 0, 0.596);
    }
    @media screen and (max-width: 640px) {
        .notification-container {
            width: calc(100vw - 40px);
            top: 20px;
            left: 20px;
        }
        .notification {
            background: -webkit-linear-gradient(90deg,#d30c22,#e52c22,#f74220); /* Chrome 10-25, Safari 5.1-6 */ 
            background: linear-gradient(90deg,#e42037,#e52c22,#f74220); 
            color: #fff;
        }        
        .notification .message {
            font-size: 12px;
            color: #ccc;
        }
        .notification .close-button {
            color: #ccc;
        }
    }
    @media (min-width: 641px) {
        .notification-container {
            top: 20px;
            right: 20px;
            width: 415px; 
        }
        .notification.red {   
            background: linear-gradient(180deg, #f5191915 0%, #fe818111 50%, rgba(255, 255, 255, 0) 100%);
        }
        .notification.green {   
            background: linear-gradient(180deg, #00800013 0%, #0080000e 50%, rgba(255, 255, 255, 0) 100%);
        }
        .notification.blue {   
            background: linear-gradient(180deg, #0000ff10 0%, #0000ff0e 50%, rgba(255, 255, 255, 0) 100%);
        }
    }
</style>


