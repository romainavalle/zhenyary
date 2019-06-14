<template>
  <footer>
    <nuxt-link :to="{name: 'works'}" class="strong back">Back To All Projects</nuxt-link>
    <div class="next">
      <span class="strong">next</span>
      <span class="letter">{{letter}}.</span>
    </div>
    <div class="right">
      <div>
        <h3 v-html="nextWork.title"></h3>
        <ul>
          <li v-for="(skill, index) in nextWork.skills" :key="`skill-${index}`" v-text="index === 0 ? skill : ` / ${skill}`" class="strong"></li>
        </ul>
        <nuxt-link :to="{name: 'works-slug', params: {slug: nextWork.slug}}" :aria-label="nextWork.title"><v-svg-arrow class="arrow"/></nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
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
  mounted() {
  },

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
  padding-top 5vh
  font-size 10.5vw
  line-height .68
  display block
  padding-left 50px
  font-weight $light
.next
  text-align center
li
  display inline
h3
  font-size 36px
  margin-bottom 10px
.right>div
  padding 0 20%
.arrow
  width 158px
  height 106px
  fill $black
  margin-top 40px
</style>
