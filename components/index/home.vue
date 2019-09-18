<template>
  <article class="home" :class="color">
    <no-ssr>
      <v-background />
    </no-ssr>
    <no-ssr>
      <v-circles :circles="homeCircles[0]" :id="0" ref="circles-0" aria-hidden="true" />
    </no-ssr>
    <no-ssr>
      <v-bottom-layer ref="bottomLayer" aria-hidden="true"/>
    </no-ssr>
    <div class="img-container" ref="imgBack">
      <img src="" data-src="/images/home/zhenya-bg.jpg" alt="Zhenya Rynzhuk" width="1070" height="1184" :class="{'js-fs-on-mobile': isPhone}">
      <div class="hover">
        <img v-for="(n, i) in totalHover" v-show="isHover && currentHover === i" :key="i" :data-src="`/images/home/${i}.jpg`" alt="Zhenya Rynzhuk" width="1070" height="1184" :class="[`mom-${i}`, {'js-fs-on-mobile': isPhone}]">
      </div>
    </div>
    <no-ssr>
      <v-circles :circles="homeCircles[1]" :id="1"  ref="circles-1"  aria-hidden="true"/>
    </no-ssr>
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
    <div class="img-container img-front" ref="imgFront">
      <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @touchstart="onMouseEnter" @touchend="onMouseLeave">
        <img src="" data-src="/images/home/zhenya-front.png" alt="Zhenya Rynzhuk" width="1070" height="1184" :class="{'js-fs-on-mobile': isPhone}">
      </div>
    </div>
    <no-ssr>
      <v-top-layer ref="topLayer"  aria-hidden="true"/>
    </no-ssr>
    <button class="play" aria-label="play video" ref="play" @click="onPlayBtClicked">Play<br>Showreel</button>
    <div class="click">
     <button aria-label="click" @click="showCircles" ref="click"><v-svg class="star"></v-svg><span>Click click</span></button>
      <ul ref="skills">
        <li>Art direction</li>
        <li>Digital production</li>
        <li>Branding</li>
      </ul>
    </div>
    <no-ssr>
      <v-circles :circles="homeCircles[2]" :id="2"  ref="circles-2" aria-hidden="true"/>
    </no-ssr>
    <v-home-footer ref="footer"/>
  </article>
