<template>
  <header>
    <nuxt-link :to="{name: 'works'}" class="strong back">Back To All Projects</nuxt-link>
    <h1 v-html="work.title"></h1>
    <div class="text">
      <div>
        <button aria-label="scroll" @click="scrollTo"><v-svg-arrow class="arrow"/></button>
      </div>
      <div class="details">
        <span class="letter">{{letter}}.</span>
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
    scrollTo() {
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
  fill $black
  transform translateY(-20px) rotate(90deg)
</style>
