<script setup lang="ts">
    import durak from '~/assets/images/logos/durak.svg';
    import pennoe from '~/assets/images/logos/pennoe-logo.svg';
    
    const props = defineProps<{
        category: string;
        changedKeys: string[];
        countChangedKeys: number;
    }>();
    const activeCategory = defineModel<string>('activeCategory', {
        type: String,
        required: true,
    });
    
    const transalte = {
        'durak': durak,
        'pennoe': pennoe,
        'logs': 'mdi-file-cog-outline',
        'RUR': 'mdi-flask-empty-outline',
        'PIGFARM_MARKET': 'mdi-pig'
    }

    const title = props.category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
</script>

<template>
    <button 
        class="category-container"
        @click="activeCategory = props.category"
        :class="{ 'active': activeCategory === props.category }"
    >
        <div class="category-container-button">
            <v-icon 
                v-if="transalte[props.category as keyof typeof transalte].split('-')[0] === 'mdi'" 
                :icon="transalte[props.category as keyof typeof transalte]" 
            />
            <img 
                v-else 
                :src="transalte[props.category as keyof typeof transalte]" 
            >
            
            <h2>{{ title }}</h2> 
        </div>

        <div 
            v-if="countChangedKeys > 0"
            class="category-container-count"
        >
            <h2>{{ countChangedKeys }}</h2>
        </div>
    </button>
</template>

<style scoped>
    .category-container {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        transition: all 0.3s ease;
    }
    .category-container-button {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .category-container:hover {
        background-color: rgba(var(--active-color-rgb), 0.05);
    }
    .category-container.active {
        background-color: rgba(var(--active-color-rgb), 0.1);
    }
    .category-container.active:before {
        content: '';
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--active-color);
    }
    .category-container img {
        width: 24px;
        height: 24px;
    }
    .category-container h2 {
        font-size: 14px;
        font-weight: 500;
    }
    .category-container-count {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        background-color: rgba(var(--active-color-rgb), 0.9);
    }
    .category-container-count h2 {
        color: var(--inversion-color);
        font-size: 12px;
        font-weight: 700;
    }
</style>
