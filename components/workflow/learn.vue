<template>
  <article>
    <div class="title">
      <span>A.</span>
      <h2 ref="title">Learn</h2>
      <span ref="number">01</span>
    </div>
    <div class="brief">
      <div class="inner">
        <h4><span class="red">Briefing</span>Reseach</h4>
        <ul>
          <li class="opacity">Project Goals</li>
          <li class="opacity">Target Audience</li>
          <li class="opacity">Market</li>
          <li class="opacity">Competitors</li>
          <li>Functional Specifications</li>
          <li>Content Requirements</li>
        </ul>
          <v-svg-arrow class="arrow" aria-hidden="true"/>
      </div>
    </div>
    <div class="problem" ref="problem">
      <strong>Problem</strong>
      <p>User Needs<br>Product Objectives</p>
      <div class="blur-container" :class="{'ready': isBlurReady}">
        <v-svg-blur class="svg-blur" aria-hidden="true"/>
      </div>
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
      this.animHeight = this.h * .5
      this.offset = offset(this.$el).top - this.h * .9
    },
    tick(scrollTop, ease) {
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
    if(!this.isPhone)this.$el.style.opacity = 0
    this.lis = [].slice.call(this.$el.querySelectorAll('li'))
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
.arrow
  display block
  width 4.6vw
  height 2.1vw
  transform-origin 0 50%
  transform rotate(90deg) translateY(-50%)
  opacity 0.5
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
</style>
