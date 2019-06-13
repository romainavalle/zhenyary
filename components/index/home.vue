<template>
  <article class="home">
    <v-bottom-layer />
    <img src="/images/home/zhenya-bg.jpg" alt="Zhenya Rynzhuk">
    <h1 :class="{'ready': isReady }">
      <span class="label">Zhenya Rynzhuk</span>
      <no-ssr>
        <span class="left">
          <span>Zhenya </span>
        </span>
        <span class="right">
          <span>Rynzhuk</span>
        </span>
      </no-ssr>
    </h1>
    <img src="/images/home/zhenya-front.png" alt="Zhenya Rynzhuk">
    <v-top-layer />
    <button class="play" aria-label="play video">Play<br>Video</button>
    <div class="click">
     <button aria-label="click" @click="scrollTo"><v-svg class="star"></v-svg><span>Click click</span></button>
      <ul>
        <li>Art Direction</li>
        <li>Digital production</li>
        <li>Branding</li>
      </ul>
    </div>
    <v-home-footer />
  </article>
</template>
<script>
import vTopLayer from '~/components/index/homeTopLayer.vue'
import vBottomLayer from '~/components/index/homeBottomLayer.vue'
import vHomeFooter from '~/components/index/homeFooter.vue'
import vSvg from "~/assets/svgs/star.svg?inline";
import ScrollHelper from '~/assets/js/utils/ScrollHelper'

export default {
  data() {
    return {
      isReady: false,
      w:0,
      h:0
    }
  },
  components:{
    vBottomLayer, vTopLayer, vHomeFooter, vSvg
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop) {

    },
    scrollTo() {

      ScrollHelper.scrollTo(this.h)
    }
  },
  mounted() {
    this.$el.querySelector('.label').style.opacity = 0
    setTimeout(()=>{
      this.isReady = true
    }, 500)
  }
}
</script>

<style lang="stylus" scoped>
.home
  position relative
  height 100vh
  width 100vw
  button.play
    position absolute
    top 68vh
    left 50%
    transform translateX(-32vw)
    font-size 11px
    text-transform uppercase
    letter-spacing 6px
    text-align left
  .click
    position absolute
    text-align left
    left 75vw
    top 70vh
    ul
      font-size 18px
      font-family $schnyder
      line-height 1.5
      font-weight $demi
    button
      width 42px
      height 42px
      margin-left -42px
      position relative
      svg
        display block
        width 42px
        height 42px
        fill $red
      span
        color $red
        font-size 10px
        text-transform uppercase
        position absolute
        white-space nowrap
        top 0
        transform-origin 0 0%
        transform translateX(20px) rotate(-30deg)
  img
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    height auto
    width 30vw
  h1
    color white
    font-family $schnyder
    font-size 7vw
    font-weight $demi
    left 50%
    position absolute
    top 50%
    transform translate(-50%, -50%)
    white-space nowrap
    span
      display block
    .label
      opacity 0
    .left,.right
      position absolute
      top 0
      overflow hidden
      width 70%
      span
        transition transform 2s ease-out-quad
    .left
      left -20%
      span
        transform translateX(100%)
    .right
      right -20%
      text-align right
      span
        transform translateX(-100%)
    &.ready
      .left
        span
          transform translateX(0)
      .right
        span
          transform translateX(0)

</style>
