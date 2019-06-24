<template>
  <article>
    <div class="top">
      <div class="title" :class="{'mobile-anime': isPhone}">
        <span>B.</span>
        <h2 ref="title">Think</h2>
        <span ref="number">02</span>
      </div>
      <no-ssr>
        <div class="idea"  v-if="!isDevice">
          <div>
            <v-svg-idea class="svg-idea circle-bottom" aria-hidden="true"/>
            <v-svg-idea class="svg-idea circle-top" aria-hidden="true"/>
            <v-svg-arrow class="svg-arrow" aria-hidden="true"/>
          </div>
          <v-svg-arrow class="arrow" aria-hidden="true"/>
        </div>
      </no-ssr>
      <div class="process" ref="process">
        <strong :class="{'mobile-anime': isPhone}">It's all <br>about</strong>
        <div class="text">
          <h4 :class="{'mobile-anime': isPhone}">thinking <br>process<v-svg-star class="svg-star star" aria-hidden="true"/></h4>
          <p ref="text1" :class="{'mobile-anime': isPhone}">My ultimate goal with every project is to come up with a solution-based design approach to help my clients solve real cases and achieve business needs.</p>
          <p ref="text2" :class="{'mobile-anime': isPhone}">For this to happen, many ideas and hypotheses need to be generated and iterated upon. Creative thinking inspires ideas while ideas empower change.</p>
        </div>
      </div>
    </div>
    <no-ssr>
      <div class="bottom" ref="bottom" v-if="!isPhone">
        <div class="content">
          <span>Z.<sup>is</sup></span>
          <h5>thinking<br>how to implement<br><span class="italic red">this idea</span></h5>
        </div>
      </div>
    </no-ssr>
    <div class="bottom mobile-anime" v-show="isPhone">
      <v-svg-arrow class="svg-arrow" aria-hidden="true"/>
      <h5>how to implement<br><span class="red">this idea</span></h5>
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
    ...mapGetters(['isPhone', 'isDevice'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      if(this.isPhone) return
      this.animHeight = this.h * .5
      this.offset = offset(this.$el).top - this.h * .8
      this.bottomOffset = offset(this.$refs.bottom).top - this.h * .8
    },
    tick(scrollTop, ease) {
      if(this.isPhone) return
      if(!this.isDevice) {
        if(scrollTop > this.offset  && scrollTop < this.offset + this.h * 1.5){
          transform(this.circleBottom, {rotate:(ease % this.h) / this.h * 360})
          transform(this.circleTop, {rotate:(scrollTop % this.h) / this.h * 360})
        }
      }

      if(ease > this.offset && ease < this.offset + this.animHeight){
        const coef = (ease - this.offset) / this.animHeight
        this.$el.style.opacity = coef
        if(!this.isDevice)this.arrow.style.opacity = coef
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
    if(!this.isDevice) {
      this.$nextTick(()=>{
        this.circleBottom = this.$el.querySelector('.circle-bottom')
        this.circleTop = this.$el.querySelector('.circle-top')
        this.arrow = this.$el.querySelector('.svg-arrow')
      })
    }
    if(!this.isPhone) {
      this.$el.style.opacity = 0
      this.$nextTick(()=>{
        this.$refs.bottom.style.opacity = 0
      })
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
    +below('l')
      >div
        width 55%
      .title
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
    +below('l')
      margin-left 46%
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
.idea
  +below('l')
    display block
  >div
    position relative
.process
  display flex
  align-items flex-start
  strong
    color $red
    padding-top 1vw
    padding-right 1vw
    font-size 20px
    white-space nowrap
    font-weight normal
    text-transform uppercase
    +below('l')
      font-size 14px
  p
    font-size 14px
    width 85%
article
  +below('s')
    padding-top 10vh
    .top
      display block
      >div
        width 100%
      .title
        width 100%
    .process
      display block
      width 100%
      text-align center
      strong
        padding 0
        padding-top 5vh
        width 100%
        font-size 13px
        br
          display none
      h4
        padding-top 5vh
        font-size 12.5vw
        display block
        .star
            display block
            width 20px
            height 20px
            margin 5vh auto
      p
        margin 3vh auto
        width 90%
    .bottom
      padding 0 6vw
      .svg-arrow
        display block
        width 20vh
        height 20vh
        position relative
        transform rotate(90deg)
        margin 5vh auto
        opacity 0.5
        top auto
        left auto

      h5
        font-size 12.5vw
        text-align center
</style>
