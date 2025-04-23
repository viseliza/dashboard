<script setup lang="ts">
    type Props = {
        title: string;
        styles?: Record<string, string>;
        contentStyles?: Record<string, string>;
    }
    const props = defineProps<Props>();
    const open = shallowRef(true);
</script>

<template>
    <div 
        class="category-container" 
        :style="styles"
        :class="{
            'open': open,
            'closed': !open,
        }"
    >
        <section class="header">
            <h2>{{ title }}</h2>

            <div class="line"/>

            <button @click="open = !open">
                <v-icon>
                    mdi-chevron-down
                </v-icon>
            </button>
        </section>

        <div 
            class="content" 
            :style="contentStyles"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .category-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .category-container.closed {
        gap: 0;
    }
    .category-container .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }
    .category-container h2 {
        font-size: 16px;
        font-weight: 700;
    }
    .category-container .line {
        height: 1px;
        margin: 0 20px;
        background-color: var(--text-secondary);
        opacity: 0.7;
        width: 100%;
    }
    .category-container .header button .v-icon {
        transition: transform 0.3s linear;
    }
    .category-container.closed .header button .v-icon {
        transform: rotate(90deg);
    }

    .category-container .content {
        display: flex;
        flex-direction: column;
    }
    .category-container.open .content {
        max-height: 100%;
        animation: expand 0.3s linear;
    }
    .category-container.closed .content {
        overflow-y: hidden;
        max-height: 0px;
        animation: collapse 0.3s linear;
    }
    @keyframes expand {
        from {
            max-height: 0px;
        }
        30% {
            max-height: 100px;
        }
        to {
            max-height: 100%;
        }
    }
    @keyframes collapse {
        from {
            max-height: 100%;
        }
        30% {
            max-height: 100px;
        }
        to {
            max-height: 0px;
        }
    }
</style>
