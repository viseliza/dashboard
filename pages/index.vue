<template>
    <section class="w-full h-screen flex flex-col justify-center gap-[20px]">
        <section class="flex justify-center items-center">
            <svg class="h-[150px] w-[150px]" viewBox="0 0 100 100">
                <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">
                <!-- left line -->
                <path d="M 21 40 V 59">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0 21 59; 180 21 59" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- right line -->
                <path d="M 79 40 V 59">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0 79 59; -180 79 59" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- top line -->
                <path d="M 50 21 V 40">
                    <animate attributeName="d" values="M 50 21 V 40; M 50 59 V 40" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- btm line -->
                <path d="M 50 60 V 79">
                    <animate attributeName="d" values="M 50 60 V 79; M 50 98 V 79" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- top box -->
                <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
                    <animate attributeName="stroke" values="rgba(0,0,0, 0.8); rgba(100,100,100,0)" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- mid box -->
                <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
                <!-- btm box -->
                <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
                    <animate attributeName="stroke" values="rgba(100,100,100,0); rgba(0,0,0, .8)" dur="2s" repeatCount="indefinite" />
                </path>
                <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -19" dur="2s" repeatCount="indefinite" />
                </g>
            </svg>
        </section>

        <h1 class="flex justify-center font-mono text-[18px] font-bold bg-gradient-to-r from-primary-dark to-zinc-500 bg-clip-text text-transparent">
            Тут ничего не будет
        </h1>
    </section>
</template>