<script setup lang="ts">
    import { CodeEditor } from '~/utils';
    type Props = {
        headers?: boolean;
        type?: 'highlight' | 'text';
        title?: string;
        size?: string;
        styles?: Record<string, string>;
        preStyles?: Record<string, string>;
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
    const expanded = shallowRef(false);
    
    const headersValue = computed(() => {
        return JSON.stringify(data.value, props.stringfy ? props.stringfy() : null, 4);
    });

    const expand = computed(() => {
        if (props.isExpandable) {
            return {
                container : {
                    maxHeight: expanded.value ? '100%' : '100px',
                    borderRadius: '10px',
                }, 
                button: {
                    opacity: expanded.value ? 0 : 0.6,
                }
            }
        }
        return {};
    });
</script>   

<template>
    <div 
        class="code-container"
        :style="{ boxShadow: !isExpandable ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px' : 'none' }"
        @mouseenter="expanded = true"
        @mouseleave="expanded = false"
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
                :style="{ fontSize: size, ...preStyles }"
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
                v-if="isExpandable && !expanded"
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
        font-family: "JetBrains Mono", serif;
    }
    .boolean,
    .null { color: var(--code-type-null); }
    .string { color: var(--code-type-string); }
    .number { color: var(--code-type-number); }
    .key { color: var(--code-type-key); }

    .code-container {
        display: flex;
        position: relative;
        flex-direction: column;
        border-radius: 10px;
    }
    .code-container .expand-button {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        background: var(--inversion-color);
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
        font-size: 12px;
        font-weight: 700;
    }

    .code-container .code-container-headers {
        display: flex;
        align-items: center;
        background-color: var(--secondary-color);
        border-bottom: 1px solid var(--inversion-color);
        padding: 5px 15px;
        border-radius: 10px 10px 0 0;
        justify-content: space-between;
    }
    .code-container .code-container-headers .text {
        letter-spacing: .5px;
        font-family: "Roboto Mono", serif;
        color: #c08973;
        font-weight: 700;
    }
    .code-container .code-details {
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 10px;
        background-color: var(--code-bg);
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