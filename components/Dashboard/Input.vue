<script setup lang="ts">
    type Props = {
        modelValue?: string
    }

    const props = defineProps<Props>();
    const model = defineModel<string>({ default: '' });

    const focus = shallowRef(false);
</script>

<template>
    <div 
        class="input-box"
        :class="{ active: focus }"
    >   
        <v-icon class="search">
            mdi-magnify
        </v-icon>

        <input 
            v-model="model"
            placeholder="Поиск"
            @focusin="focus = true"
            @focusout="focus = false"
        >

        <div class="shortcust">
            <v-icon class="command">
                mdi-apple-keyboard-command
            </v-icon>
            
            <v-icon class="e-button">
                mdi-alpha-e
            </v-icon>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .input-box {
        display: flex;
        position: relative;
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }
    .input-box.active .shortcust {
        display: none;
    }
    .input-box input {
        padding: 5px;
        margin-left: 26px;
        outline: none;
    }
    .input-box .v-icon.search {
        position: absolute;
        left: 5px;
        bottom: 4px;
        color: var(--border-color);
    }

    .input-box .shortcust {
        position: absolute;
        display: flex;
        gap: 3px;
        align-items: center;
        bottom: 6px;
        right: 5px;
    }
    .input-box .shortcust .v-icon {
        background-color: var(--border-color);
        border-radius: 4px;
        color: var(--text-secondary);
    }
    .input-box .shortcust .v-icon.command {
        font-size: 12px;
        padding: 9px;
    }
    .input-box .shortcust .v-icon.e-button {
        font-size: 18px;
    }

    input::placeholder {
        color: #888;
    }
</style>