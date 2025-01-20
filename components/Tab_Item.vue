<script lang="ts" setup>
    const props = defineProps({
        active: {
            default: false,
            type: Boolean,
            validator: (value) => {
                console.log("value: " + value);
                return typeof value === 'boolean';
            }
        }
    });

    console.log(props.active);
</script>

<template>
	<button :class='`tab__item active_${props.active}`'>
		<span>Tab</span>
		<span class="underline left"></span>
		<span class="underline right"></span>
	</button>
</template>

<style scoped>

	.tab__item {
        flex: 1 1 auto;
        position: relative;
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 5px;
    }
    .tab__item .underline {
        position: absolute;
        bottom: -3px;	
        height: 3px;
    }
    .tab__item .underline.left {
        border-radius: 0 12px 0 0;
        transition: width .3s;
        left: 50%;
    }
    .tab__item .underline.right {
        border-radius: 12px 0 0 0;
        transition: width .3s;
        right: 50%;
    }
    .tab__item.active_false .underline.left,
    .tab__item.active_false .underline.right {
        width: 0px;
    }
    .tab__item.tab__item.active_true span {
        color: #007AFF;
    }
    .tab__item.active_true .underline.left,
    .tab__item.active_true .underline.right,
    .tab__item.active_false:active .underline.left,
    .tab__item.active_false:active .underline.right {
        width: 50%;
        background-color: #007AFF;
    }
</style>