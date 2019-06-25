<template>
  <article :style="{'background': background }">
    <div class="img">
      <img :src="`${path}${content.url}`" :alt="alt" ref="img">
    </div>
    <div class="text-content" ref="textContent">
      <header v-html="content.header" class="demi" ref="header"></header>
      <p v-for="(paragraph, index) in content.paragraphs" :key="`paragraph-${index}`" v-html="paragraph" ref="paragraphs"></p>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import splitLines from '~/assets/js/utils/splitLines'
import { easeInOutCubic, easeInOutQuad } from '~/assets/js/utils/easings'
export default {
  props: ['content', 'path', 'title'],
  computed:{
    width() {
      return this.content.width ? `${this.content.width}%`: '100%'
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
        const coefQuad = easeInOutQuad((ease - this.offset) / this.h)
        transform(this.$refs.img, {scale3d: [2.1 - coef * 1.1, 2.1 - coef * 1.1, 1]})
        this.lines.forEach((line, i) => {
          const start = 50 + i * 50
          line.style.opacity = coefQuad
          transform(line, {translate3d: [start - coefQuad * start, 0, 0]})
        });
      }
    }
  },
  mounted() {
    transform(this.$refs.img, {scale3d: [2.1, 2.1, 1 ]})

    this.$nextTick(()=>{
      splitLines(this.$el.querySelector('header'))
      splitLines(this.$el.querySelector('p'))
      this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
       this.lines.forEach((line, i) => {
         const start = 50 + i * 50
          line.style.opacity = 0
          transform(line, {translate3d: [start , 0, 0]})
        });
    })
  }
}
</script>


<style lang="stylus" scoped>
article
  display flex
  overflow hidden
  img
    transform-origin 0% 50%
.img, .text-content
  width 50%
.text-content
  display flex
  justify-content center
  align-items center
  flex-direction column
.img
  z-index 1
header, p
  width 50%
header
  font-size 20px
  padding-bottom 50px
  padding-right 25%

</style>
