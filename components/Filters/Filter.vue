<script lang="ts" setup>
    type Props = {
        title: string;
        name: string;
        className?: string;
        style?: Record<string, string>;
        isActive?: boolean;
        isMode?: boolean;
        disabled?: boolean;
        dropdownItems?: {
            title: string;
            value: string;
            active?: boolean;
        }[];
    }
    const props = withDefaults(defineProps<Props>(), {
        isMode: false,
        isActive: false
    });
    const showDropdown = shallowRef(false);
    const type = computed(() => iconsDictionary[props.name as keyof typeof iconsDictionary].type);
</script>

<template>
    <div 
        class="filter-container"
        :style="style"
    >
        <TooltipsModeContent
            v-if="!disabled"
            stop
            @click="showDropdown = !showDropdown"
            :name="title"
            :isActive="isActive"
            :isExpanded="showDropdown"
            :isMode="isMode"
        >
            <BaseIcon
                :name="name"
                :styles="{
                    width: '14px',
                    fontSize: '16px',
                    height: '14px',
                }"
            />
        </TooltipsModeContent> 

        <div 
            v-else
            :style="{ gap: type === 'fa' ? '10px' : '5px' }"
            :class="['filter', 'disabled', className]"
        >
            <div class="filter-icon">
                <BaseIcon :name="name"/>
            </div>
                
            <span class="title">
                {{ title }}
            </span>
        </div>
    
        <transition name="fade">
            <FiltersDropDown
                :name="name"
                :title="title"
                :dropdownItems="dropdownItems"
                v-model:show-dropdown="showDropdown"
            />            
        </transition>
    </div>
</template>

<style scoped>
    .filter-container {
        position: relative;
        display: flex;
    }
    .filter-container_active {
        position: relative;
    }
    .filter {
        padding: 0;
        display: flex;
        white-space: nowrap;
        flex-direction: row;
        width: 100%;
        align-items: center;
        gap: 10px;
    }
    .filter.disabled {
        cursor: default;
    }
    .filter .title {
        font-size: 14px; 
        transition: all 0.3s linear;
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .2s linear;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>