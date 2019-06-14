<template>
  <article class="content" :style="{background}" :class="shadowClass">
    <div class="img" :style="{width}">
      <no-ssr>
        <img src="~/assets/imgs/shadow.png" v-if="this.content.shadow" class="shadow"/>
      </no-ssr>
      <img :src="`${path}${content.url}`" :alt="alt" class="main">
    </div>
  </article>
</template>

<script>
import vSvgShadow from "~/assets/svgs/shadow.svg?inline";
export default {
  props: ['content', 'path', 'title'],
  components:{
    vSvgShadow
  },
  computed: {
    width() {
      return this.content.width ? `${this.content.width}%`: '100%'
    },
    shadowClass() {
      return this.content.shadow ? 'shadow' : ''
    },
    background() {
      return this.content.background ? this.content.background : 'none'
    },

    alt() {
      return this.content.alt ? this.content.alt : this.title
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  padding-top 7vw
  padding-bottom 7vw
  &.shadow
    padding-top 10vw
    padding-bottom 10vw
.img
  margin 0 auto
  position relative
  .main
    position relative
  img.shadow
    position absolute
    bottom -7vw
    width 80%
    left 10%
</style>
