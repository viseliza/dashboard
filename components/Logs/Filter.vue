<script lang="ts" setup>
    import { QueryParams } from '~/utils';

    const props = defineProps<{
        iconType: string;
        icon: string;
        title: string;
        name: string;
        className?: string;
        activeCount?: number;
        dropdownItems?: {
            title: string;
            value: string;
            active?: boolean;
        }[];
    }>();
    ;
    const showDropdown = shallowRef(false);
    const icons = {
        'asc': 'mdi-sort-ascending',
        'desc': 'mdi-sort-descending',
        'info': 'mdi-information-variant-circle-outline',
        'warning': 'mdi-alert-circle-outline',
        'error': 'mdi-close-circle-outline',
        'debug': 'mdi-bug-outline',
    }

    const iconComputed = (value: string) => {
        return icons[value.toLowerCase() as keyof typeof icons] || '';
    };
</script>

<template>
    <div class="filter-container">
        <button 
            :style="{ gap: iconType === 'fa' ? '10px' : '5px' }"
            :class="['filter', className]"
            @click="showDropdown = !showDropdown"
        >
            <div class="filter-icon">
                <font-awesome-icon v-if="iconType === 'fa'" :icon="icon" />
    
                <v-icon v-else :icon="icon" />
            </div>
                
            <span class="filter-title">{{ title }}</span>
    
            <div class="filter-count" v-if="activeCount">
                <span>{{ activeCount }}</span>
            </div>
        </button>
    
        <transition name="fade">
            <div v-if="showDropdown && dropdownItems" class="filter-dropdown">
                <button
                    @click="QueryParams.updateQueries({ 
                        [name]: item.value 
                    })" 
                    class="filter-dropdown-item" 
                    v-for="item in dropdownItems" 
                    :key="item.value"
                >
                    <div 
                        class="filter-dropdown-item-content"
                        :class="{ 'active': !iconComputed(item.value)}"
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

                    <v-icon v-if="item.active" style="font-size: 18px; color: var(--active-color);">
                        mdi-check
                    </v-icon>
                </button>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .filter-container {
        position: relative;
    }
    .filter {
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .filter .filter-title {
        font-size: 14px;
        display: inline-block; 
        vertical-align: middle;
        font-weight: 700;
    }
    .filter.border-right {
        border-right: 2px solid var(--secondary-color);
        padding-right: 15px;
    }
    .filter.border-left {
        border-left: 2px solid var(--secondary-color);
        padding-left: 15px;
    }
    .filter.padding-right {
        padding-right: 15px;
    }
    .filter.padding-left {
        padding-left: 15px;
    }
    .filter-icon {
        display: grid;
        justify-content: center;
        grid-template-columns: 1fr auto;
        align-items: center;
    }
    .filter-count {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--active-color);
        border-radius: 50%;
        width: 20px;
        height: 20px;
    }
    .filter-count span {
        font-size: 12px;
        color: var(--inversion-color);
        font-weight: 700;
    }

    /** Filter dropdown **/
    .filter-dropdown {
        position: absolute;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        top: calc(100% + 10px);
        left: 0;
        padding: 5px;
        max-height: 400px;
        overflow-y: auto;
        border-radius: 10px;
        background-color: var(--secondary-color);
        z-index: 1000;
        display: flex;
        flex-direction: column;
    }
    .filter-dropdown-item {
        padding: 8px 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all .3s linear;
        justify-content: space-between;
    }
    .filter-dropdown-item-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .filter-dropdown-item-content.active {
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
    .filter-dropdown-item.active {
        background-color: var(--inversion-color);
    }
    .filter-dropdown-item:hover {
        background-color: var(--inversion-color);
    }
    .filter-dropdown-item:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .filter-dropdown-item:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .2s linear;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>