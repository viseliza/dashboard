<script lang="ts" setup>
    import type { Log } from '~/models';
    type Props = {
        log: Log;
    }
    const props = defineProps<Props>();
    const showMeta = shallowRef(false);
    const preTag = shallowRef();

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
        const date = new Date(props.log.created_at * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    });


    function syntaxHighlight(json: any) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: any) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    onMounted(() => {
        preTag.value.innerHTML = syntaxHighlight(JSON.stringify(props.log.meta, null, 4)); 
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

        <div v-show="showMeta" class="meta-details">
            <pre ref="preTag"></pre>
        </div>
    </div>
</template>


<style>
    .string,
    .number,
    .boolean,
    .null,
    .key {
        font-family: "Roboto Mono", serif;
    }

    .boolean,
    .null { color: #508ec1; }
    .string { color: #c08973; }
    .number { color: #a9c19f; }
    .key { color: #a4dffe; }
    
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
        font-family: "Roboto Mono", serif;
    }
    .log-container .log-header .action {
        background-color: var(--secondary-color);
        border: 2px solid var(--text-secondary);
        font-size: 10px;
        border-radius: 5px;
        padding: 3px 8px;
        opacity: .5;
    }
    .log-container .log-header .message {
        font-family: "Roboto Mono", serif;
        letter-spacing: .5px;
    }
    
    .log-container .meta-details {
        display: flex;
        position: relative;
        border-radius: 10px;
        padding: 20px;
        color: #fff;
        background-color: #1e1e1e;
        font-family: "Roboto Mono", serif;
        overflow-x: auto;
    }

</style>