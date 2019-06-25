<template>
  <article class="content">
    <div class="text-content">
      <div class="header">
        <header v-html="content.header" class="demi"></header>
      </div>
      <div class="paragraphs">
        <p v-for="(paragraph, index) in content.paragraphs" :key="`paragraph-${index}`" v-html="paragraph"></p>
      </div>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import splitLines from '~/assets/js/utils/splitLines'

import { easeInOutQuad, easeInOutCubic } from '~/assets/js/utils/easings'
export default {
  props: ['content', 'path', 'title'],
  methods:{
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
    this.offset = offset(this.$el).top -this.h
    },
    tick(scrollTop, ease){
      if(ease > this.offset && ease <this.offset + this.h) {
        const coefCubic = easeInOutCubic(Math.min(1, (ease - this.offset) / this.h * 2))
        const coefQuad = easeInOutQuad(Math.min(1, (ease - this.offset) / this.h * 2))
        this.$el.style.opacity = coefCubic
        transform(this.$el, {translate3d: [0,-200 + 200 * coefCubic, 0 ]})
        this.headerLines.forEach((line, i) => {
          const start = 50 + i * 50
          transform(line, {translate3d: [0, start -  start * coefQuad, 0]})
        });
        this.pLines.forEach((line, i) => {
          const start = 50 + i * 50
          transform(line, {translate3d: [0, start -  start * coefQuad, 0]})
        });
      }
    },
  },
  mounted() {
    transform(this.$el, {translate3d: [0,-200, 0 ]})
    this.$el.style.opacity = 0
    this.$nextTick(()=>{
      const header = this.$el.querySelector('header')
      const p = this.$el.querySelector('p')
      splitLines(header)
      splitLines(p)
      this.headerLines = [].slice.call(header.querySelectorAll('.line'))
      this.pLines = [].slice.call(p.querySelectorAll('.line'))
      this.headerLines.forEach((line, i) => {
        const start = 50 + i * 50
        transform(line, {translate3d: [0, start, 0]})
      });
      this.pLines.forEach((line, i) => {
        const start = 50 + i * 50
        transform(line, {translate3d: [0, start, 0]})
      });
    })
  },
}
</script>

<style lang="stylus" scoped>
article.content
  display flex
  align-items center
  min-height 30vh
  padding-top 7vw
  padding-bottom 7vw
  height auto
.text-content
  width 80%
  margin 0 auto
  display flex
.header, .paragraphs
  width 50%
  display flex
  justify-content flex-end
header
  width 30%
  font-size 20px
p
  width 45%

</style>
