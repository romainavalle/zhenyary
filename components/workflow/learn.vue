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
        <v-svg-arrow class="arrow"/>
      </div>
    </div>
    <div class="problem">
      <strong>Problem</strong>
      <p>User Needs<br>Product Objectives</p>
    </div>
  </article>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
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
  components: {
    vSvgArrow
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
      }
    }
  },
  mounted() {
    if(!this.isPhone)this.$el.style.opacity = 0
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
li
  margin-top 10px

strong
  font-size 4.1vw
  font-weight normal
  display block
p
  line-height 1
  font-size 1.5vw
  margin 0
.arrow
  display block
  width 4.6vw
  height 2.1vw
  transform-origin 0 50%
  transform rotate(90deg) translateY(-50%)
  opacity 0.5
</style>
