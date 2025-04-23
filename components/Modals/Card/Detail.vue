<script lang="ts" setup>
    type Props = {
        name: string;
        value: string;
    }
    const props = defineProps<Props>();

    const convertDate = (date: string) => {
        return date !== '—'
            ? new Date(formattedDateString(date)).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
            : 'Нет';
    }

    const formattedDateString = (value: string) => {
        return value.replace(
            /(\d{2})\.(\d{2})\.(\d{4}), (\d{2}:\d{2}:\d{2})/,
            '$3-$2-$1T$4'
        );
    }


    const displayValue = computed(() => {
        const splited = props.name.split('_');

        if (splited.length > 1 && splited[1] === 'at') 
            return convertDate(props.value);

        return props.value;
    });

    const displayName = computed(() => {
        const splited = props.name.split('_');
        return splited.map((item, index) => {
            if (index === 0) return item.charAt(0).toUpperCase() + item.slice(1);
            return item;
        }).join(' ');
    });
</script>

<template>
    <div class="detail-container">
        <span class="name">{{ displayName }}</span>
        <span class="value">{{ displayValue }}</span>
    </div>
</template>

<style scoped lang="scss">
    .detail-container {
        min-width: 80px;
        display: flex;
        flex-direction: column;
        padding: 0 15px;
        border-right: 1px solid var(--secondary-color);

        &:first-child {
            padding-left: 0px;
        }
        &:last-child {
            border-right: none;
        }
    }
    .detail-container .name {
        font-size: 12px;
        font-weight: 700;
        color: var(--text-secondary);
    }
    .detail-container .value {
        font-weight: 700;
    }
</style>