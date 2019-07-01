<template>
  <article>
    <picture>
      <source :srcset="`
        ${getSrcSet(content.url, '@mx', 'webp')} 500w,
        ${getSrcSet(content.url, '@.5x', 'webp')} 1000w,
        ${getSrcSet(content.url, '@1x', 'webp')} 1440w,
        ${getSrcSet(content.url, '', 'webp')} 2000w`
      " type="image/webp">
      <source :srcset="`
        ${getSrcSet(content.url, '@mx', 'jpg')} 500w,
        ${getSrcSet(content.url, '@.5x', 'jpg')} 1000w,
        ${getSrcSet(content.url, '@1x', 'jpg')} 1440w,
        ${getSrcSet(content.url, '', 'jpg')} 2000w`
      " type="image/jpg">
      <img :src="`${path}${content.url}`" :alt="content.alt || title" ref="img">
    </picture>
  </article>
</template>

<script>
import { easeInOutQuad } from '~/assets/js/utils/easings'
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
export default {
  props: ['content', 'path', 'title'],
  methods: {
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top -this.h
    },
    tick(scrollTop, ease){
      if(ease > this.offset && ease <this.offset + this.h) {
        const coef = easeInOutQuad((ease - this.offset) / this.h)
        transform(this.$refs.img, {scale3d: [1.5 - coef * .5,1.5 - coef * .5,1 ]})
      }
    },
  },
  mounted() {
    transform(this.$refs.img, {scale3d: [1.5, 1.5, 1 ]})
  }
}
</script>

<style lang="stylus" scoped>
article
  position relative
  overflow hidden
</style>
