<script setup lang="ts">
    type Props = {
        data: any;
        model: string;
    }
    const props = defineProps<Props>();
    const showDetails = reactive({
        index: 0,
        show: false
    });
</script>

<template>
    <div class="wrapper">
        <div
            v-if="Array.isArray(data)"
            class="container"
        >
            <div 
                v-for="(item, index) in data"
                :key="index"
                class="data"
                :class="{ 
                    active: showDetails.index === index && showDetails.show === true, 
                    not_active: showDetails.index !== index && showDetails.show === false
                }"
            >
                <button 
                    @click="showDetails.index = index; showDetails.show = !showDetails.show"
                    class="data-title"
                >
                    <span class="title">{{ model }}</span>
    
                    <v-icon>mdi-chevron-down</v-icon>
                </button>
    
                <div class="details">
                    <BaseCode :data="item" />
                </div>
            </div>
        </div>
    
        <div 
            v-else
            class="container"
        >
            <div 
                class="data"
                :class="{ 
                    active: showDetails.index === 0 && showDetails.show === true, 
                    not_active: showDetails.index !== 0 && showDetails.show === false
                }"
            >
                <button 
                    @click="showDetails.index = 0; showDetails.show = !showDetails.show"
                    class="data-title"
                >
                    <span class="title">{{ model }}</span>
        
                    <v-icon>mdi-chevron-down</v-icon>
                </button>
        
                <div class="details">
                    <BaseCode :data="data" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        flex: 1 1 auto;
        max-height: 60%;
        overflow-y: auto;
    }
    .container {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        border-radius: 15px;
        border: 2px solid var(--secondary-color);
    }
    .data {
        display: flex;
        flex-direction: column;
        transition: all linear 0.3s;
        transition: max-height 0.3s linear;
    }
    .data .data-title {
        display: flex;
        padding: 10px;
        justify-content: space-between;
        border-top: 2px solid var(--secondary-color);
        font-size: 12px;
    }
    .data:first-child .data-title {
        border-top: none;
    }
    .data .data-title .title {
        font-size: 12px;
    }
    .data .v-icon {
        transform: rotate(0deg);
        transition: all linear 0.3s;
    }
    .data.active .v-icon {
        transform: rotate(180deg);
    }
    .data .details {
        max-height: 0px;
        padding: 0 10px;
        overflow-y: hidden;
        transition: all 0.3s linear;
    }
    .data.active .details {
        max-height: 100%;
        padding: 10px;
        animation: showDetailsData 0.3s linear;
    }
    .data.not_active .details {
        animation: hideDetailsData 0.3s linear;
        border: none;
        max-height: 0;
        padding: 0 10px;
        overflow: hidden;
    }
    @keyframes showDetailsData {
        from {
            max-height: 0;
            padding: 0 10px;
            overflow: hidden;
        }
        1% {
            padding: 10px;
            max-height: 1%;
        }
        50% {
            max-height: 50%;
        }
        to {
            max-height: 100%;
        }
    }
    @keyframes hideDetailsData {
        from {
            max-height: 100%;
        }
        50% {
            max-height: 50%;
        }
        99% {
            max-height: 99%;
            padding: 0 10px;
        }
        to {
            max-height: 0;
            padding: 0 10px;
            overflow: hidden;
        }
    }
</style>