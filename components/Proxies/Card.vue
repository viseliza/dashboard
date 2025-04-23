<script lang="ts" setup>
    import { ProxyAPI } from '~/api';
    import { Tokens, type Proxy } from '~/models';

    const props = defineProps<{
        proxy: Proxy
    }>();

    const data = ref<any>({});

    const isHover = shallowRef<boolean>(false);
    const showModal = shallowRef<boolean>(false);
    const showConfirmModal = shallowRef<boolean>(false);
    const acceptDelete = shallowRef<boolean | undefined>(undefined);
    const showNotification = shallowRef<boolean>(false);
    const proxyHelper = new ProxyHelper(
        props.proxy.id, 
        props.proxy, 
        true
    );
    const emit = defineEmits<{(e: 'dataChanged'): void;}>();

    const deleteProxy = () => {
        showConfirmModal.value = true;
    }
    watch(data, () => {
        emit('dataChanged');
    });

    watch(acceptDelete, (value) => {
        if (value) {
            new ProxyAPI('').delete(props.proxy.id, Tokens.getTokens().access_token);
            emit('dataChanged');
        }
        acceptDelete.value = undefined;
        showConfirmModal.value = false;
    });
</script>

<template>
    <div 
        class="card-container" 
        :class="{ 'hover': isHover }"
        @mouseenter="isHover = true" 
        @mouseleave="isHover = false"
    >
        <ProxiesHeader :proxy="proxy" />

        <div class="card-body">
            <ProxiesCategory 
                v-for="category in Object.keys(proxyHelper.categories).filter((key) => key !== 'Основные')"
                :key="category"
                :params="proxyHelper.categories[category as keyof Categories] as any"
                :title="category"
                :proxy="proxy"
            />
        </div>

        <div class="card-footer">
            <button @click="showModal=true">Обновить</button>
        </div>

        <button
            class="delete-button"
            :class="{ 'show': isHover }"
            @click="deleteProxy"
        >
            <v-icon>mdi-trash-can</v-icon>
        </button>
    </div>

    <transition mode="default" name="fade"> 
        <Teleport 
            v-if="showNotification" 
            to='#notification'
    >
            <BaseNotification 
                detail="Обновление данных"
                message="На данной странице данные не обновляются. Чтобы посмотреть изменения - обновите страницу."
                :code="101" 
                @close="showNotification = false"
            />
        </Teleport>
    </transition>


    <Teleport 
        to="#modal" 
        v-if="showConfirmModal"
    >
        <ModalsConfirmModal 
            @accept="(value) => acceptDelete = value"
            title="Подтверждение удаления прокси"
            :confirmation="undefined"
        >
            <span>Вы действительно хотите удалить прокси? После подтверждения удаления, вы не сможете восстановить данную запись. Чтобы отменить действие, нажмите на кнопку "<b>Отмена</b>".</span>
        </ModalsConfirmModal>
    </Teleport>

    <Teleport 
        to="#modal" 
        v-if="showModal"
    >
        <ModalsControlModal 
            @close="showModal = false"
            title="Обновление прокси"
        >
            <template #content>
                <ModalsControlForm
                    name="Создание прокси"
                    model="Прокси"
                    @close="showModal = false"
                    v-model:data="data"
                    :with-categories="true"
                    :api="new ProxyAPI('')"
                    :call="new ProxyAPI('').update"
                    :params="proxyHelper.proxyParams"
                    :get-params="proxyHelper.getUpdateParams"
                    :helper="proxyHelper"
                    :styles="{
                        'padding': '0',
                        'padding-top': '15px',
                        'gap': '0',
                        'max-height': '580px',
                        'overflow-y': 'auto',
                    }"
                />
            </template>
        </ModalsControlModal>
    </Teleport>
</template>

<style scoped>
    .card-container {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1 1 calc(50% - 10px);
        max-width: calc(50% - 10px);
        border: 1px solid var(--secondary-color);
        border-radius: 15px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    @media (max-width: 600px) {
        .card-container {
            flex: 1 1 100%;
            max-width: 100%;
        }
    }
    @media (min-width: 1800px) {
        .card-container {
            flex: 1 1 calc(33% - 10px);
            max-width: calc(33% - 10px);
        }
    }
    .card-container .delete-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(230, 0, 0, 1);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        z-index: 3;
        justify-content: center;
        width: 35px;
        height: 35px;
        transform: translateY(-15px);
        opacity: 0;
        transition: background-color 0.3s linear, transform .3s ease-in-out, opacity .3s ease-in-out;
    }
    .card-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 15px;
        background: radial-gradient(circle at 98% 0%, #e74343, #f7d9d9 12%, #fff 20.1%);
        opacity: 0; /* Начальная прозрачность */
        transition: opacity 0.5s ease; /* Плавный переход для прозрачности */
        z-index: 0; /* Устанавливаем ниже других элементов */
    }
    .card-container.hover::before {
        opacity: 1; /* Полная непрозрачность при наведении */
    }
    .card-container .delete-button.show {
        transform: translateY(0);
        opacity: 1;
    }
    .card-container .delete-button .v-icon {
        color: var(--secondary-color);
    }
    .card-container .delete-button:hover {
        background-color: rgba(190, 0, 0, 1);
        cursor: pointer;
    }
    .card-container .card-body {
        padding: 15px; 
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 10px));
        row-gap: 15px;
        column-gap: 10px;
    }
    .card-container .card-footer {
        display: flex;
        background-color: var(--secondary-color);
        border-radius: 0 0 15px 15px;
        z-index: 2;
        justify-content: center;
        transition: background-color 0.3s linear, color 0.3s linear;
    }
    .card-container .card-footer:hover {
        cursor: pointer;
        background-color: var(--text-secondary);
        color: var(--inversion-color);
    }
    .card-container .card-footer button {
        font-weight: 700;
        z-index: 2;
        padding: 10px;
        flex: 1 1 auto;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s linear;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>