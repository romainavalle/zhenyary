<template>
  <div></div>
</template>
<script>
if (process.client) {
  var bodymovin = require('lottie-web/build/player/lottie_svg.js')
}
import anime from 'animejs'
import { mapActions, mapState } from 'vuex';
export default {
  data(){
    return {
      w: 0,
      h: 0,
      isReady: false
    }
  },
  components: {
  },
  computed: {
    ...mapState(['isFirstTime'])
  },
  methods:{
    ...mapActions(['setFirstTime']),
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    hide() {
      this.animation.play()
    },
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {
    const url = (window.innerWidth > window.innerHeight) ? '/datas/bodymovin/data.json' : '/datas/bodymovin/data1080_1920.json'
    this.animation = bodymovin.loadAnimation({
      container: this.$el,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: url,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })


    this.animation.addEventListener('complete', () => {
      this.setFirstTime()
    })
    this.animation.addEventListener('DOMLoaded', () => {
      this.$parent.isReady = true
      setTimeout(this.hide.bind(this), 800)
    })
  }
}

</script>

<style lang="stylus" scoped>
div
  top 0
  left 0
  right 0
  bottom 0
  position absolute
</style>


