<template>
  <article>
    <img :data-src="`${path}${content.url}`" :alt="content.alt || title" ref="img">
    <no-ssr>
      <div class="top-container" v-if="content.top" :style="{width: this.content.top.width}">
        <div class="top" ref="outer">
          <video v-if="content.top.type === 'video'" :src="`${path}${content.top.url}`" autoplay playsinline loop muted type='video/mp4' preload="auto"  ref="inner"/>
          <img   v-if="content.top.type === 'img'" :data-src="`${path}${content.top.url}`"  ref="inner">
        </div>
      </div>
    </no-ssr>
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
  computed: {
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
      if(this.content.top) {
        anime({targets: this.$refs.outer, translateY: '0%', duration: 1000, delay: 500, easing: 'easeOutQuad'})
        anime({targets: this.$refs.inner, translateY: '0%', duration: 1000, delay: 500, easing: 'easeOutQuad'})
      }
    },
    reset(){
      this.isAnimatedIn = false
      anime.set(this.$refs.img, {scaleX: 1.5, scaleY:1.5, scaleZ:1})
      if(this.content.top) {
        anime.set(this.$refs.outer, {translateY:'-50%'})
        anime.set(this.$refs.inner, {translateY: '101%'})
      }
    }
  },
  mounted() {
    this.$nextTick(this.reset.bind(this))
  }
}
</script>

<style lang="stylus" scoped>
article
  position relative
  overflow hidden
  .top-container
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 1
    .top
      overflow hidden
      position relative
</style>
