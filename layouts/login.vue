<template>
	<section class="main_container">
        <section class="content">
            <slot>
            </slot>
        </section>
	</section>
</template>


<style scoped>
    .main_container {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(to bottom right, #FDFCFB, #E2D1C3);
    }
    .content {
        padding: 20px;
        
    }
</style>