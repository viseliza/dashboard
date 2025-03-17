<script lang="ts" setup>
    const props = defineProps<{
        title: string;
    }>();
    const show = defineModel<boolean>('showModal');
    const accept = defineModel<boolean>('accept');
</script>

<template>
    <ModalsConfirmContainer>
        <template #header>
            <h3>{{ props.title }}</h3>
        </template>

        <template #content>
            <slot></slot>
        </template>

        <template #footer>
            <ModalsConfirmButton 
                v-model:accept="accept"
                text="Отмена"
            />

            <ModalsConfirmButton 
                v-model:accept="accept"
                text="Подтвердить"
            />
        </template>
    </ModalsConfirmContainer>
</template>