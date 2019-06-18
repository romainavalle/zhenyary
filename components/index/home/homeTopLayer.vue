<template>
  <div class="top-layer">
    <div class="horizontal" ref="bar"/>
    <div class="circle" ref="circle"/>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  methods: {
    show(){

      anime({
        targets: this.$refs.circle,
        translateX: '-95%',
        translateY: '-50%',
        scaleX: 1,
        scaleY: 1,
        opacity: .1,
        easing: 'easeOutQuad',
        delay: 500,
        duration: 1500
      })
      anime({
        targets: this.$refs.bar,
        scaleX: 1,
        easing: 'easeOutQuad',
        duration: 1500,
        delay: 700,
      })
    }
  },
  mounted() {
    anime.set(
      this.$refs.circle,
      {
        translateX: '-95%',
        translateY: '-50%',
        scaleX: .5,
        scaleY: .5,
        opacity: 0
      }
    )
    anime.set(
      this.$refs.bar,
      {
        scaleX: 0
      }
    )
  }
}
</script>

<style lang="stylus" scoped>
.top-layer
  height 100vh
  left 0
  pointer-events none
  position absolute
  top 0
  width 100vw
  .horizontal
    height 2px
    border-bottom 1px solid $black
    left 0
    opacity 0.1
    transform-origin 0% 50%
    position absolute
    top 65vh
    width 100%
  .circle
    border solid 1px $black
    border-radius 50%
    height 45vw
    left 50%
    position absolute
    top 50%
    width 45vw
</style>
