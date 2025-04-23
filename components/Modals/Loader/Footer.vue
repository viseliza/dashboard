<script setup lang="ts">
    type Props = {
        resultDetail: any;
        status: string;
    }
    const props = defineProps<Props>();
    const footerHovered = shallowRef(false);

    const resultText = computed(() => {
        if (props.status === 'fail') return 'Ошибка при выполнении запроса';
        if (props.status === 'success') return 'Успешное выполнение запроса';
        return '';
    });

    const resultPrimaryColor = computed(() => {
        if (props.status === 'fail') return 'rgba(var(--delete-color-rgb), 0.85)';
        if (props.status === 'success') return 'rgba(var(--accept-color-rgb), 0.85)';
        return 'rgba(var(--secondary-color-rgb), 0.85)';
    });

    const resultSecondaryColor = computed(() => {
        if (props.status === 'fail') return 'rgba(var(--delete-color-rgb), 0.15)';
        if (props.status === 'success') return 'rgba(var(--accept-color-rgb), 0.15)';
        return 'rgba(var(--secondary-color-rgb), 0.15)';
    });
</script>

<template>
    <footer 
        @mouseenter="footerHovered = true"
        @mouseleave="footerHovered = false"
        :class="{ 'hovered': footerHovered }"
        v-if="resultText"
    >
        <div v-if="resultDetail" class="content">
            <BaseCode
                :styles="{ 
                    backgroundColor: 'transparent',
                    borderRadius: '10px'
                }"  
                :preStyles="{ padding: '10px 20px' }"
                :data="resultDetail" 
            />
        </div>

        <div class="wrapper">
            <span class="title">
                {{ resultText }}
            </span>
        </div>
    </footer>

</template>

<style scoped lang="scss">
    footer {
        display: flex;
        height: 70px;
        position: relative;
        border-radius: 10px;
        width: 100%;
        border: 2px solid v-bind(resultPrimaryColor);
        background-color: v-bind(resultSecondaryColor);
    }
    footer .content {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        overflow-y: auto;
    }
    footer .wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(2px);
        background-color: v-bind(resultSecondaryColor);
        transform: translate(-50%, -50%) scale(1);
        border-radius: 10px;
        transition: all ease 0.3s;
    }
    footer.hovered .wrapper {
        transform: translate(-50%, -50%) scale(0);
    }
    footer .wrapper .title {
        font-size: 14px;
        font-weight: 700;
        color: v-bind(resultPrimaryColor);
    }
</style>