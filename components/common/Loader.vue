<template>
  <div class="Loader" :class="{'transparent':isReady}" v-if="isFirstTime">
    <div class="animation" ref="animation"></div>
  </div>
</template>
<script>
if (process.client) {
  var bodymovin = require('lottie-web/build/player/lottie_canvas.js')
  //var bodymovin = require('lottie-web')
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
      this.$el.style.display = 'block'
      this.$el.style.mixBlendMode = 'multiply'
      this.animation.play()
    },
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {

    if(process.env.NODE_ENV === 'development') this.$el.style.display = 'none'
    const url = (window.innerWidth > window.innerHeight) ? '/datas/bodymovin/data.json' : '/datas/bodymovin/data1080_1920.json'
    this.animation = bodymovin.loadAnimation({
      container: this.$refs.animation,
      renderer: 'canvas',
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
      this.isReady = true
      this.hide()
    })
  }
}

</script>

<style lang="stylus" scoped>
.Loader
  background $black
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 998
  pointer-events none
  &.transparent
    background none
  .animation
    top 0
    left 0
    right 0
    bottom 0
    position absolute
</style>


