<template>
	<section id="background" class="w-full h-screen flex justify-center items-center bg-gradient-base">
        <section id="content" class="w-full sm:h-[500px] sm:w-[700px] sm:bg-white sm:shadow-dark sm:rounded-[15px] flex flex-col     sm:flex-row relative">
            <slot>
            </slot>
        </section>
	</section>
</template>

<style scoped>
    @media (width <= 640px) {
        #content {
            margin: 10px;
            height: calc(100vh - 20px);
            background: rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
    }
</style>