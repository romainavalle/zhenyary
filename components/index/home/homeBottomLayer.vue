<template>
  <div class="bottom-layer">
    <div class="vertical" ref="bar"/>
    <ul class="numbers" >
      <li v-for="(item, index) in 9" :key="index" ref="numbers">0{{index + 1}}</li>
    </ul>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  computed: {
  },
  methods: {
    show(){
      anime({
        targets: this.$refs.numbers,
        translateY: 0,
        opacity: 1,
        easing: 'easeOutQuad',
        duration: 500,
        delay: anime.stagger(200, {easing: 'easeOutIn'})
      })
      anime({
        targets: this.$refs.bar,
        scaleY: 1,
        easing: 'easeOutQuad',
        duration: 2000
      })
    }
  },
  mounted() {
    anime.set(
      this.$refs.numbers,
      {
        translateY: 30,
        opacity: 0
      }
    )
    anime.set(
      this.$refs.bar,
      {
        scaleY: 0
      }
    )
  }
}
</script>

<style lang="stylus" scoped>
.bottom-layer
  height 100vh
  left 0
  pointer-events none
  position absolute
  top 0
  width 100vw
  .bg
    background $red
    bottom 0
    left 0
    position absolute
    right 0
    top 0
  .vertical
    background $black
    height 100%
    left 50%
    position absolute
    top 0
    transition opacity .5s ease-out-cubic
    transform-origin 50% 0%
    width 1px
    opacity 0.1
  .numbers
    position absolute
    width 100%
    top 33vh
    display flex
    opacity .3
    transition opacity .5s ease-out-cubic
    justify-content space-between
    li
      padding 0 4vw
      letter-spacing 6px
      color $black
  .red &
    .numbers
      opacity .5
    .vertical
      opacity 0.2
  +below('l')
    .numbers
      display none
  +between('m', 'l')
    .vertical
      display none
</style>
