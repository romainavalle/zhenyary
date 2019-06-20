<template>
  <div class="Loader">
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
  name: 'TurnDevice',
  data(){
    return {
      w: 0,
      h: 0,
      isReady: false,
      isFirstResize: true,
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
      anime.set(this.$refs.red, {opacity: 1})
      anime.set(this.$refs.pink, {opacity: 1})
      anime({
        targets: this.$refs.red,
        translateX: [this.w *.5-100,this.w *.5+ 80],
        translateY: [this.h * 1.2,this.h * .5 + 20],
        duration: 700,
        easing: 'easeOutCubic'
      })
      anime({
        targets: this.$refs.pink,
        translateX: [this.w *.5 + 300,this.w * .5 -50],
        translateY: [this.h * 1.2,this.h *.5 - 100],
        duration: 700,
        easing: 'easeOutQuad'

      })
      anime({
        targets: this.$refs.span,
        translateX: [-270, -270],
        translateY: [this.h * 1.2,this.h *.5 - 100],
        duration: 700,
        easing: 'easeOutCubic'
      })
    },
    hide() {
      anime({
        targets: this.$refs.red,
        opacity: 0,
        duration: 500,
        delay: 200,
        easing: 'easeOutQuad'
      })
      anime({
        targets: this.$refs.pink,
        opacity: 0,
        duration: 500,
        delay: 200,
        easing: 'easeOutQuad'
      })
      anime({
        targets: this.$refs.span,
        opacity: 0,
        duration: 500,
        delay: 200,
        easing: 'easeOutQuad',
        complete: ()=>{
          this.isFirstTime = false
          this.$el.style.display = 'none'
        }
      })
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
  z-index 999
  will-change opacity
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
  .circle
    position absolute
    top 0
    left 0
    width 250px
    height 250px
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


