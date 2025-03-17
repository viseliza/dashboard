<template>
	<div id="notification"></div>
    
	<div id="background" class="w-full h-screen flex justify-center items-center bg-gradient-base relative">
        <div id="content" class="main w-full sm:h-[500px] sm:w-[700px] sm:rounded-[15px] flex flex-col sm:flex-row">
            <slot>
            </slot>
        </div>
	</div>
</template>

<style lang="scss" scoped>
    #background {
        background: var(--background);
    }
    .main {
        background: rgba(255, 255, 255, .9);
        backdrop-filter: blur(35px);
        box-shadow: 0 0 80px rgba(0, 0, 0, 0.15);
    }
    @media (max-width: 640px) {
        #content {
            height: 100vh;
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
    }
</style>