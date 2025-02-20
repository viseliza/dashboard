<script lang="ts" setup>
    type Props = {
        name: string;
        title: string;
    }
    const props = defineProps<Props>();
    const route = useRoute();
    const router = useRouter();
    const sort = shallowRef(route.query.order && route.query.filter_by && route.query.filter_by == props.name ? route.query.order : "");

    function buttonClick(event: any) {
        const prevQueries = route.query;
        const prevOrder = prevQueries['order'];
        const prevFilterBy = prevQueries['filter_by'];
        
        let newFilter: string;

        if (prevFilterBy === props.name) {
            sort.value = prevOrder === 'ASC' ? 'DESC' : 'ASC';
            newFilter = prevFilterBy;
        } else {
            sort.value = 'DESC';
            newFilter = props.name;
        }
        delete prevQueries['filter_by'];
        delete prevQueries['order']
        
        const result = JSON.parse(JSON.stringify({ 
            ...prevQueries,
            filter_by: props.name,
            order: sort.value
        }));

        router.push({
            path: route.path,
            query: { ...result },
            replace: true
        });
    }
</script>

<template>
    <td>
        <span>
            {{ title }}
        </span>

        <button @click="buttonClick">
            <v-icon v-if="sort == 'DESC'">
                mdi-menu-down
            </v-icon>
            <v-icon v-else-if="sort == 'ASC'">
                mdi-menu-up
            </v-icon>
            <v-icon v-else>
                mdi-menu-swap
            </v-icon>
        </button>
    </td>
</template>

<style scoped>
    td {
        padding: 10px;
        align-items: center;
        gap: 5px;
        border: 1px solid var(--secondary-color);
        font-weight: bold;
        font-size: 13px;
        background-color: var(--secondary-sub-color);
        opacity: .5;
    }
</style>