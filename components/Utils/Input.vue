<script setup lang="ts">
    import { IconsDictionary } from '~/utils';

    const props = defineProps<{
        _key: string;
        params: any;
    }>();
    const model = defineModel<any>();

    const icon = IconsDictionary[props._key as keyof typeof IconsDictionary] || {
        'type': 'fa',
        'icon': 'fa-cube'
    };
    const value = ref('');

    const computedTitle = computed(() => {
        return props._key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    });
</script>

<template>
    <div class="field-container">
        <div class="field-container-title">
            <font-awesome-icon v-if="icon.type === 'fa'" :icon="icon.icon" />

            <v-icon v-else-if="icon.type === 'mdi'">{{ icon.icon }}</v-icon>

            <span>{{ computedTitle }}</span>
        </div>

        <div class="field-container-input">
            <input 
                type="text" 
                v-model="model"
                :placeholder="params.example"
            />
        </div>
    </div>
</template>


<style scoped lang="scss">
    .field-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .field-container-title {
        display: flex;
        align-items: center;
        width: 30%;
        gap: 15px;
    }
    .field-container-title .v-icon,
    .field-container-title .fa {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
    }
    .field-container-title .v-icon {
        filter: invert(72%) sepia(2%) saturate(1046%) hue-rotate(182deg) brightness(102%) contrast(87%);
        font-size: 20px;
    }
    .field-container-title svg {
        font-size: 16px;
        filter: invert(72%) sepia(2%) saturate(1046%) hue-rotate(182deg) brightness(102%) contrast(87%);
    }
    .field-container-title span {
        font-weight: 700;
        opacity: .4;
    }
    .field-container-input {
        flex: 1 1 auto;
    }
    .field-container-input input::-webkit-input-placeholder {
        color: var(--active-color);
    }
    .field-container-input input {
        outline: none;
        font-weight: 700;
        font-size: 12px;
        caret-color: var(--active-color);
        
        caret-shape:bar;
        border-radius: 5px;
        border: 1px solid var(--secondary-color);
        padding: 8px 10px;
        width: 100%;
        transition: all 0.3s ease-in-out;
    }
    .field-container-input input:focus {
        border-color: var(--active-color);
    }
</style>
