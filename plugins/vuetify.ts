import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import '~/assets/scss/main.scss'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

/**
 * Nuxt plugin to initialize Vuetify with Font Awesome icons support.
 * @param {Object} app - The Nuxt app instance.
 */
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
  })
  app.vueApp.use(vuetify)
})