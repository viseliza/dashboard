<script lang="ts" setup>
    type Props = {
        stat: any;
        title: string;
    }
    const props = defineProps<Props>();

    const total = computed(() => Object
        .values(props.stat)
        .reduce((acc, curr) => (acc as number) + (curr as number), 0));

    const displayTitle = computed(() => props.title
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
</script>

<template>
    <StatsContainer>
        <template #charts>
            <StatsLineChart 
                v-for="(key, index) in Object.keys(stat)"
                :key="index"
                :value="stat[key]"
                :index="index"
                :total="total as number"
            />
        </template>

        <template #title>
            <BaseIcon :name="title" />

            {{ displayTitle }}
        </template>

        <template #content>
            <StatsDetail
                v-for="(stat, index) in Object.keys(props.stat)"
                :key="index"
                :title="stat"
                :index="index"
                :total="total as number"
                :value="props.stat[stat]"
            />
        </template>
    </StatsContainer>
</template>