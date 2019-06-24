<template>
  <header>
    <nuxt-link :to="{name: 'works'}" class="strong back" ref="link">Back To All Projects</nuxt-link>
    <h1 v-html="work.title" ref="title"></h1>
    <div class="text">
      <div>
        <button aria-label="scroll" @click="scrollTo" ref="arrow"><v-svg-arrow class="arrow"/></button>
      </div>
      <div class="details">
        <span class="letter" ref="letter">{{letter}}<span class="dot" ref="dot">.</span></span>
        <div class="details-text">
          <div>
            <h2 class="demi" v-text="work.subtitle"></h2>
            <ul>
              <li v-for="(skill, index) in work.skills" :key="`skill-${index}`" v-text="index === 0 ? skill : ` / ${skill}`" class="strong"></li>
            </ul>
          </div>
          <div>
            <a :href="work.link.url" rel="noopener" target="_blank" class="link demi" v-text="work.link.label"></a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
export default {
  props: { 'work': Object },
  components: {
    vSvgArrow
  },
  computed: {
    letter() {
      return this.work.title.charAt(0)
    }
  },
  methods: {
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }

    },
    tick(scrollTop, ease){
      if(ease < this.h) {
        transform(this.$refs.arrow, {translate3d:[0, Math.min(ease,this.h /2), 0]})
        transform(this.$refs.link.$el, {translate3d:[0, scrollTop, 0]})
        transform(this.$refs.title, {translate3d:[0, ease / 3, 0]})
        transform(this.$refs.letter, {translate3d:[0, -scrollTop / this.h * this.w * .1, 0]})
        transform(this.$refs.dot, {translate3d:[0, -scrollTop / this.h * this.w * .1, 0]})
        this.$refs.dot.style.opacity = (this.h - ease * 2) / this.h
        this.$refs.title.style.opacity = (this.h - ease * 2) / this.h
        this.$refs.link.$el.style.opacity = (this.h - ease * 2) / this.h
      }
    },
    scrollTo(scrollTop) {
      ScrollHelper.scrollTo(this.h * .7)
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
header
  height 100vh
  width 100%
  position relative
h1
  font-size 8.8vw
  text-align center
  line-height 1
  font-family $schnyder
  font-weight $demi
  padding-top 30vh
h2
  margin-bottom 1em
.back
  display block
  top 32vh
  left 6vw
  position absolute
.link
  font-size 20px
  position relative
  &:after
    content ''
    width 100%
    height 2px
    background $black
    bottom 0
    left 0
    position absolute
    display block
.letter
  font-size 10.5vw
  line-height .68
  width 15vw
  display block
  font-weight $light
.dot
  display inline-block
.text
  display flex
  width 100%
  padding 0 6vw
  justify-content space-between
  position absolute
  bottom 5vh
  > div
    width 50%
.details
  width 50%
  display flex
li
  display inline
.details-text
  display flex
  flex-direction column
  justify-content space-between
  align-content flex-start

.arrow
  width 158px
  height 106px
  stroke $black
  fill $black
  transform translateY(-20px) rotate(90deg)
</style>
