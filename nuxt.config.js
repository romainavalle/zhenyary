module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'zhenya',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/pwa',
    /*['@nuxtjs/google-analytics', {
      id: 'UA-44603597-1'
    }],*/
    'nuxt-svg'
  ],
  plugins: [
    '~plugins/vuex-router-sync.js'
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
    dir: '../zhenya',
    routes: function () {
      const routes = []
      var datas = JSON.parse(require('fs').readFileSync(`./assets/datas/datas.json`, 'utf-8'))
      datas.works.forEach(screen => {
        screen.forEach(line => {
          line.forEach(work => {
            routes.push('/work/' + work)
          })
        })
      })
      console.log(routes);

      return routes
    }
  }
}

