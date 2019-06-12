<template>
  <section class="contact">
    <p>Let’s make something great!<br>Reach out <a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank">hey@zhenyary.com</a>  for wonderfull collaborations. <v-svg-star class="star" /></p>
    <no-ssr>
      <div>
        <div class="line">Let’s make <strong class="italic">something</strong> great!</div>
        <div class="line"><span class="rounded">Reach out</span><a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank">hey@zhenyary.com</a></div>
        <div class="line">for <span class="underline">wonderfull</span> <span class="slider-container"><span class="slider"><span>collaborations</span><span>cooool stories</span><span>new projects</span></span>.</span><v-svg-star class="star" /></div>
      </div>
    </no-ssr>
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vSvgStar from "~/assets/svgs/star.svg?inline";
import { mapState } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  computed: {
  },
  components: {
    vSvgStar
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop) {
    }
  },
  mounted() {
    this.$el.querySelector('p').style.display = 'none'
    Emitter.emit('PAGE:MOUNTED')
  },
}
</script>

<style lang="stylus" scoped>
.contact
  position relative
  width 100vw
  height 100vh
  font-size 7.6vw
  position relative
  display flex
  align-items center
  font-family $schnyder
  font-weight $demi
  .line
    width 100vw
    padding 1vh 6vw
    line-height 1.1
    display flex
    justify-content space-between
    align-items baseline
    &:llast-child
      overflow hidden
      height 9vw
  .rounded
    border .15vw solid $black
    border-radius 50%
    font-size 2.9vw
    padding 2.9vw 5vw
  .underline
    font-size 1.5vw
    line-height 2
    padding 0 10vw
    align-self center
    border-bottom .3vw solid black
  a
    color $red
    border-bottom 0.3vw solid $red
  .slider-container
    display flex
  .slider
    overflow hidden
    display block
    height 9vw
    span
      display block
  svg
    display block
  .arrow
    width 6.8vw
    height 4.5vw
  .star
    width 4.5vw
    height 4.5vw
    fill $red
</style>


