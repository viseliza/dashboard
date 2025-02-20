<script setup>
    const colorMode = useColorMode();
    const isDark = shallowRef(0);

    watch(isDark, (newValue) => {
        colorMode.preference = newValue ? 'dark' : 'light';
    });
</script>


<template>
    <div class='toggle-switch'>
        <label>
            <input 
                v-model="isDark" 
                type="checkbox"
                :true-value="1"
                :false-value="0"
            >
            <button @click="isDark = isDark ? 0 : 1" class='slider'></button>
        </label>
    </div>
</template>

<style scoped>
    .toggle-switch {
        position: relative;
        width: calc(200px / 4);
    }

    label {
        position: absolute;
        width: 100%;
        height: calc(100px / 4);
        background-color: var(--toggle-dark);
        border-radius: calc(50px / 4);
        cursor: pointer;
    }

    input {
        position: absolute;
        display: none;
    }

    .slider {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: calc(50px / 4);
        transition: 0.3s;
    }

    input:checked ~ .slider {
        background-color: var(--toggle-light);
    }

    .slider::before {
        content: "";
        position: absolute;
        top: calc(13px / 4);
        left: calc(16px / 4);
        width: calc(75px / 4);
        height: calc(75px / 4);
        border-radius: 50%;
        box-shadow: inset 8px -4px 0px 0px var(--toggle-light);
        background-color: var(--toggle-dark);
        transition: 0.3s;
    }

    input:checked ~ .slider::before {
        transform: translateX(calc(95px / 4));
        background-color: var(--toggle-dark);
        box-shadow: none;
    }
</style>
