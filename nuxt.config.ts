// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    build: {
        transpile: ['vuetify'],
    },

    // hooks: {
    //     'pages:extend'(pages) {
    //         function setMiddleware(pages: NuxtPage[]) {
    //             for (const page of pages) {
    //                 console.log('1', page.path)
    //                 if (page.path === '/login') {
    //                     page.meta ||= {}
    //                     page.meta.middleware = ['auth']
    //                 }
    //                 if (page.children) {
    //                     setMiddleware(page.children)
    //                 }
    //             }
    //         }
    //         setMiddleware(pages)
    //     }
    // },

    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        '@nuxtjs/color-mode',
        // '@nuxtjs/style-resources',
    ],

    vite: {
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
        // css: {
        //     preprocessorOptions: {
        //         scss: {
        //             additionalData: '@use "@/assets/scss/_variables.scss" as *;'
        //         }
        //     }
        // }
    },

    css: [
        '~/assets/fonts/openSans.css',
        '~/assets/fonts/poppins.css',
        '~/assets/css/style.css',
        '~/assets/css/main.css',
        '~/assets/scss/_variables.scss',
        '~/assets/scss/main.scss',
    ],

    compatibilityDate: '2024-10-09',

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})