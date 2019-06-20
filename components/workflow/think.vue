<template>
  <article>
    <div class="top">
      <div class="title">
        <span>B.</span>
        <h2 ref="title">Think</h2>
        <span ref="number">02</span>
      </div>
      <div class="idea">
        <div>
          <v-svg-idea class="svg-idea circle-bottom" aria-hidden="true"/>
          <v-svg-idea class="svg-idea circle-top" aria-hidden="true"/>
          <v-svg-arrow class="svg-arrow" aria-hidden="true"/>
        </div>
        <v-svg-arrow class="arrow" aria-hidden="true"/>
      </div>
      <div class="process" ref="process">
        <strong class="strong">It's all<br>about</strong>
        <div class="text">
          <h4>thinking<br>process<v-svg-star class="svg-star star"/></h4>
          <p ref="text1">My ultimate goal with every project is to come up with a solution-based design approach to help my clients solve real cases and achieve business needs.</p>
          <p ref="text2">For this to happen, many ideas and hypotheses need to be generated and iterated upon. Creative thinking inspires ideas while ideas empower change.</p>
        </div>
      </div>
    </div>
    <div class="bottom" ref="bottom">
      <div class="content">
        <span>Z.<sup>is</sup></span>
        <h5>thinking<br>how to implement<br><span class="italic red">this idea</span></h5>
      </div>
    </div>
  </article>
</template>

<script>
import vSvgIdea from "~/assets/svgs/idea.svg?inline";
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
import vSvgStar from "~/assets/svgs/star.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  components:{
    vSvgIdea,vSvgArrow, vSvgStar
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
      this.offset = offset(this.$el).top - this.h * .8
      this.bottomOffset = offset(this.$refs.bottom).top - this.h * .8
    },
    tick(scrollTop, ease) {

      if(scrollTop > this.offset  && scrollTop < this.offset + this.h * 1.5){
        transform(this.circleBottom, {rotate:(ease % this.h) / this.h * 360})
        transform(this.circleTop, {rotate:(scrollTop % this.h) / this.h * 360})
      }

      if(ease > this.offset && ease < this.offset + this.animHeight){
        const coef = (ease - this.offset) / this.animHeight
        this.$el.style.opacity = coef
        this.arrow.style.opacity = coef
        transform(this.$el, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.title, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.process, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.number, {translate3d:[0, 400 - coef * 400, 0]})
        transform(this.$refs.text1, {translate3d:[0, 300 - coef * 300, 0]})
        transform(this.$refs.text2, {translate3d:[0, 400 - coef * 400, 0]})
      }

      if(ease > this.bottomOffset && ease < this.bottomOffset + this.animHeight){
        const coefBottom = (ease - this.bottomOffset) / this.animHeight
        this.$refs.bottom.style.opacity = coefBottom
        transform(this.$refs.bottom, {translate3d:[0, 200 - coefBottom * 200, 0]})
      }
    }
  },
  mounted() {
    this.circleBottom = this.$el.querySelector('.circle-bottom')
    this.circleTop = this.$el.querySelector('.circle-top')
    this.arrow = this.$el.querySelector('.svg-arrow')
    if(!this.isPhone) {
      this.$el.style.opacity = 0
      this.$refs.bottom.style.opacity = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
article
  .top
    display flex
    padding 0 8vw 4vw
    justify-content space-between
    >div
      width 30%
.bottom
  width 100%
  padding 0 8vw 0
  .content
    display flex
    margin-left 45%
    width 40%
    >span
      display flex
      justify-content flex-end
      color $red
      font-size 2.2vw
      line-height 1
      padding-top 1vw
      padding-right 1vw
      sup
        font-size 12px
svg
  display block
.svg-idea
  width 100%
  height 100%
  display block
  position relative
  &.circle-bottom
    position absolute
    opacity 0.3

h4
  font-size 3.4vw
  font-family $schnyder
  font-weight $demi
  line-height 1
  display flex
  align-items flex-end
  margin-bottom 2vw

h5
  font-size 3.2vw
  font-family $schnyder
  font-weight $demi
  display block
  line-height 1
  margin-bottom 2vw
.svg-star
  margin-left .8vw
  margin-bottom 0.5vw
  width 1.5vw
  height 1.5vw
  fill $red
.arrow
  display block
  width 4.6vw
  height 2.1vw
  margin-left 45%
  transform-origin 0 50%
  transform rotate(90deg) translateY(-50%)
  opacity 0.5
.svg-arrow
  height 55vw
  width 8.2vw
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%) rotate(90deg)
.idea>div
  position relative
.process
  display flex
  align-items flex-start
  .strong
    color $red
    padding-top 1.5vw
    padding-right 1vw
  p
    font-size 14px
    width 78%
</style>
