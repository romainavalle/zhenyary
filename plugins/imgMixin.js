import Vue from 'vue'
import { mapGetters } from 'vuex';
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
Vue.mixin({
  computed: {
    ...mapGetters(['isWebP'])
  },
  methods: {
    getSrcSet(url) {
      let size = ''
      if(ResizeHelper.width() < 300 ) {
        size = '@mx'
      }else if(ResizeHelper.width() < 768 ) {
        size = '@.5x'
      }else if(ResizeHelper.width() < 1280 ) {
        size = '@1x'
      }
      let img = url.replace('.jpg', size + '.jpg').replace('.png', size + '.png')
      if(this.isWebP)img = img.replace('.jpg', '.webp').replace('.png', '.webp')
      return img
    }
  }
})
