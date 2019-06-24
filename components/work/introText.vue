<template>
  <article class="intro">
    <div class="spacer"></div>
    <div class="text">
      <p v-for="(text, index) in work.header" :key="`header-${index}`" v-html="text"></p>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import splitLines from '~/assets/js/utils/splitLines'
export default {
  props: ['work'],
  methods:{
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
    this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease){
      if(ease > this.offset && ease <this.offset + this.h * .4) {
        const coef = Math.min(1, (ease - this.offset) / (this.h * .4))
        this.$el.style.opacity = coef
        this.lines.forEach((line, i) => {
          const start = 50 + i * 50
          transform(line, {translate3d: [0, start -  start * coef, 0]})
        });
      }
    },
  },
  mounted() {
    this.$el.style.opacity = 0
    this.$nextTick(()=>{
      const paragraphs = [].slice.call(this.$el.querySelectorAll('p'))
      paragraphs.forEach(paragraph => {
        splitLines(paragraph)
      });
      this.lines = [].slice.call(this.$el.querySelectorAll('.line'))

      this.lines.forEach((line, i) => {
        const start = 50 + i * 50
        transform(line, {translate3d: [0, start, 0]})
      });
    })
  },
}
</script>
<style lang="stylus" scoped>
.intro
  width 100%
  padding 0 6vw 6vw
  position relative
  display flex
  align-items flex-start
  justify-content flex-start
.spacer
  width 50%
.text
  width 50%
  padding-left 15vw
p
  width 70%
</style>
