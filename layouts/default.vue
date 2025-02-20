<script setup lang="ts">
	import Sidebar from '~/components/Dashboard/Sidebar.vue';
	const route = useRoute();

	const isDashboard = computed(() => route.path.split('/').indexOf('dashboard') !== -1);
</script>

<template>
	<div :class="isDashboard ? 'app' : ''">
		<Sidebar v-if="isDashboard"/>

		<slot>
	
		</slot>

		<div id="layout"></div>
	</div>
</template>

<style lang="scss">
	.app {
		background: var(--background);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: 0 0 0 240px;
	}
</style>