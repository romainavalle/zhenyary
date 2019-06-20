<template>
  <article>
    <div class="top">
      <div class="title">
        <span>B.</span>
        <h2>Think</h2>
        <span>02</span>
      </div>
      <div class="idea">
        <div>
          <v-svg-idea class="svg-idea"/>
          <v-svg-arrow class="svg-arrow"/>
        </div>
        <v-svg-arrow class="arrow"/>
      </div>
      <div class="process">
        <strong class="strong">It's all<br>about</strong>
        <div class="text">
          <h4>thinking<br>process<v-svg-star class="svg-star star"/></h4>
          <p>My ultimate goal with every project is to come up with a solution-based design approach to help my clients solve real cases and achieve business needs.</p>
          <p>For this to happen, many ideas and hypotheses need to be generated and iterated upon. Creative thinking inspires ideas while ideas empower change.</p>
        </div>
      </div>
    </div>
    <div class="bottom">
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
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop, ease) {
    }
  },
  mounted() {
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
