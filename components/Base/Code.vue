<script setup lang="ts">
    import { CodeEditor } from '~/utils';
    type Props = {
        headers?: boolean;
        type?: 'highlight' | 'text';
        title?: string;
        size?: string;
        styles?: Record<string, string>;
        isExpandable?: boolean;
        stringfy?: Function;
    }
    
    const props = withDefaults(defineProps<Props>(), {
        headers: false,
        type: 'highlight',
        title: 'headers',
        size: '12px',
        isExpandable: false,
    });
    const data = defineModel<any>('data');
    
    const headersValue = computed(() => {
        return JSON.stringify(data.value, props.stringfy ? props.stringfy() : null, 4);
    });

    const isExpanded = ref(false);
    const expand = computed(() => {
        if (props.isExpandable) {
            return {
                container : {
                    maxHeight: isExpanded.value ? '100%' : '100px',
                    borderRadius: '10px',
                }, 
                button: {
                    opacity: isExpanded.value ? 0 : 0.6,
                }
            }
        }
        return {};
    });
</script>   

<template>
    <div 
        class="code-container"
        @mouseenter="isExpanded = true"
        @mouseleave="isExpanded = false"
    >
        <div v-if="headers" class="code-container-headers">
            <span class="text" :style="{ fontSize: size }">{{ title }}</span>

            <UtilsCopy :text="headersValue" />
        </div>

        <div 
            class="code-details"
            :class="{ 'code-details-headers': headers }" 
            :style="{ fontSize: size, ...styles, ...expand.container }"
        >
            <pre
                :style="{ fontSize: size }"
                v-if="type === 'highlight'"
                v-html="CodeEditor.syntaxHighlight(headersValue)"
            ></pre>

            <span 
                :style="{ fontSize: size }"
                v-else 
                class="code-details-text"
            >
                {{ headersValue.replace('"', '') }}
            </span>

            <div 
                class="expand-button"
                :style="expand.button"
            >
                <button>
                    <v-icon>mdi-chevron-down</v-icon>
                    Наведите чтобы развернуть
                </button>
            </div>
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

    .code-container {
        display: flex;
        position: relative;
        flex-direction: column;
    }
    .code-container .expand-button {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        background: var(--text-primary);
        padding: 10px;
        border-radius: 0 0 10px 10px;
        align-items: center;

        transition: opacity 0.3s linear;
        justify-content: center;
    }
    .code-container.expanded .expand-button {
        transition: opacity 0.3s linear;
    }
    .code-container .expand-button button {
        color: var(--inversion-color);
        font-size: 12px;
        font-weight: 700;
    }

    .code-container .code-container-headers {
        display: flex;
        align-items: center;
        background-color: var(--text-primary);
        padding: 10px 15px;
        border-radius: 10px 10px 0 0;
        justify-content: space-between;
    }
    .code-container .code-container-headers .text {
        letter-spacing: 1px;
        font-family: "Roboto Mono", serif;
        color: #c08973;
        font-weight: 700;
        text-shadow: 2px 2px 5px rgba(192, 137, 115, 0.8);
    }

    .code-container .code-details {
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 10px;
        color: #fff;
        background-color: #242424;
        font-family: "Roboto Mono", serif;
        overflow-x: auto;
        transition: max-height 0.3s linear;
    }
    .code-container .code-details-text {
        padding: 10px 20px;
        color: #c08973;
        word-wrap: anywhere;
    }
    .code-container .code-details pre {
        padding: 20px;
    }
    .code-container .code-details span {
        font-size: v-bind(size);
    }
    .code-container .code-details-headers pre {
        padding: 10px 20px;
    }
    .code-container .code-details-headers {
        border-radius: 0 0 10px 10px;
    }
</style>