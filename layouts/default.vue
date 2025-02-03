<script setup lang="ts">
	import Sidebar from '~/components/Dashboard/Sidebar.vue';
	const route = useRoute();
</script>

<template>
	<div :class="route.path.split('/').indexOf('dashboard') !== -1 ? 'app' : ''">
		<Sidebar v-if="route.path.split('/').indexOf('dashboard') !== -1"/>

		<slot>
	
		</slot>
	</div>
</template>

<style lang="scss">
	.app {
		background: var(--background);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding-left: 260px;
	}
</style>