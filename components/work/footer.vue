<template>
  <footer>
    <nuxt-link :to="{name: 'work'}" class="strong back">Back To All Projects</nuxt-link>
    <div class="next">
      <span class="strong">next</span>
      <span class="letter" ref="letter">{{letter}}<span class="dot" ref="dot">.</span></span>
    </div>
    <div class="right">
      <nuxt-link :to="{name: 'work-slug', params: {slug: nextWork.slug}}" :aria-label="nextWork.title">
        <h3 v-html="nextWork.title"></h3>
        <ul>
          <li v-for="(skill, index) in nextWork.skills" :key="`skill-${index}`" v-text="index === 0 ? skill : ` / ${skill}`" class="strong"></li>
        </ul>
        <div class="arrow" ref="arrow">
          <v-svg-arrow class="black"/><v-svg-arrow class="red"/>
        </div>
      </nuxt-link>
    </div>
  </footer>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['nextWork']),
    letter() {
      return this.nextWork.title.charAt(0)
    }
  },
  components: {
    vSvgArrow
  },
  methods: {
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h
      this.offsetLetter = this.offset + this.h * .3
      this.offsetDot = this.offset + this.h * .4

    },
    tick(scrollTop, ease){
      if(ease > this.offset) {
        const coef = (ease - this.offset) / (this.h * .6)
        this.$el.style.opacity = coef
        transform(this.$el, {translate3d:[0, 150 - 150 * coef, 0]})
        this.$el.style.opacity = coef

      }
      if(ease > this.offsetLetter) {
        const coefLetter = (ease - this.offsetLetter) / (this.h * .3)
        transform(this.$refs.letter, {translate3d:[0, this.w * .1 - this.w * .1 * coefLetter, 0]})
        this.$refs.letter.style.opacity = coefLetter
        transform(this.$refs.arrow, {translate3d:[ -this.w * .05 + this.w * .05 * coefLetter, 0, 0]})
        this.$refs.arrow.style.opacity = coefLetter
      }
      if(ease > this.offsetDot) {
        const coefDot = Math.min((ease - this.offsetDot) / (this.h * .18), 1)
        this.$refs.dot.style.opacity = coefDot
        transform(this.$refs.dot, {translate3d:[0, -this.w * .1 + this.w * .1 * coefDot, 0]})
      }
    }
  },
  mounted() {
    this.$el.style.opacity = 0
    this.$refs.letter.style.opacity = 0
    this.$refs.arrow.style.opacity = 0
    this.$refs.dot.style.opacity = 0
    transform(this.$el, {translate3d:[0, 150, 0]})
  }
}

</script>

<style lang="stylus" scoped>
footer
  padding 10vh 6vw
  height 60vh
  display flex
  justify-content space-between
  >*
    flex 1
.letter
  padding-top 4vw
  font-size 10.5vw
  line-height .68
  display block
  padding-left 6.4vw
  font-weight $light
.dot
  display inline-block
.next
  text-align center
li
  display inline
h3
  font-size 36px
  margin-bottom 10px
.right
  display flex
  justify-content flex-end
  margin-top -.5vw
.right>a
  display block
  transition color .6s ease-in-out-cubic
.arrow
  width 8vw
  height 5vw
  margin-top 3vw
  position relative
  svg
    display block
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    fill $black
    &.red
      fill $red
      opacity 0
      transition transform .6s ease-in-out-cubic,  opacity .6s ease-in-out-cubic
    &.black
      transition transform .6s ease-in-out-cubic
.right a:hover
    color $red
    .arrow
      .black
        transform translateX(30%)
        transition transform .6s ease-in-out-cubic
      .red
        opacity 1
        transform translateX(30%)
        transition transform .6s ease-in-out-cubic, opacity .6s ease-in-out-cubic


</style>
