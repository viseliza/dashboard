<script setup lang="ts">
	import Sidebar from '~/components/Sidebar.vue';
</script>

<template>
	<div class="app">
		<Sidebar/>

		<slot>
	
		</slot>
	</div>
		
</template>

<style lang="scss" scoped>
	.app {
		background: var(--background);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding-left: 88px;
	}
</style>