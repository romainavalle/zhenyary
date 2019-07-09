<template>
  <article>
    <img :data-src="`${path}${content.url}`" :alt="content.alt || title" ref="img">
  </article>
</template>

<script>
import anime from 'animejs'
import offset from '~/assets/js/utils/offset'
export default {
  data() {
    return {
      isAnimatedIn: false
    }
  },
  props: ['content', 'path', 'title'],
  methods: {
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease){
      if(ease > this.offset + this.h * .1) {
        if(!this.isAnimatedIn) this.animateIn()
      }
      if(ease < this.offset) {
        if(this.isAnimatedIn) this.reset()
      }
    },
    animateIn() {
      this.isAnimatedIn = true
      anime({targets: this.$refs.img, scaleX: 1, scaleY:1, scaleZ:1, duration: 2500, easing: 'easeOutQuad'})
    },
    reset(){
      this.isAnimatedIn = false
      anime.set(this.$refs.img, {scaleX: 1.5, scaleY:1.5, scaleZ:1})
    }
  },
  mounted() {
    this.reset()
  }
}
</script>

<style lang="stylus" scoped>
article
  position relative
  overflow hidden
</style>
