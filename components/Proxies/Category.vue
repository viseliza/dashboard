<script lang="ts" setup>
    import type { Proxy } from '~/models';

    const props = defineProps<{
        title: string,
        params: any
    }>();
    
    const translate = {
        'username': 'Логин',
        'password': 'Пароль',
        'created_at': 'Создан',
        'updated_at': 'Обновлен',
        'host': 'Хост',
        'port': 'Порт',
        'link': 'Ссылка',
        'seconds': 'Секунды',
    }

    const isEnable = computed(() => {
        if (props.params.enable === false)
            return '(выключено)';
        else if (props.params.enable === true)
            return '(включено)';
        
        return '';
    });

    const timestampToDate = (timestamp: number) => 
        timestamp === 0 
            ? "—" 
            : new Date(timestamp * 1_000).toLocaleString();
</script>

<template>
    <div class="category">
        <div class="header">
            <span class="title">{{ title }} {{ isEnable }}</span>
        </div>

        <div class="data">
            <div class="keys">
                <span
                    v-for="param in Object.keys(params).filter(key => key !== 'enable')"
                    :key="param"
                >
                    {{ translate[param as keyof typeof translate] }}
                </span>
            </div>

            <div class="values">
                <span
                    v-for="param in Object.keys(params).filter(key => key !== 'enable')"
                    :key="param"
                >
                    <TooltipsTextContent 
                        v-if="param === 'link'" 
                        :style="{ 'max-width': '20ch' }"
                    >
                        <template #pretext>
                            {{ params[param] }}
                        </template>
                    </TooltipsTextContent>

                    <span v-else-if="param === 'created_at' || param === 'updated_at'">
                        {{ timestampToDate(params[param]) }}
                    </span>

                    <span v-else>
                        {{ params[param] }}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .category {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid var(--secondary-color);
        border-radius: 15px;
    }
    .category .header {
        position: absolute;
        top: -12px;
        left: 15px;
        background-color: var(--inversion-color);
    }
    .category .header .title {
        font-weight: 700;
        font-size: 12px;
        letter-spacing: 1px;
    }
    .category .data {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 15px;
    }
    .category .data .values,
    .category .data .keys {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        gap: 5px;
    }
    .category .data .keys {
        color: var(--text-secondary);
        opacity: .7;
    }
    .category .data .values {
        flex: 1 1 auto;
        align-items: flex-end;
    }
    .category .data .keys span,
    .category .data .values span {
        font-size: 12px;
    }
</style>

