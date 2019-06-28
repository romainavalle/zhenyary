<template>
  <article class="content"  :style="{'background': background }" :class="[shadowClass, {'fit': content.fitHeight}]">
    <figure :style="{width, top}">
      <div class="img">
        <no-ssr>
          <img :src="shadow" v-if="this.content.shadow" class="shadow"/>
        </no-ssr>
        <div class="img-container" ref="container">
          <img :src="`${path}${content.url}`" :alt="alt" class="main" ref="img">
        </div>
      </div>
    </figure>
  </article>
</template>

<script>
import { easeInOutCubic } from '~/assets/js/utils/easings'
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
export default {
  props: ['content', 'path', 'title'],
  data() {
    return {
    }
  },
  computed: {
    width() {
      return this.content.width ? `${this.content.width}%`: '100%'
    },
    shadow(){
      return this.content.shadow ? require(`~/assets/imgs/${this.content.shadow}.png`) : ''
    },
    top() {
      return this.content.top ? `${this.content.top}%`: '50%'
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
        const coef = easeInOutCubic((ease - this.offset) / this.h)
        transform(this.$refs.img, {scale3d: [1.5 - coef * .5, 1.5 - coef * .5, 1]})
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
  height 100vh
  width 100%
  transform translateZ(0)
  &.fit
    height auto
    padding 10vh 0
    figure
      position relative
      top auto
      left auto
      transform none 
      margin 0 auto
figure
  display block
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)

.img-container
  overflow hidden
  width 100%
.img
  margin 0 auto
  position relative
  .main
    position relative
  img.shadow
    position absolute
    bottom -90px
    width 80%
    left 10%
  img
    width 100%
article
  +below('l')
    &.content
      padding-top 10vh
      padding-bottom 10vh
      height auto
      &.shadow
        padding-top 15vh
        padding-bottom 15vh
      figure
        position relative
        top auto!important
        left auto
        transform none
        margin 0 auto
</style>
