<template>
  <div class="Loader" :class="{'transparent':isReady}">
    <div class="animation" ref="animation"></div>
  </div>
</template>
<script>
if (process.client) {
  var bodymovin = require('lottie-web/build/player/lottie_svg.js')
  var datas = require('~/assets/datas/bodymovin/data.json')
}
import anime from 'animejs'
export default {
  name: 'TurnDevice',
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
  },
  methods:{
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      return
      const ratio = 1920 / 1080
      let width, height, top, left
      if(this.w / this.h > ratio) {
        width = this.w
        height = this.w / ratio
      }else{
        height = this.h
        width = this.h * ratio
      }
      this.$refs.animation.style.width = width + 'px'
      this.$refs.animation.style.height = height + 'px'
      this.$refs.animation.style.top = this.w / 2 - width / 2 + 'px'
      this.$refs.animation.style.left = this.h / 2 - height / 2  + 'px'
    },
    show() {
      this.animation.goToAndStop(0, true)
      this.$el.style.visibility = 'visible'
      anime({
        targets: this.$el,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
      })
    },
    hide() {
      this.animation.play()
    }
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {
    this.animation = bodymovin.loadAnimation({
      container: this.$refs.animation,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      prerender: true,
      animationData: datas
    })
    this.animation.addEventListener('complete', () => {
        this.$el.style.visibility = 'hidden'
    })
    this.animation.addEventListener('DOMLoaded', () => {
      this.isReady = true
       this.$el.querySelector('svg').setAttribute("preserveAspectRatio","xMaxYMax slice");
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
  z-index 999
  will-change opacity
  &.transparent
    background none
  .animation
    top 0
    left 0
    right 0
    bottom 0
    position absolute

</style>
<style lang="stylus" >
.Loader
  .animation svg
    width 100%
    height 100%
</style>