</template>
<script>
import { easeInQuad } from '~/assets/js/utils/easings'
import vCircles from '~/components/index/home/homeCircles.vue'
import vTopLayer from '~/components/index/home/homeTopLayer.vue'
import vBottomLayer from '~/components/index/home/homeBottomLayer.vue'
import vBackground from '~/components/index/home/homeBackground.vue'
import vHomeFooter from '~/components/index/home/homeFooter.vue'
import vSvg from "~/assets/svgs/star.svg?inline";
import MouseHelper from '~/assets/js/utils/MouseHelper'
import homeCircles from '~/assets/datas/homeCircles.json';
import transform from 'dom-transform'
import anime from 'animejs'
import Emitter from '~/assets/js/events/EventsEmitter'
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      totalHover: 11,
      isReady: false,
      isHover: false,
      w:0,
      h:0,
      homeCircles,
      circlesShown: false,
      currentHover: 0
    }
  },
  computed: {
    ...mapState(['color']),
    ...mapGetters(['isDevice', 'isPhone'])
  },
  components:{
    vBottomLayer, vTopLayer, vHomeFooter, vSvg, vCircles, vBackground
  },
  methods: {
    ...mapActions(['setVideo']),
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
      const direction = this.w > 768 ? 1 : -1
      transform(this.$refs.topLayer.$el, { translate3d: [0, coef * 100, 0] })
      transform(this.$refs.title, { translate3d: [0, direction * coef * 300, 0] })
      transform(this.$refs.imgBack, { translate3d: [0, coef * 200, 0] })
      transform(this.$refs.imgFront, { translate3d: [0, coef * 200, 0] })
      this.$refs.title.style.opacity = 1 - coef * 2
      if(this.circlesShown) {
        this.circles.forEach(circle => {
          circle.tick(.5 - MouseHelper.easeSlowX / this.w, .5 - MouseHelper.easeSlowY / this.h)
        })
      }

      if(!this.isDevice) {
        const x = MouseHelper.x
        const y = MouseHelper.y + scrollTop
        const easeX = MouseHelper.easeX
        const easeY = MouseHelper.easeY + scrollTop

        const posX = this.w * .5 - this.w * .32
        const posY = this.h * .68
        const dist = this.distance(x,y,posX,posY)

        let pourc = 0
        if(dist < 200) {
          pourc = easeInQuad(1 - (dist / 200))
          if(pourc > 1) pourc = 1
        }
        const newPosX = (x-posX) * pourc - this.w * .32
        const newPosY = (y-posY) * pourc
        transform(this.$refs.play, {translate3d: [newPosX , newPosY,0]})
      }
    },
    onMouseEnter() {
      this.isHover = true
      this.hoverTimeout = setTimeout(this.incrementHover.bind(this), 120)
      this.$refs.imgFront.style.opacity = 0
    },
    onMouseLeave() {
      this.isHover = false
      clearTimeout(this.hoverTimeout)
    },
    incrementHover() {
      this.currentHover++
      if(this.currentHover === this.totalHover)this.currentHover = 0
      this.hoverTimeout = setTimeout(this.incrementHover.bind(this), 120)
    },
    onPlayBtClicked() {
      this.setVideo(true)
      Emitter.emit('VIDEO_BUTTON_CLICKED')
    },
    showCircles() {
      MouseHelper.setMouse()
      this.circlesShown = !this.circlesShown
      this.circles.forEach(circle => {
        circle.toggleShow(this.circlesShown)
      })
    },
    distance(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    },
    show() {
      this.isReady = true
      this.$refs.topLayer.show()
      this.$refs.bottomLayer.show()
      this.$refs.footer.show()
      anime({
        targets: [this.$refs.play, this.$refs.click],
        opacity: 1,
        easing: 'easeOutQuad',
        duration: 700,
        delay: anime.stagger(400, {start: 1000}),
        complete: () => {
          this.$refs.imgFront.style.opacity = 0
        }
      })
      anime({
        targets: this.skills,
        opacity: 1,
        translateY: '0%',
        easing: 'easeOutQuad',
        duration: 700,
        delay: anime.stagger(100, {start: 1300})
      })
    }
  },
  mounted() {
    this.$el.querySelector('.label').style.opacity = 0
    this.$nextTick(()=>{
      this.circles = [this.$refs['circles-0'],this.$refs['circles-1'],this.$refs['circles-2']]
    })
    this.skills = [].slice.call(this.$refs.skills.querySelectorAll('li'))
    anime.set(this.$refs.play,{opacity: 0})
    anime.set(this.$refs.click,{opacity: 0})
    anime.set(this.skills,{opacity: 0, translateY: '100%'})
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
  width 30vw
  top 50%
  left 50%
  &.img-front
    z-index 5
    div
      user-select none
      position absolute
      transform translate(-50%, -50%)
      display block
      img
        transform none

  img
    display block
    position relative
    transform translate(-50%, -50%)
    max-width 100%
  .hover
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    img
      position absolute
  +below('l')
    width 50vw
  +below('s')
    width 90vw
h1
  color white
  font-family $schnyder
  font-size 7vw
  font-weight $demi
  left 50%
  position absolute
  top 50%
  transform translate(-50%, -50%)
  user-select none
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
    right -25%
    text-align right
    span
      transform translateX(-100%)
  &.ready
    .left, .right
      span
        transform translateX(0)
  +below('l')
    font-size 10vw
    height 55vw
    width 50vw
    z-index 3
    .right, .left
      top auto
      right auto
      left 50%
      bottom auto
      text-align center
      span
        opacity 0
        transition transform 1s ease-out-quad,  opacity 1s ease-out-quad
    .left
      top 0
      left 50%
      transform translate(-50%, -60%)
      span
        transform translate(0, 100%)
    .right
      bottom 0
      transform translate(-50%, 40%)
      span
        opacity 0
        transform translate(0, -100%)
    &.ready
      .left, .right
        span
          opacity 1
          transform translate(0, 0)

  +below('s')
    height 100vw
    width 90vw

.play
  position absolute
  top 68vh
  left 50%
  transform translateX(-32vw)
  font-size 11px
  text-transform uppercase
  letter-spacing 6px
  text-align left
  +below('l')
    transform translate(25vw, -33vw)
    top 50%
  +below('s')
    top 2vh
    text-align center
    width 50%
    left 50%
    transform translate(-50%, 0)

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

  +below('l')
    text-align center
    left 50vw
    transform translateX(-50%)
    font-size 21px
    top 75vh
    button
      pointer-events none
      margin-left 0
      width 100%
    span
      display none
    svg
      margin 0 auto
  +below('s')
    display none
.red
  .play
    color $white
  .click
    svg
      fill $brown
    span
      color $white
    ul
      color $white
</style>
