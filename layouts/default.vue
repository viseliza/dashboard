<script setup lang="ts">
	import Sidebar from '~/components/Dashboard/Sidebar.vue';
	const route = useRoute();

	console.log("[PATH] " + route.path)
	console.log(route.path.split('/').indexOf('dashboard') !== -1)
</script>

<template>
	<div :class="route.path.split('/').indexOf('dashboard') !== -1 ? 'app' : ''">
		<Sidebar v-if="route.path.split('/').indexOf('dashboard') !== -1"/>

		<slot>
	
		</slot>
	</div>
</template>

<style lang="scss">
	html {
		background: var(--background);
	}
	.app {
		background: var(--background);
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 20px);
		margin: 10px;
		margin-left: 260px;
		border: 1px solid var(--border-color);
		border-left: 0px;
		border-radius:  0 12px 12px 0;
	}
</style>