<script lang="ts" setup>
    import type { InputProps } from '~/types';
    
    const props = withDefaults(defineProps<InputProps>(), {
        title: "login",
        placeholder: "Логин",
        value: ref("")
    });
    
</script>

<template>
    <v-text-field label="Another input"></v-text-field>
</template>

<style lang="scss" scoped>
    .v-text-field {
        ::v-deep .v-field, ::v-deep .v-label {
            font-size: 14px;
        }
        
        ::v-deep .v-label.v-field-label--floating {
            font-size: 10px;
        }

        ::v-deep .v-field__outline {
            display: none;
        }

        ::v-deep .v-field__overlay {
            border-radius: 5px;
        }
    }
</style>