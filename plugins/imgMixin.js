import Vue from 'vue'

Vue.mixin({
  methods: {
    getSrcSet(url, size, type) {
      let img = `${this.path}${url}`
      img = img.replace('.jpg', size + '.'+ type).replace('.png', size + '.'+ type)
      return img
    }
  }
})
