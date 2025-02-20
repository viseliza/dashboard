<script setup lang="ts">
    import type { InputProps, InputTypeProps } from '~/types';
    
    const props = defineProps<InputProps & InputTypeProps>();
    const show = shallowRef(true);
    const model = defineModel<string>({ default: '' });

    const focus = shallowRef(false);
</script>

<template>
    <div class="input-box">
        <span class="input-box-label">{{ label }}</span>
        
        <div :class="['input-box-content', focus ? 'focus' : '']">
            <input 
                class="input-field" 
                v-model="model"
                :type="inputType == 'password' ? (show ? 'password' : 'text') : 'text'"
                :placeholder="'Введите свой ' + (inputType === 'password' ? 'пароль' : 'логин')"
                @focusin="focus = true"
                @focusout="focus = false"
            >
            <button 
                v-if="inputType == 'password'"
                class="input-button"
                :class="{ 'icon-active': !show }"
                @click.prevent="show = !show"
            >
                <v-icon>
                    {{ show ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    input {
        outline: none;
    }
    input::placeholder {
        color: #888;
    }

    .input-box-content {
        border-radius: 10px;
    }
</style>