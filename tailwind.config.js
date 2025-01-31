/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],
    theme: {
        extend: {
            colors: {
                'primary-dark': '#000000', // Здесь я заметил использование primary-dark в градиенте
            }
        },
        boxShadow: {
            'dark': 'rgba(0, 0, 0, 0.15) 0px 5px 15px',
            'inset': 'inset 0 0 10px #f8a100'
        },
        backgroundSize: {
            'size-200': '200% 200%',
        },
        backgroundPosition: {
            'pos-0':    '0% 0%',
            'pos-50':   '50% 50%',
            'pos-100': '100% 100%',
        },
    },
    plugins: [],
} 