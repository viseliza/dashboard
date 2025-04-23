<script setup lang="ts">
    import type { LoaderModel } from '~/types';
    type Props = {
        loading: LoaderModel;
    }
    const props = defineProps<Props>();
    const emit = defineEmits(['close']);

    const headerText = computed(() => {
        if (props.loading.status === 'fail') return 'Ошибка';
        if (props.loading.status === 'success') return 'Успех';
        return 'Загрузка';
    });

    const detailsText = computed(() => {
        if (props.loading.description) return props.loading.description;
        if (props.loading.process) return 'Пожалуйста, подождите окончания загрузки...';
        if (props.loading.status === 'fail') return 'Произошла какая-то ошибка, проверьте данные и попробуйте еще раз';
        if (props.loading.status === 'success') return 'Данные успешно сохранены и отправлены на сервер';
        return '';
    });
</script>

<template>
    <ModalsLoaderContainer>
        <template #status-circle>
            <ModalsLoaderStatusCircle
                :status="loading.status"
            />
        </template>

        <template #status-text>
            <ModalsLoaderStatusText
                :header-text="headerText"
                :details-text="detailsText"
            />
        </template>

        <template #status-button>
            <ModalsLoaderStatusButton
                :status="loading.status"
                :process="loading.process"
                @close="emit('close')"
            />
        </template>

        <template #close>
            <DashboardClose 
                @close="emit('close')"
            />
        </template>

        <template #task-name>
            {{ loading.task }}
        </template>

        <template #data>
            <ModalsLoaderInitialData
                :data="loading.data"
                :model="loading.model"
            />
        </template>

        <template #footer>
            <ModalsLoaderFooter
                :result-detail="loading.resultDetail"
                :status="loading.status"
            />
        </template>
    </ModalsLoaderContainer>
</template>
