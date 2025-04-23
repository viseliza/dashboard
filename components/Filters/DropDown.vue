<script setup lang="ts">
    type Props = {
        name: string;
        title: string;
        dropdownItems?: any[];
    }

    const props = defineProps<Props>();
    const showDropdown = defineModel('showDropdown');

    const icons = {
        'asc': 'mdi-sort-ascending',
        'desc': 'mdi-sort-descending',
        'info': 'mdi-information-variant-circle-outline',
        'warning': 'mdi-alert-circle-outline',
        'error': 'mdi-close-circle-outline',
        'debug': 'mdi-bug-outline',
    }
    const iconComputed = (value: string) => icons[value.toLowerCase() as keyof typeof icons] || '';

    const search = ref<any>(null);
    const filteredItems = computed(() => {
        if (!search.value || !search.value.filteredArray.length) return props.dropdownItems;
        return search.value.filteredArray;
    });
    
    const dropdownRef = ref(null);
    useDetectOutsideClick(dropdownRef, () => {
        if (dropdownRef.value) {    
            showDropdown.value = false;
        }
    });

    const handleClick = (value: string) => {
        const route = useRoute();
        route.query[props.name] && route.query[props.name] == value
            ? QueryParams.removeQuery(props.name)
            : QueryParams.updateQueries({ 
                [props.name]: value 
            });
        showDropdown.value = false;
    }
</script>   

<template>
    <div
        ref="dropdownRef" 
        v-if="showDropdown && dropdownItems" 
        class="filter-dropdown"
    >
        <FiltersSearch 
            ref="search"
            :array="dropdownItems"
            :placeholder="'Найти ' + title.toLowerCase()"
        />

        <div class="filter-dropdown-items">
            <button
                @click="handleClick(item.value)" 
                class="filter-dropdown-item" 
                v-for="item in filteredItems" 
                :key="item.value"
            >
                <div 
                    class="filter-dropdown-item-content"
                    :class="{ 'column': !iconComputed(item.value), 'active': item.active }"
                >
                    <v-icon v-if="iconComputed(item.value)">
                        {{ iconComputed(item.value) }} 
                    </v-icon>

                    <span
                        class="filter-dropdown-item-content-value"
                        v-else
                    >
                        {{ item.value }}
                    </span>

                    <span>
                        {{ item.title }}
                    </span>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
    /** Filter dropdown **/
    .filter-dropdown {
        position: absolute;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
        top: calc(100% + 5px);
        gap: 2px;
        left: 50%;
        transform: translateX(-50%);
        min-width: 200px;
        padding: 5px;
        max-height: 300px;
        overflow-y: auto;
        border-radius: 10px;
        background-color: var(--secondary-sub-color);
        z-index: 1000;
        display: flex;
        flex-direction: column;
    }
    .filter-dropdown-items {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    .filter-dropdown-item {
        padding: 8px 10px;
        background-color: var(--inversion-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all .3s linear;
        justify-content: space-between;
    }
    .filter-dropdown-item:hover {
        background-color: rgba(var(--active-color-rgb), .05);
    }
    .filter-dropdown-item-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .filter-dropdown-item-content.active {
        color: var(--active-color);
    }
    .filter-dropdown-item-content.column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
    }
    .filter-dropdown-item-content span {
        text-wrap: nowrap;
    }
    .filter-dropdown-item-content-value {
        font-size: 12px;
        opacity: .5;
    }
    
</style>