module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Zhenya Rynzhuk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: 'Portfolio of Zhenya Rynzhuk, award-winning art director. Areas of expertise include Product & Visual design, Mobile & Web projects, Branding, Typography, and Animations.' },
      { hid: 'og:description', property: 'og:description', content: 'Portfolio of Zhenya Rynzhuk, award-winning art director. Areas of expertise include Product & Visual design, Mobile & Web projects, Branding, Typography, and Animations.' },
      { hid: 'twitter:description', property: 'twitter:description', content: 'Portfolio of Zhenya Rynzhuk, award-winning art director. Areas of expertise include Product & Visual design, Mobile & Web projects, Branding, Typography, and Animations.' },
      { hid: 'og:url', property: 'og:url', content: 'https://www.zhenyary.com' },
      { hid: 'twitter:url', property: 'twitter:url', content: 'https://www.zhenyary.com' },
      {
        hid: `og:title`,
        property: 'og:title',
        content: 'Zhenya Rynzhuk'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Zhenya Rynzhuk'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Zhenya Rynzhuk'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: 'Zhenya Rynzhuk'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.zhenyary.com/images/share.jpg'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: 'https://www.zhenyary.com/images/share-twitter.jpg'
      }
    ]

  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    ['@nuxtjs/pwa',{ workbox: {cachingExtensions: '@/plugins/workbox-range-request.js'}}],
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
            routes.push('/work/' + work)
          })
        })
      })
      return routes
    }
  }
}

