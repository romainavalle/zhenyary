<template>
  <article :style="{'background': background }">
    <div class="img" v-for="(image, index) in content.images" :key="`image-${index}`">
      <picture>
        <source :srcset="`
          ${getSrcSet(content.images[index].url, '@mx', 'webp')} 500w,
          ${getSrcSet(content.images[index].url, '@.5x', 'webp')} 1000w,
          ${getSrcSet(content.images[index].url, '@1x', 'webp')} 1440w,
          ${getSrcSet(content.images[index].url, '', 'webp')} 2000w`
        " type="image/webp">
        <source :srcset="`
          ${getSrcSet(content.images[index].url, '@mx', 'jpg')} 500w,
          ${getSrcSet(content.images[index].url, '@.5x', 'jpg')} 1000w,
          ${getSrcSet(content.images[index].url, '@1x', 'jpg')} 1440w,
          ${getSrcSet(content.images[index].url, '', 'jpg')} 2000w`
        " type="image/jpg">
        <img :src="`${path}${content.images[index].url}`" :alt="alt(index) || title" ref="imgs">
      </picture>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'

import { easeInOutCubic } from '~/assets/js/utils/easings'
export default {
  props: ['content', 'path', 'title'],
  computed:{
    background() {
      return this.content.background ? this.content.background : 'none'
    }
  },
  methods: {

    alt(id) {
      return this.content.images[id].alt ? this.content.images[id].alt : this.title
    },
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
        transform(this.$refs.imgs[0], {scale3d: [1.3 - coef * .3, 1.3 - coef * .3, 1]})
        transform(this.$refs.imgs[1], {scale3d: [1.3 - coef * .3, 1.3 - coef * .3, 1]})
      }
    }
  },
  mounted() {
    this.$refs.imgs[0].style.transformOrigin = "0% 50%"
    this.$refs.imgs[1].style.transformOrigin = "100% 50%"
    transform(this.$refs.imgs[0], {scale3d: [1.3, 1.3]})
    transform(this.$refs.imgs[1], {scale3d: [1.3, 1.3]})
  }
}
</script>


<style lang="stylus" scoped>
article
  display flex
  overflow hidden
.img
  transform translateZ(0)
  width 50%
  overflow hidden
  display flex
  justify-content center
  align-items center
  img
    display block
    height 100%
    object-fit cover
    object-position 50% 50%
    width 100%
</style>
