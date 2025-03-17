<script setup lang="ts">
import { SettingsAPI } from '~/api';
import { Tokens } from '~/models';

    const settings = defineModel<any>('settings', {
        type: Object,
        required: true,
    });
    const changed = defineModel<any>('changed', {
        type: Array,
        required: true,
    });

    function rejectChanges() {
        Object.keys(settings.value.new).forEach((category) => {
            settings.value.new[category].forEach((item: any, index: number) => {
                settings.value.new[category][index].value = settings.value.old[category][item.key];
            });
        });
        changed.value = [];
    }

    function saveChanges() {
        const settingsApi = new SettingsAPI('');
        const tokens = new Tokens(Tokens.getTokens());
        
        Object.keys(settings.value.new).forEach((category: any) => {
            settings.value.new[category].forEach((item: any) => {
                settings.value.old[category][item.key] = item.value;
            });
        });
    
        changed.value.forEach(async (item: any) => {
            await settingsApi.update({
                key: item.key,
                value: item.value
            }, tokens.access_token);
        });

        changed.value = [];
    }
</script>

<template>
    <div 
        class="footer-container"
        :class="{ 'show': changed.length }"
    >
        <div class="footer-text">
            <span class="footer-text">
                Некоторые настройки в были изменены ({{ changed.length }}).
            </span>
        </div>

        <div class="footer-buttons">
            <ModalsSettingsButton 
                @on-click="rejectChanges"
                text="Отмена" 
                type="cancel" 
            />

            <ModalsSettingsButton 
                @on-click="saveChanges"
                text="Сохранить" 
                type="save" 
            />
        </div>
    </div>
</template>


<style scoped>
    .footer-container {
        display: flex;
        justify-content: space-between;
        border: 1px solid var(--secondary-color);
        border-radius: 10px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        padding: 10px;
    }
    .footer-container,
    .footer-container .footer-text,
    .footer-container .footer-buttons {
        transform: translateY(20px);
        opacity: 0;
        transition: transform 200ms linear, opacity 200ms linear;
    }
    .footer-container.show,
    .footer-container.show .footer-text,
    .footer-container.show .footer-buttons {
        transform: translateY(0);
        opacity: 1;
    }
    .footer-buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
    }
</style>