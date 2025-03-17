<script setup lang="ts">
    type Props = {
        stats: any;
        item: any;
        tableMode: string;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close']);
    console.log(props.item)

    const deleteItem = () => {
        console.log('deleteItem');
    }

    const cancel = () => {
        console.log('cancel');
    }

    const save = () => {
        console.log('save');
    }
</script>

<template>
    <ModalsCardContainer>
        <template #header>
            <ModalsCardHeader 
                :table-mode="(tableMode as 'accounts' | 'streaks')"
                :id="item.id"
                @close="emit('close')"
            />
        </template>
        
        <template #content>
            <slot name="content"></slot>
        </template>
        
        <template #footer-left>
            <ModalsCardControlButton 
                mdiIcon="mdi-trash-can-outline"
                textColor="var(--delete-color)"
                hoverTextColor="var(--inversion-color)"
                backgroundColor="var(--delete-color-rgb)"
                @click="deleteItem"
            >
                Удалить
            </ModalsCardControlButton>
        </template>

        <template #footer-right>
            <ModalsCardControlButton 
                textColor="var(--text-primary)"
                hoverTextColor="var(--inversion-color)"
                backgroundColor="var(--text-primary-rgb)"
                @click="cancel"
            >
                Отмена
            </ModalsCardControlButton>

            <ModalsCardControlButton 
                textColor="var(--text-primary)"
                hoverTextColor="var(--inversion-color)"
                backgroundColor="var(--text-primary-rgb)"
                @click="save"
            >
                Сохранить
            </ModalsCardControlButton>
        </template>
    </ModalsCardContainer>
</template>