<script setup lang="ts">
    import type { InputProps } from '~/types';
    
    const props = defineProps<InputProps>();
    const emit = defineEmits(['update:modelValue']);

    const updateValue = (value: string) => {
        emit('update:modelValue', value);
    };
</script>

<template>
    <v-text-field 
        :label="label"
        :model-value="modelValue"
        @update:model-value="updateValue"
    ></v-text-field>
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