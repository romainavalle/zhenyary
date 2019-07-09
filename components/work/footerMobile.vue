<template>
  <footer>
    <div>
      <nuxt-link :to="{name: 'work'}" class="strong back mobile-anime">Back To All Projects</nuxt-link>
      <span class="letter mobile-anime" ref="letter">{{letter}}<span class="dot" ref="dot">.</span></span>
    </div>
    <div>
      <nuxt-link :to="{name: 'work-slug', params: {slug: nextWork.slug}}" :aria-label="nextWork.title" class="next mobile-anime">
        <span class="strong">next</span>
        <div class="arrow" ref="arrow">
          <v-svg-arrow />
        </div>
      </nuxt-link>
      <nuxt-link :to="{name: 'work-slug', params: {slug: nextWork.slug}}" :aria-label="nextWork.title" class="nextLink">
        <h3 v-html="nextWork.title" class="mobile-anime"></h3>
        <ul class="mobile-anime">
          <li v-for="(skill, index) in nextWork.skills" :key="`skill-${index}`" v-text="index === 0 ? skill : ` / ${skill}`" class="strong"></li>
        </ul>
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


    },
    tick(scrollTop, ease){

    }
  },
  mounted() {

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
  padding-top 10vh
  font-size 30vw
  line-height .68
  display block
  font-weight $light
.back
  display block
  padding-top 12px
.dot
  display inline-block
.next
  display flex
  justify-content space-between
  align-items center
.arrow
  width 60px
  height 40px
  svg
    display block
    width 100%
    height 100%
    fill $black
li
  display inline
h3
  font-size 36px
  margin-bottom 10px
.nextLink
  display block
  padding-top 12vw
</style>
