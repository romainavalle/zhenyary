<template>
  <div class="Loader">
    <div class="bg" v-show="!isFirstTime" ref="bg"></div>
    <div class="circle red" ref="red">
      <svg viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20"/>
      </svg>
    </div>
    <div class="circle pink" ref="pink">
      <svg viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20"/>
      </svg>
    </div>
    <span ref="span" v-show="isFirstTime">Hey!</span>
  </div>
</template>
<script>
import anime from 'animejs'
export default {
    data(){
    return {
      w: 0,
      h: 0,
      isFirstTime: true
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
      anime.set(this.$refs.pink, {opacity: 1})
      anime.set(this.$refs.red, {opacity: 1})
      anime({
        targets: this.$refs.red,
        translateX: [this.w *.5-100,this.w *.5+ 80 * this.w / 1920],
        translateY: [this.h * 1.2,this.h * .5 + 20 * this.w / 1920],
        duration: 500,
        easing: 'easeOutCubic'
      })
      anime({
        targets: this.$refs.pink,
        translateX: [this.w *.5 + 300,this.w * .5 - 50 * this.w / 1920],
        translateY: [this.h * 1.2,this.h *.5 - 100 * this.w / 1920],
        duration: 500,
        easing: 'easeOutQuad'
      })
      if(this.isFirstTime) {
        const posX = this.w >=  1024 ? -270 : -100
        const posY = this.w >=  1024 ? this.h *.5 - 100 : this.h *.5 -20
        anime({
          targets: this.$refs.span,
          translateX: [posX, posX],
          translateY: [this.h * 1.2,posY],
          duration: 500,
          easing: 'easeOutCubic'
        })
      }else{
        anime({
          targets: this.$refs.bg,
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOutCubic'
        })
      }
    },
    hide() {

      if(this.isFirstTime) {
        anime({
          targets: this.$refs.span,
          opacity: 0,
          duration: 1500,
          delay: 500,
          easing: 'easeOutQuad',
          complete: ()=>{
            this.isFirstTime = false
            this.$el.style.display = 'none'
          }
        })
        anime({
          targets: this.$refs.red,
          opacity: 0,
          duration: 1500,
          delay: 500,
          easing: 'easeOutQuad'
        })
        anime({
          targets: this.$refs.pink,
          opacity: 0,
          duration: 1500,
          delay: 500,
          easing: 'easeOutQuad'
        })
      }else{
        anime({
          targets: this.$refs.bg,
          opacity: 0,
          duration: 300,
          delay: 200,
          easing: 'easeInCubic',
          complete: () => {
              this.$el.style.display = 'none'
          }
        })
        anime({
          targets: this.$refs.red,
          translateX: this.w *.5 + 180,
          translateY: -this.h * .2,
          duration: 500,
          easing: 'easeInCubic'
        })
        anime({
          targets: this.$refs.pink,
          translateX: this.w * .5 - 350,
          translateY: -this.h * .2,
          duration: 500,
          easing: 'easeInQuad'
        })
      }
    }
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {
    this.resize(window.innerWidth, window.innerHeight)
    this.show()
  }
}

</script>

<style lang="stylus" scoped>
.Loader
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  transfrom translate3d(0, 0, 0)
  z-index 999
  .bg
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    will-change opacity
    background #000000
  span, .circle
    transform translateX(-20000px)
  span
    font-family $schnyder
    font-weight $demi
    font-size 100px
    display block
    position absolute
    top 0
    left 50%
    color $white
    +below('m')
      font-size 50px
  .circle
    will-change opacity
    position absolute
    top 0
    left 0
    width 13vw
    height 13vw
    +below('l')
      width 100px
      height 100px
    svg
      display block
      width 100%
      height 100%
      transform translate(-50%, -50%)
    &.red svg
      fill $red
    &.pink svg
      fill $pink
  &.transparent
    background none
  .animation
    top 0
    left 0
    right 0
    bottom 0
    position absolute
</style>


