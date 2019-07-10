<template>
  <article>
    <div class="img" v-for="(image, index) in content.images" :key="`image-${index}`" :style="{'background': background(content.images[index]) }">
      <img  v-if="content.images[index].url.indexOf('.mp4') === - 1" :data-src="`${path}${content.images[index].url}`" :alt="content.alt || title" ref="imgs" :style="{width: width(content.images[index])}">
      <video v-else :src="`${path}${content.images[index].url}`" autoplay playsinline loop muted type='video/mp4' preload="auto"  ref="imgs" :style="{width: width(content.images[index])}"/>
    </div>
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
  computed:{
    },
  methods: {

    width(content) {
      return this.isPhone ? '80%' : content.width ? content.width+"%" : 'none'
    },
    background(content) {
      return content.background ? content.background : 'none'
    },
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
      if(ease > this.offset + this.h * .1) {
        if(!this.isAnimatedIn) this.animateIn()
      }
      if(ease < this.offset) {
        if(this.isAnimatedIn) this.reset()
      }
    },
    animateIn() {
      this.isAnimatedIn = true
      anime({targets: this.$refs.imgs[0], scaleX: 1, scaleY:1, scaleZ:1, duration: 1500, easing: 'easeOutQuad'})
      anime({targets: this.$refs.imgs[1], scaleX: 1, scaleY:1, scaleZ:1, duration: 1500, easing: 'easeOutQuad'})
    },
    reset(){
      this.isAnimatedIn = false
      anime.set(this.$refs.imgs[0], {scaleX: 1.3, scaleY:1.3, scaleZ:1})
      anime.set(this.$refs.imgs[1], {scaleX: 1.3, scaleY:1.3, scaleZ:1})
    }
  },
  mounted() {
    this.$refs.imgs[0].style.transformOrigin = "0% 50%"
    this.$refs.imgs[1].style.transformOrigin = "100% 50%"
    this.reset()
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
