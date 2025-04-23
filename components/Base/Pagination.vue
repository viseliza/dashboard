
<script lang="ts" setup>
    import type { PaginationParams } from '~/types';
    import { Pagination, QueryParams, calculatePages } from '~/utils';
    
    type Props = {
        totalPages: number;
    }
    const props = defineProps<Props>();
    
    const route = useRoute();
    
    const currentPage = shallowRef(route.query.page 
        ? isNaN(route.query.page as any) ? 1 : Number.parseInt(route.query.page as string)
        : 1);

    const paginations = shallowRef(calculatePages(currentPage.value, props.totalPages ?? 0));

    const pagination = new Pagination();
    pagination.use('digit', new DigitStrategy());
    pagination.use('arrow', new ArrowStrategy());
    pagination.use('points', new PointsStrategy());

    function handleClick(opts: PaginationParams) {
        const res = pagination.getPage(opts._class.split(' ')[0], opts);

        QueryParams.updateQueries({ 
            page: res 
        });
    }

    watch(() => props.totalPages, (newValue) => {
        paginations.value = calculatePages(currentPage.value, newValue || 0);
    });

    watch(() => route.query.page, (newValue) => {
        currentPage.value = isNaN(newValue as any) ? 1 : Number.parseInt(newValue as string);
        paginations.value = calculatePages(currentPage.value, props.totalPages || 0);
    });
</script>

<template>
    <div v-if="totalPages" class="pagination">
        <ul>
            <li
                v-for="{ content, _class } in paginations"
                :key="content"
                :class="_class"
            >
                <button 
                    :class="_class" 
                    @click="handleClick({ content, _class, currentPage })"
                >
                    <span v-if="_class.indexOf('digit') !== -1 || _class.indexOf('points') !== -1">
                        {{ content }}
                    </span>

                    <v-icon v-else-if="_class.indexOf('arrow') !== -1">
                        {{ content }}
                    </v-icon>
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .pagination {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 15px 0;
        border-radius: 5px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border: 1px solid var(--secondary-color);
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }
    ul li {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul li button {
        padding: 4px 10px;
        margin: 8px;
        border-radius: 5px;
        transition: all .3s;
    }
    ul li:not(.active):hover button {
        color: var(--text-primary);
        opacity: .3;
    } 
    li button.arrow {
        padding: 0;
        animation: fadein .5s;
    }
    li.active button {
        font-weight: 700;
        background-color: var(--text-secondary);
        color: var(--inversion-color);
    }
    @keyframes fadein {
        from {opacity: 0;}
        to {opacity: 1;}
    }
</style>