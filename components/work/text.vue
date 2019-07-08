<template>
  <article class="text">
    <div class="text-content">
      <div class="header">
        <header v-html="content.header" class="demi" :class="{'mobile-anime': isPhone}"></header>
      </div>
      <div class="paragraphs">
        <div>
          <p v-for="(paragraph, index) in content.paragraphs" :key="`paragraph-${index}`" v-html="paragraph" :class="{'mobile-anime': isPhone}"></p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import splitLines from '~/assets/js/utils/splitLines'

import { easeInOutQuad, easeInOutCubic } from '~/assets/js/utils/easings'
import { mapGetters } from 'vuex';
export default {
  props: ['content', 'path', 'title'],
  computed: {
    ...mapGetters(['isPhone'])
  },
  methods:{
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
    if(!this.isPhone)this.offset = offset(this.$el).top -this.h
    },
    tick(scrollTop, ease){
      if(this.isPhone) {

      }else{
        if(ease > this.offset && ease <this.offset + this.h) {
          const coefCubic = easeInOutCubic(Math.min(1, (ease - this.offset) / this.h * 2))
          const coefQuad = easeInOutQuad(Math.min(1, (ease - this.offset) / this.h * 2))
          this.$el.style.opacity = coefCubic
          transform(this.$el, {translate3d: [0,200 - 200 * coefCubic, 0 ]})
          this.headerLines.forEach((line, i) => {
            const start = 50 + i * 50
            transform(line, {translate3d: [0, start -  start * coefQuad, 0]})
          });
          this.pLines.forEach((line, i) => {
            const start = 50 + i * 50
            transform(line, {translate3d: [0, start -  start * coefQuad, 0]})
          });
        }
      }
    },
  },
  mounted() {
      if(this.isPhone) {

      }else{
        transform(this.$el, {translate3d: [0,200, 0 ]})
        this.$el.style.opacity = 0
        this.$nextTick(()=>{
          const header = this.$el.querySelector('header')
          const paragraphs = this.$el.querySelector('.paragraphs')
          const ps = [].slice.call(this.$el.querySelectorAll('p'))
          splitLines(header)

          ps.forEach((p)=>{
            splitLines(p)
          })
          this.headerLines = [].slice.call(header.querySelectorAll('.line'))
          this.pLines = [].slice.call(paragraphs.querySelectorAll('.line'))
          this.headerLines.forEach((line, i) => {
            const start = 50 + i * 50
            transform(line, {translate3d: [0, start, 0]})
          });
          this.pLines.forEach((line, i) => {
            const start = 50 + i * 50
            transform(line, {translate3d: [0, start, 0]})
          });
        })
      }
  },
}
</script>

<style lang="stylus" scoped>
article.text
  display flex
  align-items center
  min-height 30vh
  padding-top 7vw
  padding-bottom 7vw
  height auto
  overflow hidden
.text-content
  width 80%
  margin 0 auto
  display flex
.header, .paragraphs
  width 50%
  display flex
.header
  justify-content flex-end
.paragraphs
  justify-content center
header
  width 30%
  font-size 20px
.paragraphs>div
  width 45%

article.text
  +below('l')
    padding 10vh 7vw
    overflow auto
    .text-content
      width 100%
      justify-content space-between
    .header, .paragraphs
      display block
    .header
      width 35%
    .paragraphs
      width 50%
    header, .paragraphs>div
      width 100%
  +below('s')
    padding 10vh 5vw
    display block
    .text-content
      display block
    .header, .paragraphs
      width 100%
      display block
    header, p
      width 100%
    header
      padding-bottom 5vh

</style>
