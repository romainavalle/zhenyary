<template>
  <article>
    <div class="title" :class="{'mobile-anime': isPhone}">
      <span>C.</span>
      <h2 ref="title">Create</h2>
      <span ref="number">03</span>
    </div>
    <div class="content">
      <no-ssr><strong class="red mobile-anime" v-if="isPhone">brand strategy</strong></no-ssr>
      <h3 :class="{'mobile-anime': isPhone}"><no-ssr><div class="bar" aria-hidden="true" ref="bar" v-if="!isPhone"></div></no-ssr> UX strategy <small class="red">/ brand strategy</small><br>Visual strategy</h3>
      <p ref="text" :class="{'mobile-anime': isPhone}">To succeed, every digital product has to be aesthetically appealing, functional, robust, distinctive and memorable. To ensure that the right balance of these components is maintained I always stay in close contact with the client and address every project holistically.</p>
      <div :class="{'mobile-anime': isPhone}">
        <v-svg-star class="star" aria-hidden="true"/>
      </div>
      <ul ref="bottom" :class="{'mobile-anime': isPhone}" class="bottom">
        <li class="blur-container" :class="{'ready': isBlurReady}">
          <v-svg-blur class="svg-blur" aria-hidden="true" />
        </li>
        <li :class="{'mobile-anime': isPhone}">product</li>
        <li :class="{'mobile-anime': isPhone}">creation</li>
        <li :class="{'mobile-anime': isPhone}">stage</li>
      </ul>
    </div>
  </article>
</template>

<script>
import vSvgBlur from "~/assets/svgs/blur.svg?inline";
import vSvgStar from "~/assets/svgs/star.svg?inline";
import anime from 'animejs'
import splitLines from '~/assets/js/utils/splitLines'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0,
      isBlurReady: false,
      isAnimatedIn: false,
      isAnimatedBottomIn: false
    }
  },
  components: {
    vSvgStar,vSvgBlur
  },
  computed: {
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      if(this.isPhone) return
      this.animHeight = this.h * .5
      this.offset = offset(this.$el).top - this.h
      this.bottomOffset = offset(this.$refs.bottom).top - this.h
    },
    tick(scrollTop, ease) {
      if(this.isPhone) return
      /*if(ease > this.offset && ease < this.offset + this.animHeight){
        const coef = (ease - this.offset) / this.animHeight
        this.$el.style.opacity = coef
        transform(this.$el, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.bar, {scaleX: coef })
        transform(this.$refs.title, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.text, {translate3d:[0, 100 - coef * 100, 0]})
        transform(this.$refs.number, {translate3d:[0, 400 - coef * 400, 0]})
      }
      if(ease > this.bottomOffset && ease < this.bottomOffset + this.animHeight){
        const coefBottom = (ease - this.bottomOffset) / this.animHeight
        this.$refs.bottom.style.opacity = coefBottom
        this.lis.forEach((li, i) => {
          const pos = 100 + i * 100
          transform(li, {translate3d:[0, pos - coefBottom * pos, 0]})
        });
      }*/
      if(ease > this.bottomOffset && ease < this.bottomOffset + this.animHeight + this.h * .6){
        if(!this.isBlurReady) this.isBlurReady = true
      }else{
        if(this.isBlurReady) this.isBlurReady = false
      }
      if(ease > this.offset + this.h * .3) {
        if(!this.isAnimatedIn)this.animateIn()
      }
      if(ease < this.offset) {
        if(this.isAnimatedIn)this.reset()
      }
      if(ease > this.bottomOffset + this.h * .3) {
        if(!this.isAnimatedBottomIn)this.animateInBottom()
      }
      if(ease < this.bottomOffset) {
        if(this.isAnimatedBottomIn)this.resetBottom()
      }
    },
    animateIn() {
      this.isAnimatedIn = true
      anime({targets: this.$el, opacity: 1, translateY: 0, duration: 1000, easing: 'easeOutQuad'})
      anime({targets: this.$refs.bar, scaleX: 1, duration: 400, easing: 'easeOutQuad', delay: 100})
      anime({targets: this.$refs.number, opacity: 1, translateY: 0, duration: 1000, easing: 'easeOutQuad', delay: 100})
      anime({targets: this.lines, opacity: 1, translateY: 0, duration: 1000, easing: 'easeOutQuad', delay: anime.stagger(50, {start: 200, easing: 'easeInQuad'})})
    },
    animateInBottom() {
      this.isAnimatedBottomIn = true
      anime({targets: this.lis, opacity: 1, translateY: 0, duration: 1000, easing: 'easeOutQuad', delay: anime.stagger(50, {easing: 'easeInQuad'})})
    },
    reset() {
      this.isAnimatedIn = false
      anime.set(this.$el, {opacity: 0, translateZ:0, translateY: 200})
      anime.set(this.$refs.bar, {scaleX: 0})
      anime.set(this.$refs.process, {opacity: 0, translateZ:0, translateY: 200})
      anime.set(this.lines, {opacity: 0, translateZ:0, translateY: 50})
      anime.set(this.$refs.number, {opacity: 0, translateZ:0, translateY: 200})
    },
    resetBottom() {
      this.isAnimatedBottomIn = false
      anime.set(this.lis, {opacity: 0, translateZ:0, translateY: 200})
    }
  },
  mounted() {
    if(this.isPhone) {
      this.isBlurReady = true
    }else{
      this.lis = [].slice.call(this.$refs.bottom.querySelectorAll('li'))
      splitLines(this.$refs.text)
      this.lines = [].slice.call(this.$refs.text.querySelectorAll('.line'))
      this.reset()
      this.resetBottom()
    }
  }
}
</script>

<style lang="stylus" scoped>

article
  display flex
  padding 0 8vw 4vw
  justify-content space-between
  .title
    width 30%
  .content
    width 51%
    padding-right 20%
    +below('l')
      width 55%
      padding-right 10%
      padding-left 5vw
h3
  font-size 4.1vw
  font-family $schnyder
  font-weight $demi
  position relative
  padding-top 2vw
  .bar
    width 100%
    height 0.2vw
    background $black
    position absolute
    top 0
    left 0
    transform-origin 0 0
  small
    font-family $walsheim
    font-weight $light
    font-size 0.9vw
p
  padding-top 2vh
  padding-bottom 5vh
  font-size 14px
.star
  fill $red
  width 3vw
  height 3vw
  margin-left -1.5vw
li
  font-size 4.1vw
  font-family $schnyder
  font-weight $demi
  line-height 1
.bottom
  position relative
.blur-container
  position absolute
  left 5vw
  top 10vw
  z-index -1
.svg-blur
  width 30vw
  height 30vw
  display block
  transform translate(-50%, -50%)
article
  +below('s')
    display block
    text-align center
    padding 10vh 13vw
    h3
      font-size 12.5vw
      .red
        display none
    .content
      width 100%
      padding 5vh 0 0
      strong
        font-size 13px
        text-transform uppercase
        font-weight normal
    p
      position relative
      z-index 1
    .star
      width 40px
      height 40px
      margin-bottom 5vh
      position relative
      z-index 1
    li
      font-size 12.5vw
      position relative
    .blur-container
      z-index 0
      left 20vw
      svg
        width 100vw
        height 100vw

</style>
