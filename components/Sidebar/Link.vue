<script lang="ts" setup>
    type Props = {
        createItem: {
            show: boolean;
            name: string;
            data: any;
        };
        item: {
            rus: string;
            eng?: string;
            path?: string | boolean;
            add?: boolean;
            icon?: string;
        };
    };
    const props = defineProps<Props>();
    const emit = defineEmits(['click']);
    const hovered = shallowRef(false);
    const route = useRoute();

    const active = computed(() => {
        if (!props.item.eng) return false;
        return route.path.split('/')[2].indexOf(props.item.eng) !== -1;
    });
</script>

<template>
    <div
        class="nav-item"
        :key="item.rus"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        :class="{ 
            'active': active,
            'hovered': hovered
        }"
    >   
        <NuxtLink 
            v-if="item.eng"
            :to="'/dashboard/' + item.eng" 
            class="left"
        >
            <div class="img-container">
                <slot>
                    <font-awesome-icon v-if="!item.path && item.icon" :icon="item.icon" />
                    <img class="img" v-else :src="(item.path as string)" alt="">
                </slot>
            </div>
            <span>{{ item.rus }}</span>
        </NuxtLink>

        <button 
            v-else 
            class="left"
            @click="emit('click')"
        >
            <div class="img-container">
                <slot>
                    <font-awesome-icon v-if="!item.path && item.icon" :icon="item.icon" />
                    <img class="img" v-else :src="(item.path as string)" alt="">
                </slot>
            </div>
            <span>{{ item.rus }}</span>
        </button>

        <button 
            v-if="item.add" 
            class="right"
            @click="() => {
                createItem.show = true;
                createItem.name = item.rus;
            }"
        >
            <v-icon>
                mdi-plus
            </v-icon>
        </button>
    </div>
</template>

<style lang="scss">
    .nav-item {
        display: flex;
        justify-content: space-between;
        align-items: center;    
        border-radius: 10px;
        position: relative;
    }
    .nav-item.active::before {
        content: '';
        position: absolute;
        top: 0;
        left: -25px;
        border-radius: 10px;
        width: 4px;
        height: 100%;
        background: var(--text-primary);
    }

    /*****************/
    /**** L E F T ****/
    /*****************/
    .sidebar-container .nav-item .left {
        display: flex;
        align-items: center;
        gap: 15px;
        flex: 1 1 auto;
    }
    .sidebar-container .nav-item .left:hover,
    .sidebar-container .nav-item .right:hover {
        cursor: pointer;
    }
    .sidebar-container .nav-item .left:hover > span,
    .sidebar-container .nav-item.active .left span {
        color: var(--text-primary);
    }
    .sidebar-container .nav-item .left .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sidebar-container .nav-item .left .img,
    .sidebar-container .nav-item .left svg,
    .sidebar-container .nav-item .left .v-icon {
        font-size: 20px;
        max-width: none;
        transition: 0.5s;
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
        filter: invert(66%) sepia(0%) saturate(11%) hue-rotate(156deg) brightness(95%) contrast(93%);
    }
    .sidebar-container .nav-item
    .sidebar-container .nav-item.hovered .left svg,
    .sidebar-container .nav-item.hovered .left .v-icon,
    .sidebar-container .nav-item.hovered .left .img,
    .sidebar-container .nav-item.active > .left .img-container .img,
    .sidebar-container .nav-item.active > .left .img-container svg,
    .sidebar-container .nav-item.active > .left .img-container .v-icon {
        color: var(--text-primary);
        filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%);
    }
    .sidebar-container .nav-item .left span {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-secondary);
        transition: 0.5s;
    }
    /*******************/
    /**** R I G H T ****/
    /*******************/
    .sidebar-container .nav-item .right {
        background-color: var(--secondary-color);
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
    .sidebar-container .nav-item .right .v-icon {
        font-size: 16px;
    }

</style>