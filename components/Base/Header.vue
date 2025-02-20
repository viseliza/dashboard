<script lang="ts" setup>
    type Props = {
        count: number;
        title: string;  
    }
    defineProps<Props>();
    const route = useRoute();
    const router = useRouter();

    function buttonClick(event: any) {
        const prevQueries = route.query;
        const prevMode = route.query.mode || 'accounts';
        delete prevQueries['mode'];
        
        const result = JSON.parse(JSON.stringify({ 
            ...prevQueries,
            mode: prevMode === 'accounts' ? 'streaks' : 'accounts' 
        }));
        
        router.push({
            path: route.path,
            query: { ...result }
        });
    }
</script>


<template>
    <header>
        <section class="left">
            <h1>{{ title }}</h1>

            <button 
                @click="buttonClick"
                class="mode-swap"
            >
                <v-icon>mdi-swap-vertical</v-icon>
            </button>
            
            <div class="count-container">
                <span>{{ count }} аккаунт</span>
            </div>
        </section>
        
        <div class="right">
            <slot>
            </slot>
        </div>
    </header>
</template>


<style scoped>
    header {
        padding: 10px 20px;
        border: 1px solid var(--secondary-color);
        border-bottom: 0;
        border-radius: 15px 15px 0 0;
        background-color: var(--inversion-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
    }
    header .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
    header .left h1 {
        font-size: 18px;
        font-weight: 700;
    }
    header .left .mode-swap {
        padding: 4px;
        border: 2px solid var(--secondary-color);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .3s;
    }
    header .left .mode-swap:hover {
        border: 2px solid var(--text-secondary);
        background-color: var(--secondary-color);
    }
    header .left .count-container {
        margin-left: 10px;
        border: 1px solid var(--text-secondary);
        padding: 1px 8px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--secondary-color);
    }
    header .left .count-container span {
        font-size: 12px;
        padding-left: 5px;
        opacity: .7;
        position: relative;
    }
    header .left .count-container span::before {
        position: absolute;
        content: '';
        left: -4px;
        bottom: 7px;
        z-index: 10;
        border-radius: 50%;
        width: 4px;
        height: 4px;
        background-color: var(--text-primary);
        opacity: .7;
    }
    header .right {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
</style>