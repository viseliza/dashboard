<script lang="ts" setup>
let isActive = ref(false);
</script>


<template>
	<section class="searchBox_container">
		<div :class='`searchBox active_${isActive}`'>
			<section class="searchInputBox">
				<input class="searchInput" type="text" name="" placeholder="Search">
			</section>
	
			<button class="searchButton" @click="isActive = !isActive">
				<img src="~/assets/images/actions/search.svg" alt="">
			</button>
		</div>
	</section>

</template>


<style scoped>
.searchBox_container {
	position: absolute;
	right: 0;
}

.searchBox {
	display: flex;
	border-radius: 40px;
	padding: 2px;	
	background: #F5F8FF;
	outline: 2px solid;
	outline-offset: -2px;
	outline-color: black;
}

.searchBox.active_true {
	outline-color: #007AFF;
}

.searchBox.active_true > .searchInput {
	width: calc(100vw - 66px);
	transition: width 0.4s;
	padding: 0 10px;
}
/* 
.searchBox.active_true > .searchButton {
	outline: 2px solid #007AFF;
} */

.searchBox.active_true .searchButton > img {
	filter: invert(37%) sepia(47%) saturate(6446%) hue-rotate(199deg) brightness(101%) contrast(108%);
}

.searchButton {
	color: white;
	float: right;
	padding: 6px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all .4s;
	align-self: self-end;
}

.searchButton > img {
	width: 20px;
	height: 20px;
}

.searchInputBox {
	display: flex;
	flex: 1 1 auto;
	color: white;
	font-size: 12px;
    background: transparent;
}

.searchInput {
	border: none;
	outline: none;
	float: right;
	transition: all .4s;
	width: 0px;
}

.searchBox.active_true .searchInput {
	padding: 0 10px;
	width: calc(100vw - 66px);
}
</style>