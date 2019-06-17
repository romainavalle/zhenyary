<template>
  <article class="home" :class="color">
    <v-background />
    <v-circles :circles="homeCircles[0]" :id="0" ref="circles-0"/>
    <v-bottom-layer />
    <div class="img-container">
      <img src="/images/home/zhenya-bg.jpg" alt="Zhenya Rynzhuk" ref="imgBack">
    </div>
    <v-circles :circles="homeCircles[1]" :id="1"  ref="circles-1"/>
    <h1 :class="{'ready': isReady }">
      <span class="label">Zhenya Rynzhuk</span>
      <no-ssr>
        <div class="title-container" ref="title">
          <span class="left">
            <span>Zhenya </span>
          </span>
          <span class="right">
            <span>Rynzhuk</span>
          </span>
        </div>
      </no-ssr>
    </h1>
    <div class="img-container">
      <img src="/images/home/zhenya-front.png" alt="Zhenya Rynzhuk" ref="imgFront">
    </div>
    <v-top-layer ref="topLayer"/>
    <button class="play" aria-label="play video">Play<br>Video</button>
    <div class="click">
     <button aria-label="click" @click="showCircles"><v-svg class="star"></v-svg><span>Click click</span></button>
      <ul>
        <li>Art Direction</li>
        <li>Digital production</li>
        <li>Branding</li>
      </ul>
    </div>
    <v-circles :circles="homeCircles[2]" :id="2"  ref="circles-2"/>
    <v-home-footer />
  </article>
</template>
<script>
import vCircles from '~/components/index/home/homeCircles.vue'
import vTopLayer from '~/components/index/home/homeTopLayer.vue'
import vBottomLayer from '~/components/index/home/homeBottomLayer.vue'
import vBackground from '~/components/index/home/homeBackground.vue'
import vHomeFooter from '~/components/index/home/homeFooter.vue'
import vSvg from "~/assets/svgs/star.svg?inline";
import MouseHelper from '~/assets/js/utils/MouseHelper'
import homeCircles from '~/assets/datas/homeCircles.json';
import transform from 'dom-transform'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isReady: false,
      w:0,
      h:0,
      homeCircles,
      circlesShown: false
    }
  },
  computed: {
    ...mapState(['color'])
  },
  components:{
    vBottomLayer, vTopLayer, vHomeFooter, vSvg, vCircles, vBackground
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }

      this.circles.forEach(circle => {
        circle.resize(this.w, this.h)
      })
    },
    tick(scrollTop) {
      const coef = scrollTop / this.h
      transform(this.$refs.topLayer.$el, { translate3d: [0, coef * 100, 0] })
      transform(this.$refs.title, { translate3d: [0, coef * 300, 0] })
      transform(this.$refs.imgBack, { translate3d: [0, coef * 200, 0] })
      transform(this.$refs.imgFront, { translate3d: [0, coef * 200, 0] })
      this.$refs.title.style.opacity = 1 - coef * 2
      if(!this.circlesShown) return
      MouseHelper.tick()
      this.circles.forEach(circle => {
        circle.tick(.5 - MouseHelper.easeSlowX / this.w, .5 - MouseHelper.easeSlowY / this.h)
      })
    },
    showCircles() {
      MouseHelper.setMouse()
      this.circlesShown = !this.circlesShown
      this.circles.forEach(circle => {
        circle.toggleShow(this.circlesShown)
      })
    }
  },
  mounted() {
    this.$el.querySelector('.label').style.opacity = 0
    this.circles = [this.$refs['circles-0'],this.$refs['circles-1'],this.$refs['circles-2']]

    setTimeout(()=>{
      this.isReady = true
    }, 3000)
  }
}
</script>

<style lang="stylus" scoped>
.home
  position relative
  height 100vh
  width 100vw
  z-index 1
  overflow hidden
.img-container
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
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
  .title-container
    position absolute
    top 0
    left 0
    bottom 0
    right 0
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
.play
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
.red .click
  svg
    fill $brown
  span
    color $white
  ul
    color $white
</style>
