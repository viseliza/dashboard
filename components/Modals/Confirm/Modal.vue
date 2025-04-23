<script lang="ts" setup>
    type Props = {
        title: string;
        confirmation?: boolean;
    }
    const props = defineProps<Props>();
    
    const emit = defineEmits(['accept']);
    const disabled = computed(() => {
        if (props.confirmation === undefined) {
            return false;
        } else {    
            return !props.confirmation;
        }
    });
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
                @click="emit('accept', false)"
                text="Отмена"
            />

            <ModalsConfirmButton 
                @click="emit('accept', true)"
                :disabled="disabled"
                text="Подтвердить"
            />
        </template>
    </ModalsConfirmContainer>
</template>