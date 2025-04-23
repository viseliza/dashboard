import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    build: {
        transpile: ['vuetify'],
    },

    modules: [
        (_options: any, nuxt: any) => {
            nuxt.hooks.hook('vite:extendConfig', (config: any) => {
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        '@nuxtjs/color-mode',
        '@pinia/nuxt'
    ],

    vite: {
        optimizeDeps: {
          include: ["plotly.js-dist-min"],
        },
        vue: {
            template: {
                transformAssetUrls,
            },
        },
        server: {
            hmr: {
                port: 21000
            }
        },
    },

    routeRules: {
        '/*': { 
            cors: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    },

    css: [
        '~/assets/fonts/jetbrainsmono.css',
        '~/assets/fonts/openSans.css',
        '~/assets/fonts/poppins.css',
        '~/assets/fonts/RobotoMono.css',
        '~/assets/css/style.css',
        '~/assets/css/main.css',
        '~/assets/scss/_variables.scss',
        '~/assets/scss/main.scss',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],

    compatibilityDate: '2024-10-09',

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})