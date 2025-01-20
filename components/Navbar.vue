<script lang="ts">
	const categories = {
		'catalog': 'Каталог',
		'wallet': 'Кошелек',
		'person': 'Профиль',
	}

	export default {
		data() {
			return {
				categories		
			}
		},
		created() {
			console.log(this.$route.path)
		}
	}
</script>


<template>
	<section class="navbar">
		<template
			v-for="(key, value) in categories"
			:key="key" 
		>
			<nuxt-link
				:to="`/${value}`"
				:class="`nav__button ${value === $route.path.split('/')[1] ? 'active' : ''}`"
			>
				<div>
					<img width="28" height="28" :src='`/_nuxt/assets/images/navbar/${value}.svg`'>
				</div>
				<span>{{ key }}</span>
			</nuxt-link>
		</template>
	</section>
</template>


<style scoped>
	.navbar {
		border-top: 1px solid #00000026;
		padding: 15px 30px 10px 30px;
		background-color: white;
		display: flex;
		justify-content: space-around;
	}
	.nav__button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.nav__button div {
		width: 100%;
		padding: 0 15px;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.nav__button.active div {
		background-color: #4378FF1A;
	}
	.nav__button div img {
		filter: invert(73%) sepia(3%) saturate(567%) hue-rotate(152deg) brightness(92%) contrast(97%);
	}
	.nav__button.active div img {
		filter: invert(37%) sepia(47%) saturate(6446%) hue-rotate(199deg) brightness(101%) contrast(108%);
	}
	.nav__button.active span {
		color: #007AFF;
	}
	.nav__button span {
		color: #A2ACB0;
		font-size: 10px;
		font-weight: 700;
	}
</style>