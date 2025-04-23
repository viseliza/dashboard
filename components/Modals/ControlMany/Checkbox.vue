<script setup lang="ts">
    type Props = {
        name?: string;
        scale?: number;
    }
    const props = withDefaults(defineProps<Props>(), {
        scale: 1,
    });
    const model = defineModel<boolean>();
    
    const translate = {
        auth: 'Авторизация',
        update: 'Обновление',
    }
</script>

<template>
    <div class="checkbox-wrapper">
        <div v-if="name" class="title-container">
            <span>{{ translate[name as keyof typeof translate] }}</span>
        </div>

        <label class="switch" :for="'checkbox' + name">
            <input 
                type="checkbox" 
                :id="'checkbox' + name"
                v-model="model"
                :true-value="true"
                :false-value="false"
            />
            <div class="slider round"></div>
        </label>
    </div>
</template>


<style scoped>
    .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
    }
    .checkbox-wrapper .title-container {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .checkbox-wrapper span {
        font-size: 12px;
        font-weight: 700;
    }
    .checkbox-wrapper .switch {
        display: inline-block;
        height: calc(17px * v-bind(scale));
        position: relative;
        width: calc(30px * v-bind(scale));
    }
    .checkbox-wrapper .switch input {
        display:none;
    }
    .checkbox-wrapper .slider {
        background-color: #ccc;
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: .4s;
    }
    .checkbox-wrapper .slider:before {
        background-color: #fff;
        bottom: calc(2px * v-bind(scale));
        content: "";
        left: calc(2px * v-bind(scale));
        position: absolute;
        transition: .4s;
        height: calc(13px * v-bind(scale));
        width: calc(13px * v-bind(scale));
        box-shadow: rgba(0, 0, 0, .2) 0px 1px 2px;
    }
    .checkbox-wrapper input:checked + .slider {
        background-color: #66bb6a;
    }
    .checkbox-wrapper input:checked + .slider:before {
        transform: translateX(calc(12px * v-bind(scale))) translateY(calc(-.35px * v-bind(scale)));
    }
    .checkbox-wrapper .slider.round {
        border-radius: calc(17px * v-bind(scale));
    }
    .checkbox-wrapper .slider.round:before {
        border-radius: 50%;
    }
</style>
