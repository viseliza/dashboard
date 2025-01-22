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
        }
    },
    plugins: [],
} 