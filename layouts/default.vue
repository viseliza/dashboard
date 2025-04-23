<script setup lang="ts">
	import { useLoader } from '~/store';

	const route = useRoute();

	const showSettings = shallowRef(false);
	const isDashboard = computed(() => route.path.split('/').indexOf('dashboard') !== -1);
    const loaderStore = useLoader();
</script>

<template>
	<div :class="isDashboard ? 'app' : ''">
		<!-- <DashboardSidebar 
			v-if="isDashboard"
			v-model:showSettings="showSettings"
		/> -->
		<SidebarContent 
			v-if="isDashboard"
			v-model:showSettings="showSettings"
		/>

		<div class="app-content">
			<slot></slot>
		</div>

		<div id="notification"></div>
		<div id="layout"></div>
		<div id="modal"></div>
		<div id="loading"></div>

		<ModalsSettingsModal 
			v-if="showSettings"
			v-model:showSettings="showSettings"
		/>
		
		<transition mode="default" name="fade">
			<ModalsLoaderModal 
				v-if="loaderStore.loading.active"
				:loading="loaderStore.loading"
				@close="loaderStore.closeLoader()"
			/>
		</transition>
	</div>
</template>

<style lang="scss">
	.app {
		position: relative;
		background: var(--secondary-sub-color);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: 0 0 0 240px;
	}
	.app .app-content {
		display: flex;
		gap: 10px;
		flex-direction: column;
		margin: 10px 10px 10px 0;
		flex: 1;
		border-radius: 15px;
		background: var(--inversion-color);
	}
	
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s linear;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>