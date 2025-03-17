<script setup lang="ts">
    const model = defineModel<boolean>();
</script>

<template>
    <div class="toggle-container">
        <input type="checkbox" class="toggle" id="toggleDefault" v-model="model">

        <span>Установить значения из примера</span>
    </div>
</template>


<style scoped lang="scss">
    .toggle-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    input[type=checkbox] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
    }
    input[type=checkbox]:focus {
        outline: 0;
    }
    .toggle {
        height: 21.5px;
        width: 42px;
        border-radius: 11px;
        display: inline-block;
        position: relative;
        margin: 0;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 20px -6px inset, rgba(0, 0, 0, 0.3) 0px 0px 18px -9px inset;
        transition: all 0.2s ease;
    }
    .toggle:after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        border: 1px solid var(--inversion-color);
        border-radius: 50%;
        background: var(--inversion-color);
        box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.1);
        transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
    }
    .toggle:checked:after {
        transform: translateX(calc(28px / 1.4));
    }
    span {
        font-size: 12px;
    }
</style>