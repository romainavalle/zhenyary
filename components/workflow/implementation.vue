<template>
  <article class="implementation">
    <div class="title">
      <span >04</span>
      <h2 ref="title">Implementation</h2>
    </div>
    <ul class="d-f" ref="skills">
      <li>UX architecture</li>
      <li>Visual concepts</li>
      <li>Interactions</li>
      <li>Development</li>
      <li>Testing</li>
      <li>🎂Project Birth</li>
    </ul>
    <div class="d-f bottom" ref="bottom">
      <div>
        <h5>Communication with the <span class="strike">client</span> partner during the whole process</h5>
      </div>
      <div class="content">
        <div class="inner">
          <ul class="arrows">
            <li><v-svg-arrow class="arrow"/></li>
            <li><v-svg-arrow class="arrow"/></li>
            <li><v-svg-arrow class="arrow"/></li>
            <li><v-svg-arrow class="arrow"/></li>
          </ul>
          <h3>Long-lasting Collaboration</h3>
          <h4>Trustful partner for you<br>and your business</h4>
          <p>I truly believe in the power of a strong business relationship and years-long collaboration. Success is not a 1-day phenomenon it takes a lot of time and joint effort. </p>
          <p>Common expertise developed over the years of trustful partnership is the core competence of the business and its driving force.</p>
        </div>
      </div>
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
  components:{
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
        transform(this.$refs.title, {scale:[1+.2*(1-coef),1+.2*(1-coef)]})
        transform(this.$refs.skills, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.bottom, {translate3d:[0, 200 - coef * 200, 0]})
      }
    }
  },
  mounted() {
    if(!this.isPhone)this.$el.style.opacity = 0
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
  ul
    padding-left 0.7vw
    li
      font-family $schnyder
      font-weight $demi
      font-size 20px
p
  width 45%
  font-size 14px
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
.arrows
  display flex
  padding 0
  padding-bottom 4vw
  li
    height 6.1vw
    width 4.1vw
    display block
  li + li
    margin-left 1.6vw
.arrow
  display block
  width 6.1vw
  height 4.1vw
  fill $white
  transform-origin 0 0
  transform rotate(90deg) translateY(-100%)
</style>
