module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Zhenya Rynzhuk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Art Director / Visual designer - I\'m is a designer with 5 years of experience. I\'m firmly believe that every project needs an individual approach. I specialize in mobile app design, web design, UI/UX, graphic design, branding, and building identities. I\'m looking forward to making something fabulous together with a future client.' }
    ]

  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', {
      id: 'UA-90480178-1'
    }],
    'nuxt-svg'
  ],
  plugins: [
    '~plugins/vuex-router-sync.js',
    '~plugins/imgMixin.js',
  ],

  css: [
    {src: '~/assets/stylus/main.styl', lang: 'stylus'}
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      [].concat(...config.module.rules.find(e => e.test.toString().match(/\.styl/)).oneOf.map(e => e.use.filter(e => e.loader == 'stylus-loader'))).forEach(stylus => {
        Object.assign(stylus.options, {
            import: [
              '~assets/stylus/rupture.styl',
              '~assets/stylus/vars/index.styl'
            ]
        })
      })
    }
  },
  generate: {
    dir: '../html',
    routes: function () {
      const routes = []
      var datas = JSON.parse(require('fs').readFileSync(`./assets/datas/datas.json`, 'utf-8'))
      datas.works.forEach(screen => {
        screen.forEach(line => {
          line.forEach(work => {
            routes.push('/works/' + work)
          })
        })
      })
      return routes
    }
  }
}

