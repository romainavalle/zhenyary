<template>
  <article class="content"  :style="{'background': background }" :class="shadowClass">
    <div class="img" :style="{width}">
      <no-ssr>
        <img src="~/assets/imgs/shadow.png" v-if="this.content.shadow" class="shadow"/>
      </no-ssr>
      <div class="img-container" ref="container">
        <img :src="`${path}${content.url}`" :alt="alt" class="main" ref="img">
      </div>
    </div>
  </article>
</template>

<script>
import vSvgShadow from "~/assets/svgs/shadow.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
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
  },
  methods: {
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease){
      if(ease > this.offset && ease <this.offset + this.h) {
        const coef = (ease - this.offset) / this.h
        transform(this.$refs.img, {scale3d: [1.5 - coef * .5, 1.8 - coef * .8, 1]})
        transform(this.$refs.container, {scale3d: [.7 + coef * .3, .7 + coef * .3, 1]})
      }
    }
  },
  mounted() {
        transform(this.$refs.img, {scale3d: [1.5, 1.8, 1]})
        transform(this.$refs.container, {scale3d: [.7, .7, 1]})
  }
}
</script>


<style lang="stylus" scoped>
article
  position relative
.content
  padding-top 7vw
  padding-bottom 7vw
  &.shadow
    padding-top 10vw
    padding-bottom 10vw
.img-container
  overflow hidden
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
