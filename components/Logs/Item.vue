<script lang="ts" setup>
    import type { Log } from '~/models';

    type Props = {
        log: Log;
    }
    const props = defineProps<Props>();
    const showMeta = shallowRef(false);

    const logType = {
        info: {
            icon: 'mdi-information-variant-circle-outline',
            color: '#61affe'
        },
        warning: {
            icon: 'mdi-alert-circle-outline',
            color: '#d5b475'
        },
        error: {
            icon: 'mdi-close-circle-outline',
            color: '#6e3838'
        },
        debug: {
            icon: 'mdi-bug-outline',
            color: '#75b9a5'
        }
    }
    
    const getDate = computed(() => {
        if (props.log.created_at === 0) return "—";
        const date = new Date(props.log.created_at * 1_000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    });
</script>


<template>
    <div class="log-container">
        <div class="log-header">
            <button @click="showMeta = !showMeta" v-if="Object.keys(log.meta).length">
                <v-icon
                    :class="{ 'active': showMeta }" 
                    class="expand"
                >
                    mdi-arrow-right-drop-circle-outline
                </v-icon>
            </button>

            <div v-else class="no-meta">
            </div>
    
            <v-icon :style="{ color: logType[log.type].color }">
                {{ logType[log.type].icon }}
            </v-icon>
    
            <span class="date">
                {{ getDate }}
            </span>
    
            <span class="action">
                {{ log.action }}
            </span>
    
            <span class="message">
                {{ log.message }}
            </span>
        </div>

        <BaseCode 
            v-show="showMeta" 
            v-model:data="log.meta" 
            size="14px"
        />
    </div>
</template>

<style scoped lang="scss">
    .log-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .log-container .log-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-bottom: 2px solid var(--secondary-color);
    }
    .log-container .log-header .no-meta {
        width: 20px;
        height: 20px;
    }
    .log-container .log-header .v-icon {
        font-size: 20px;
    }
    .log-container .log-header .v-icon.expand {
        filter: invert(53%) sepia(0%) saturate(761%) hue-rotate(134deg) brightness(91%) contrast(95%);
        transition: all .3s;
    }
    .log-container .log-header .v-icon.expand.active {
        transform: rotate(90deg);
    }
    .log-container .log-header .date {
        font-family: "JetBrains Mono", serif;
    }
    .log-container .log-header .action {
        background-color: var(--secondary-sub-color);
        border: 1px solid var(--text-secondary);
        font-size: 10px;
        color: var(--text-secondary);
        font-weight: 700;
        border-radius: 5px;
        padding: 3px 8px;
    }
    .log-container .log-header .message {
        font-family: "JetBrains Mono", serif;
        letter-spacing: .5px;
    }

</style>