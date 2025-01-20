
<script>
	import Header from '~/components/Header.vue';
	import Sidebar from '~/components/Navbar.vue';
	import Tab from '~/components/Tab.vue';
import Tab_Item from '~/components/Tab_Item.vue';
	
	export default {
		name:'NewsBanner',
		components: {
			Sidebar,
			Header,
			Tab,
			Tab_Item
		}
	}
</script>


<template>
	<Header :title="'Профиль'"/>

	<Tab>
		<Tab_Item/>
		<Tab_Item/>
		<Tab_Item/>
	</Tab>

	<section class="content">
		<!-- <section class="item">
			<section class="logo"></section>
			<span>Название</span>
			<span>Цена</span>
		</section> -->
	</section>


	<Sidebar/>
</template>


<style scoped>
	.mdi {
		font-size: 24px;
	}
	.header {
		margin: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.filters {
		margin: 5px 15px;
		display: flex;
		justify-content: space-between;
		border-radius: 10px;
		background-color: antiquewhite;
	}
	.filter {
		flex: 1 1 auto;
		padding: 8px 0;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: cetner;
	}
	.filter span {
		width: 100%;
	}
	.filter:first-child::after {
		content: '';
		width: 2px;
		border-radius: 5px;
		background: white;
		align-self: stretch;
	}
	
	.content {
		flex: 1 1 auto;
		overflow-y: auto;
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
	}
	.content .item {
		gap: 5px;
		height: 180px;
		padding: 10px;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		width: 50%;
		background-color:antiquewhite;
	}
	.content .item .logo {
		flex: 1 1 auto;
		background-color: white;
		border-radius: 20px;
		width: 100%;
	}
</style>