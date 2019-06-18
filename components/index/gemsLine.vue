<template>
  <div class="line">
    <div class="section" v-for="(item, index) in 3" :key="`section-${index}`">
      <div class="screen">
        <span>Art direction</span>
        <v-svg class="star"/>
        <span class="italic">Product Design</span>
      </div>
      <div class="screen">
        <span class="underline italic">Visual design</span>
        <span>Mobile & web design</span>
      </div>
      <div class="screen">
        <span>Interaction design</span>
        <div class="and">&</div>
        <span>Animation</span>
      </div>
    </div>
  </div>
</template>

<script>
import transform from 'dom-transform'
import vSvg from "~/assets/svgs/star.svg?inline";
export default {
  data() {
    return {
      w:0,
      h:0
    }
  },
  components: {vSvg},
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(x) {
      transform(this.$el, {translate3d:[-this.w * 3 + x, 0, 0]})
    }
  }
}
</script>

<style lang="stylus" scoped>
.line
  display flex
  will-change transform
  line-height 1.11
  padding 1vh 0
  svg
    fill $red
    width 2vw
    height 2vw
    display block
  .underline
    border-bottom .2vw solid $red
  .section
    display flex
  .screen
    align-items center
    display flex
    justify-content space-between
    padding 0 6vw
    width 100vw
  .and
    width 10vw
    font-size 20px
    text-align center
    line-height 1.6
    border-bottom .2vw solid $black
</style>
