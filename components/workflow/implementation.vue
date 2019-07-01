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
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0,
      isLineReady: false
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
      this.bottomOffset = offset(this.$refs.bottom).top - this.h * .8
      this.animHeight = this.h * .5
      if(this.isPhone) return
      this.offset = offset(this.$el).top - this.h * .9
      this.bottomOffset2 = offset(this.$refs.h3).top - this.h * .8
    },
    tick(scrollTop, ease) {
      if(this.isPhone) {
      }else{
        if(ease > this.offset && ease < this.offset + this.animHeight){
          const coef = (ease - this.offset) / this.animHeight
          this.$el.style.opacity = coef
          transform(this.$el, {translate3d:[0, 200 - coef * 200, 0]})
          transform(this.$refs.title, {scale:[1+.2*(1-coef),1+.2*(1-coef)]})
          if(this.$refs.skills)transform(this.$refs.skills, {translate3d:[0, 200 - coef * 200, 0]})
        }
        if(ease > this.bottomOffset && ease < this.bottomOffset + this.animHeight){
          const coefBottom = (ease - this.bottomOffset) / this.animHeight
          this.$refs.bottom.style.opacity = coefBottom
          transform(this.$refs.bottom, {translate3d:[0, 200 - coefBottom * 200, 0]})
          this.arrows.forEach((arrow,i) => {
            transform(arrow, {translate3d:[0, -50 -100 * (i+1) + coefBottom * 100 * (i+2) + '%', 0]})
          });
        }
        if(ease > this.bottomOffset2 && ease < this.bottomOffset2 + this.animHeight){
          const coefBottom2 = (ease - this.bottomOffset2) / this.animHeight
          transform(this.$refs.h3, {translate3d:[0, 100 - coefBottom2 * 100, 0]})
          transform(this.$refs.h4, {translate3d:[0, 200 - coefBottom2 * 200, 0]})
          transform(this.$refs.text1, {translate3d:[0, 300 - coefBottom2 * 300, 0]})
          transform(this.$refs.text2, {translate3d:[0, 400 - coefBottom2 * 400, 0]})
        }
      }
      if(ease > this.bottomOffset + this.h *.1 && ease < this.bottomOffset + this.animHeight + this.h *.6){
        if(!this.isLineReady) this.isLineReady = true
      }else{
        if(this.isLineReady) this.isLineReady = false
      }
    }
  },
  mounted() {

    if(!this.isPhone) {
      this.$el.style.opacity = 0
      this.$refs.bottom.style.opacity = 0
      this.arrows = [].slice.call(this.$el.querySelectorAll('.arrows li'))
      transform(this.$refs.h3, {translate3d:[0, 100 - 0 * 100, 0]})
      transform(this.$refs.h4, {translate3d:[0, 200 - 0 * 200, 0]})
      transform(this.$refs.text1, {translate3d:[0, 300 - 0 * 300, 0]})
      transform(this.$refs.text2, {translate3d:[0, 400 - 0 * 400, 0]})
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
