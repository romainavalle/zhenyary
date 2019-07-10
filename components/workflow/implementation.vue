<template>
  <article class="implementation">
    <div class="title" :class="{'mobile-anime': isPhone}">
      <span >04</span>
      <h2 ref="title">Implementation</h2>
    </div>
    <no-ssr>
      <ul class="d-f skills" ref="skills" v-if="!isDevice">
        <li>UX architecture</li>
        <li>Visual concepts</li>
        <li>Interactions</li>
        <li>Development</li>
        <li>Testing</li>
        <li>🎂Project Birth</li>
      </ul>
    </no-ssr>
    <div class="d-f bottom" ref="bottom">
      <div :class="{'mobile-anime': isPhone}">

          <h5>
            <span class="line">Communication with the</span>
            <span class="line" :class="{'ready': isLineReady}"><span class="strike"><v-svg-bar class="bar" aria-hidden="true"/><span>client</span></span> <span class="end"><span class="partner">partner</span>  during the</span></span>
            <span class="line">whole process</span>
          </h5>
      </div>
      <div class="content">
        <div class="inner">
          <ul class="arrows" aria-hidden="true">
            <li><v-svg-arrow class="arrow"/></li>
            <li><v-svg-arrow class="arrow"/></li>
            <li><v-svg-arrow class="arrow"/></li>
            <li><v-svg-arrow class="arrow"/></li>
          </ul>
          <h3 ref="h3" :class="{'mobile-anime': isPhone}">Long-lasting Collaboration</h3>
          <h4 ref="h4" :class="{'mobile-anime': isPhone}">Trustful partner for you<br>and your business</h4>
          <p ref="text1" :class="{'mobile-anime': isPhone}">I truly believe in the power of a strong business relationship and years-long collaboration. Success is not a 1-day phenomenon it takes a lot of time and joint effort. </p>
          <p ref="text2" :class="{'mobile-anime': isPhone}">Common expertise developed over the years of trustful partnership is the core competence of the business and its driving force.</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import vSvgArrow from '~/assets/svgs/arrow.svg?inline';
