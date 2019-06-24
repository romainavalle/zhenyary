<template>
  <article>
    <img :src="`${path}${content.url}`" :alt="content.alt || title" ref="img">
  </article>
</template>

<script>
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
        const coef = (ease - this.offset) / this.h
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
