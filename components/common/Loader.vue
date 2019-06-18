<template>
  <div class="Loader" :class="{'transparent':isReady}">
    <div class="animation" ref="animation"></div>
  </div>
</template>
<script>
if (process.client) {
  var bodymovin = require('lottie-web/build/player/lottie_canvas.js')
  //var bodymovin = require('lottie-web')
}
import anime from 'animejs'
export default {
  name: 'TurnDevice',
  data(){
    return {
      w: 0,
      h: 0,
      isReady: false,
      isFirstResize: true
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

    },
    show() {
      this.$el.style.display = 'block'
      this.$el.style.mixBlendMode = 'multiply'
      this.animation.goToAndStop(0, true)
      anime({
        targets: this.$el,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
      })
    },
    hide() {
      this.$el.style.display = 'block'
      this.$el.style.mixBlendMode = 'multiply'
      this.$el.style.opacity = 1
      this.animation.play()
    }
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {
    if(process.env.NODE_ENV === "development") this.$el.style.display = 'none'
    this.animation = bodymovin.loadAnimation({
      container: this.$refs.animation,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      animationData: require('~/assets/datas/bodymovin/data.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })

    this.animation.addEventListener('complete', () => {
      this.$el.style.display = 'none'
      this.$el.style.mixBlendMode = ''
    })
    this.animation.addEventListener('DOMLoaded', () => {
      this.isReady = true
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


