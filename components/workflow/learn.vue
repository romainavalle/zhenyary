<template>
  <article>
    <div class="title" :class="{'mobile-anime': isPhone}">
      <span>A.</span>
      <h2 ref="title">Learn</h2>
      <span ref="number">01</span>
    </div>
    <div class="brief">
      <div class="inner">
        <h4 :class="{'mobile-anime': isPhone}"><span class="red">Briefing</span>Reseach</h4>
        <ul>
          <li class="opacity" :class="{'mobile-anime': isPhone}">Project Goals</li>
          <li class="opacity" :class="{'mobile-anime': isPhone}">Target Audience</li>
          <li class="opacity" :class="{'mobile-anime': isPhone}">Market</li>
          <li class="opacity" :class="{'mobile-anime': isPhone}">Competitors</li>
          <li :class="{'mobile-anime': isPhone}">Functional Specifications</li>
          <li :class="{'mobile-anime': isPhone}">Content Requirements</li>
        </ul>
        <no-ssr>
          <v-svg-arrow class="arrow" aria-hidden="true" v-if="!isPhone"/>
        </no-ssr>
      </div>
    </div>
    <div class="problem" ref="problem" :class="{'mobile-anime': isPhone}">
      <div class="blur-container" :class="{'ready': isBlurReady}">
        <v-svg-blur class="svg-blur" aria-hidden="true"/>
      </div>
      <strong>Problem</strong>
      <p>User Needs<br>Product Objectives</p>
      <no-ssr>
        <v-svg-arrow class="arrow mobile-anime" aria-hidden="true" v-if="isPhone"/>
      </no-ssr>
    </div>
  </article>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
import vSvgBlur from "~/assets/svgs/blur.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0,
      isBlurReady: false
    }
  },
  components: {
    vSvgArrow, vSvgBlur
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
      this.offset = offset(this.$el).top - this.h * .9
    },
    tick(scrollTop, ease) {
      if(this.isPhone) return
      if(ease > this.offset && ease < this.offset + this.animHeight){
        const coef = (ease - this.offset) / this.animHeight
        this.$el.style.opacity = coef
        transform(this.$el, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.title, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.number, {translate3d:[0, 400 - coef * 400, 0]})
        transform(this.$refs.problem, {translate3d:[0, 100 - coef * 100, 0]})
        this.lis.forEach((li, i) => {
          transform(li, {translate3d:[0, (i+1) * 50 - coef * (i+1) * 50, 0]})
        })
      }
      if(ease > this.offset + this.animHeight - this.h * .1 && ease < this.offset + this.h * 1.5) {
        if(!this.isBlurReady) this.isBlurReady = true
      }else{
        if(this.isBlurReady) this.isBlurReady = false
      }
    }
  },
  mounted() {
    if(!this.isPhone){
      this.$el.style.opacity = 0
      this.lis = [].slice.call(this.$el.querySelectorAll('li'))
    }else{
      this.isBlurReady = true
    }
  }
}
</script>

<style lang="stylus" scoped>
article
  display flex
  padding 0 8vw 5vw
  justify-content space-between
  >div
    width 30%


.opacity
  opacity 0.5
h4
  font-size 3.4vw
  font-family $schnyder
  font-weight $demi
.red
  display block
.brief
  display flex
  justify-content flex-end
  .inner
    width 55%
    padding-top 5vw
  .arrow
    display block
    width 4.6vw
    height 2.1vw
    transform-origin 0 50%
    transform rotate(90deg) translateY(-50%)
    opacity 0.5
ul
  margin-bottom 3vw
li
  margin-top 10px
  display block

strong
  font-size 4.1vw
  font-weight normal
  display block
p
  font-size 1.5vw
  margin 0

.problem
  position relative
  padding-top 18vw
.blur-container
  position absolute
  left 8vw
  top 23vw
  z-index -1
.svg-blur
  width 25vw
  height 25vw
  display block
  transform translate(-50%, -50%)
article
  +below('s')
    text-align center
    display block
    >div
      width 100%
    h4
      font-size 12.5vw
    .brief
      display block
      position relative
      z-index 1
      .inner
        width 100%
    .problem
      text-align left
      padding-left 50%
      position relative
      padding-top 5vh
      strong
        font-size 12.5vw
      p
        font-size 15px
      .arrow
        display block
        width 28vw
        height 13vw
        transform-origin 0 50%
        transform rotate(90deg) translateY(-50%)
        opacity 0.5
        position absolute
        left 5vw
        top 5vh
      .blur-container
        z-index 0
        left 65vw
        svg
          width 70vw
          height 70vw

</style>
