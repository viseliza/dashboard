<script setup lang="ts">
    import { SettingsAPI } from '~/api';
    import { Tokens } from '~/models';

    const showSettings = defineModel<boolean>('showSettings', {
        type: Boolean,
        required: true,
    });

    const settingsApi = new SettingsAPI('');
    const tokens = new Tokens(Tokens.getTokens());
    const settings = reactive({
        new: {} as any,
        old: {} as any,
    });

    await initializeSettings(settings, settingsApi, tokens);
    const activeCategory = ref('pennoe');
    const changed = ref([]);

    const categories = computed(() => Object.keys(settings.new));
    const categoriesWithKeys = categories.value.reduce((acc: any, category: any) => {
        acc[category] = settings.new[category].map((item: any) => item.key);
        return acc;
    }, {});
    const categoriesCountChangedKeys: any = ref({});
    
    function getCountChangedKeys(category: string) {
        return changed.value.filter((item: any) => categoriesWithKeys[category].includes(item.key)).length;
    }

    watch(() => [...changed.value], (value) => {
        categories.value.forEach((category: any) => {
            categoriesCountChangedKeys.value[category] = getCountChangedKeys(category);
        });
    });
</script>

<template>
    <ModalsSettingsContainer v-model:showSettings="showSettings">
        <template #aside>
            <ModalsSettingsCategory 
                v-for="category in categories"
                :key="category"
                :category="category"
                :changedKeys="categoriesWithKeys[category]"
                :countChangedKeys="categoriesCountChangedKeys[category]"
                v-model:activeCategory="activeCategory"
            />
        </template>

        <template #content>
            <ModalsSettingsField
                v-for="field in settings.new[activeCategory]"
                :key="field.key"
                :setting="field"
                :oldValue="settings.old[activeCategory][field.key]"
                v-model:changed="changed"
            />
        </template>

        <template #footer>
            <ModalsSettingsFooter
                v-model:settings="settings"
                v-model:changed="changed"
            />
        </template>
    </ModalsSettingsContainer>
</template>
