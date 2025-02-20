// @ts-ignore
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// @ts-ignore
export default defineNuxtConfig({
    build: {
        transpile: ['vuetify'],
    },

    modules: [
        (_options: any, nuxt: any) => {
            nuxt.hooks.hook('vite:extendConfig', (config: any) => {
                // @ts-ignore
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
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
                port: 20200
            }
        },
    },

    routeRules: {
        '/*': { cors: true }
    },

    css: [
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