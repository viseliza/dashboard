<script lang="ts" setup>
    type Props = {
        keys: any[];
        item: any
    }
    defineProps<Props>();

    const timestampToDate = (timestamp: number) => 
        timestamp === 0 
            ? "—" 
            : new Date(timestamp * 1_000).toLocaleDateString();

    const emit = defineEmits(['click']);
    const handleClick = (event: any) => emit('click', event);
</script>


<template>
    <tr @click="handleClick">
        <td style="width: 40px;">
            <div 
                class="status-circle"
                :class="{ 'active': item.enable }"
            ></div>
        </td>
        <td 
            v-for="key in keys"
            :key="key"
            :class="key"
        >
            {{ key === 'updated_at' || key === 'created_at' ? timestampToDate(item[key]) : item[key] }}
        </td>
    </tr>

</template>


<style scoped>
    .status-circle {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid var(--secondary-color);
        background-color: red;
    }
    .status-circle.active {
        background-color: rgb(0, 219, 0);
    }
</style>