import vSvgBar from '~/assets/svgs/bar.svg?inline'
import anime from 'animejs'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0,
      isLineReady: false,
      isAnimatedIn: false,
      isAnimatedBottomIn: false,
      isAnimatedBottomIn2: false
    }
  },
  components:{
    vSvgArrow, vSvgBar
  },
  computed: {
    ...mapGetters(['isPhone', 'isDevice'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.bottomOffset = offset(this.$refs.bottom).top - this.h
      this.animHeight = this.h * .5
      if(this.isPhone) return
      this.offset = offset(this.$el).top - this.h * .9
      this.bottomOffset2 = offset(this.$refs.h3).top - this.h
    },
    tick(scrollTop, ease) {
      if(this.isPhone) {
      }else{

      if(ease > this.bottomOffset + this.h *.1 && ease < this.bottomOffset + this.animHeight + this.h *.6){
        if(!this.isLineReady) this.isLineReady = true
      }else{
        if(this.isLineReady) this.isLineReady = false
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
      if(ease > this.bottomOffset2 + this.h * .3) {
        if(!this.isAnimatedBottomIn2)this.animateInBottom2()
      }
      if(ease < this.bottomOffset2) {
        if(this.isAnimatedBottomIn2)this.resetBottom2()
      }
      }
    },
    animateIn() {
      this.isAnimatedIn = true
      anime({targets: this.$el, translateY: 0, opacity: 1, duration: 1000, easing: 'easeOutQuad'})
      anime({targets: this.$refs.title, scaleX: 1, scaleY:1, duration: 2000, easing: 'easeOutQuad'})
      if(this.$refs.skills)anime({targets: this.lis, translateY: 0, opacity: 1, duration: 500, easing: 'easeOutQuad', delay: anime.stagger(100, {start: 500, easing: 'easeInQuad'})})
    },
    animateInBottom() {
      this.isAnimatedBottomIn = true
      anime({targets: this.$refs.bottom, opacity: 1,  translateY: 0, duration: 1000, easing: 'easeOutQuad'})
      anime({targets: this.arrows, translateY: '50%', opacity: 1, duration: 500, easing: 'easeOutQuad', delay: anime.stagger(100, {easing: 'easeInQuad'})})
    },
    animateInBottom2() {
      this.isAnimatedBottomIn2 = true
      const array = [this.$refs.h3,this.$refs.h4, this.$refs.text1, this.$refs.text2]
      anime({targets:array, translateY: 0, opacity: 1, duration: 1000, easing: 'easeOutQuad', delay: anime.stagger(250, { easing: 'easeInQuad'})})
    },
    reset() {
      this.isAnimatedIn = false
      anime.set(this.$el, {translateY: 200, opacity: 0})
      anime.set(this.$refs.title, {scaleX: 1.2, scaleY:1.2})
      if(this.$refs.skills)anime.set(this.lis, {translateY: 50, opacity: 0})
    },
    resetBottom() {
      this.isAnimatedBottomIn = false
      anime.set(this.$refs.bottom, {opacity: 0,  translateY: 200})
      anime.set(this.arrows, {translateY: '-150%', opacity: 0})
    },
    resetBottom2() {
      this.isAnimatedBottomIn2 = false
      const array = [this.$refs.h3,this.$refs.h4, this.$refs.text1, this.$refs.text2]
      anime.set(array, {translateY: 200, opacity: 0})
    }
  },
  mounted() {

    if(!this.isPhone) {
      this.$el.style.opacity = 0
      this.$refs.bottom.style.opacity = 0
      this.arrows = [].slice.call(this.$el.querySelectorAll('.arrows li'))

      this.$nextTick(()=>{
        if(this.$refs.skills) this.lis = [].slice.call(this.$refs.skills.querySelectorAll('li'))
        this.reset()
        this.resetBottom()
        this.resetBottom2()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
article.implementation
  padding 0 8vw 4vw
  .title h2
    font-family $walsheim
    font-weight $light
    font-size 12.3vw
    display block
    padding-bottom 2.5vw
  .d-f
    display flex
    justify-content space-between
    >div
      width 50%
  .skills
    padding-left 0.7vw
    li
      font-family $schnyder
      font-weight $demi
      font-size 20px
p
  width 45%
  font-size 14px
  +below('l')
    width 80%
h3, h4, h5
  font-family $schnyder
  font-weight $demi
h3
  font-size 4.1vw
  padding-bottom 1.5vw
h4
  font-size 2vw
  opacity 0.5
  padding-bottom 1.5vw
h5
  font-size 2vw
  width 50%
.bottom
  padding-top 4vw
  +below('l')
    padding-top 0
.arrows
  display flex
  padding 0
  padding-bottom 4vw
  overflow hidden
  margin-left -2vw
  li
    height 6.1vw
    width 4.1vw
    display block
  li + li
    margin-left 1.6vw
  +below('s')
    justify-content center
    li
      height 10vw
      width 8vw
.arrow
  display block
  width 100%
  height 100%
  fill $white
  position relative
  transform-origin 0 0
  transform rotate(90deg) translateY(-100%)
.line
  display block
  .strike
    position relative
    display inline-block
  svg
    left 0
    width 100%
    height 100%
    transform-origin 0 0
    position absolute
    transform scale(0,1)
  .end
    transform translateX(-6.2vw)
    display inline-block
  .partner
    opacity 0
    display inline-block
    transform-origin 0 0
    transform scale(.7,1)
  &.ready
    svg
      transform scale(1,1)
      transition transform 1s ease-out-quad .3s
    .strike span
      opacity .5
      transition opacity 1s ease-out-quad .3s
    .end
      transform translate(0)
      transition transform 1s ease-out-quad .3s
    .partner
      opacity 1
      transition transform .7s ease-out-quad .5s, opacity .7s ease-out-quad .5s
      transform scale(1)
article.implementation
  +below('s')
    position relative
    text-align center
    .end
      transform translateX(-21vw)
    .d-f
      display block
      >div
        width 100%
    h3
      font-size 12.5vw
      padding-bottom 5vh
    h4
      font-size 7vw
      padding-bottom 3vh
    h5
      font-size 7vw
      width 80%
      margin 5vh auto
    p
      margin 3vh auto

</style>
