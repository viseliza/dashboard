<script setup lang="ts">
	const route = useRoute();

	const showSettings = shallowRef(false);
	const isDashboard = computed(() => route.path.split('/').indexOf('dashboard') !== -1);
</script>

<template>
	<div :class="isDashboard ? 'app' : ''">
		<DashboardSidebar 
			v-if="isDashboard"
			v-model:showSettings="showSettings"
		/>

		<slot></slot>

		<div id="notification"></div>
		<div id="layout"></div>
		<div id="modal"></div>

		<ModalsSettingsModal 
			v-if="showSettings"
			v-model:showSettings="showSettings"
		/>
	</div>
</template>

<style lang="scss">
	.app {
		position: relative;
		background: var(--background);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: 0 0 0 240px;
	}
</style>