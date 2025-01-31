<script setup>
    const colorMode = useColorMode()
    const isDark = shallowRef(0);

    const toggleColorMode = () => {
        colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
    }

    watch(isDark, (newValue) => {
        colorMode.preference = newValue ? 'dark' : 'light';
    });
</script>

<template>
    <div class="toggle-btn">
        <input 
            v-model="isDark" 
            type="checkbox"
            :true-value="1"
            :false-value="0"
        >
        <span @click="isDark = isDark ? 0 : 1">
            <svg class="sun" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
            </svg>
            <svg class="moon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.3 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.3c-6.3-.5-12.6-.8-19-.8z"/>
            </svg>
        </span>
    </div>
</template>

<style lang="scss" scoped>
.toggle-btn {
    align-self: flex-start;
    position: relative;
    width: calc(145px / 2.3);
    height: calc(74px / 2.3);
    border-radius: 40px;
}

input[type="checkbox"] {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: 0px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
}

.toggle-btn span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    padding-left: 1px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    overflow: hidden;
    opacity: 1;
    background-color: #fff;
    box-shadow: 0px 2px 25px #d9d9d9;
    border-radius: 40px;
    transition: 0.2s ease background-color, 0.2s ease opacity;
}
.toggle-btn span:hover {
    cursor: pointer;
}

.toggle-btn span svg {
    margin: 6px 7px;
    z-index: 100;
}
.toggle-btn span .sun {
    fill: var(--inversion-color);
}
.toggle-btn span .moon {
    fill: var(--primary-color);
}

.toggle-btn span:after {
    content: "";
    position: absolute;
    top: calc(8px / 2.3);
    width: calc(58px / 2.3);
    height: calc(58px / 2.3);
    border-radius: 50%;
    transition: 0.5s ease transform, 0.2s ease background-color;
}

.toggle-btn span:after {
    background-color: #000;
    transform: translate(2.4px, 0px);
    z-index: 0;
}

.toggle-btn input[type="checkbox"]:checked+span {
    background-color: #000;
}

.toggle-btn input[type="checkbox"]:active+span {
    opacity: 0.5;
}

.toggle-btn input[type="checkbox"]:checked+span:after {
    background-color: #fff;
    transform: translate(calc(78px / 2.3), 0px);
}
</style>