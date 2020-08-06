
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },

  // env: {
  //   baseUrl: process.env.BASE_URL || 'http://idasys.test'
  // },

  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://idasys.test',
      pathRewrite: {
        // '^/api' : '/'
        '/api' : 'http://idasys.test/api/'
        }
      },
      changeOrigin: true
  }
}

// Workaround to make form-backend-validation work with Nuxt
// see issue: https://github.com/spatie/form-backend-validation/issues/74
global.File= typeof window === 'undefined' ? Object : window.File
global.FileList= typeof window === 'undefined' ? Object : window.FileList
