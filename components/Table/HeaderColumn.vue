<script setup lang="ts">
    import { iconsDictionary } from '~/utils';
    const props = defineProps<{ column: string }>();

    const content = computed(() => {
        const icon = iconsDictionary[props.column as keyof typeof iconsDictionary];
        if (icon) return icon;

        return props.column.charAt(0).toUpperCase() + props.column.slice(1).toLowerCase();
    });
</script>

<template>
    <div class="header-column">
        <div v-if="typeof content === 'string'">{{ content }}</div>

        <TooltipsTextContent
            v-else
            :name="content.icon"
            :is-active="true"
            :style="{ 'fontSize': '12px' }"
            :z-index="2"
            :styles-tooltip="{ 
                'top': '35px', 
                'left': '50%',
                'transform': 'translateX(-50%)',
                'padding': '5px 10px',
                'display': 'flex', 
                'flexDirection': 'column', 
                'alignItems': 'center', 
                'width': 'auto' 
            }"
            :styles-tooltip-text="{ 'whiteSpace': 'nowrap' }"
        >
            <template #pretext>
                <font-awesome-icon v-if="content.type === 'fa'" :icon="content.icon" />
                <v-icon v-else-if="content.type === 'mdi'" :icon="content.icon">
                    {{ content.icon }}
                </v-icon>
            </template>

            <template #tooltip-text>
                {{ column }}
            </template>
        </TooltipsTextContent>
    </div>
</template>

<style scoped lang="scss">
    .header-column {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 6px 5px;
        border-bottom: 2px solid var(--secondary-color);
    }
    .header-column div {
        font-size: 12px;
        font-weight: 700;
        color: var(--text-secondary-bold);
    }
    .header-column svg {
        width: 14px;
        height: 14px;
        filter: invert(41%) sepia(6%) saturate(0%) hue-rotate(154deg) brightness(95%) contrast(93%);
    }
    .header-column .v-icon {
        font-size: 18px;
        color: var(--text-secondary-bold);
    }
</style>