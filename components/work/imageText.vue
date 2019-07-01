<template>
  <article :style="{'background': background }" class="img-text">
    <div class="img">
      <img :data-src="`${path}${content.url}`" :alt="content.alt || title" ref="img">
    </div>
    <div class="text-content" ref="textContent">
      <header v-html="content.header" class="demi" ref="header" :class="{'mobile-anime': isPhone}"></header>
      <p v-for="(paragraph, index) in content.paragraphs" :key="`paragraph-${index}`" v-html="paragraph" ref="paragraphs" :class="{'mobile-anime': isPhone}"></p>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import splitLines from '~/assets/js/utils/splitLines'
import { easeInOutCubic, easeInOutQuad } from '~/assets/js/utils/easings'
import { mapGetters } from 'vuex';
export default {
  props: ['content', 'path', 'title'],
  computed:{
    ...mapGetters(['isPhone', 'isDevice']),
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
      if(this.textContent)this.offsetText = offset(this.textContent).top - this.h
    },
    tick(scrollTop, ease){
      if(ease > this.offset && ease <this.offset + this.h) {
        const coef = easeInOutCubic((ease - this.offset) / this.h)
        if(this.isPhone) {
          transform(this.$refs.img, {scale3d: [1.5 - coef * .5, 1.5 - coef * .5, 1]})
        }else{
          transform(this.$refs.img, {scale3d: [2.1 - coef * 1.1, 2.1 - coef * 1.1, 1]})
        }
      }

      if(ease > this.offsetText && ease <this.offsetText + this.h) {
        const coefQuad = easeInOutQuad((ease - this.offsetText) / this.h)
        if(this.isPhone) {
        }else{
          this.textContent.style.opacity = coefQuad
          if(this.isDevice) {
            transform(this.textContent, {translate3d: [0,-200 + 200 * coefQuad, 0 ]})
            this.headerLines.forEach((line, i) => {
              const start = 50 + i * 50
              transform(line, {translate3d: [0, start -  start * coefQuad, 0]})
            });
            this.pLines.forEach((line, i) => {
              const start = 50 + i * 50
              transform(line, {translate3d: [0, start -  start * coefQuad, 0]})
            });
          }else{
            this.lines.forEach((line, i) => {
              const start = 50 + i * 50
              transform(line, {translate3d: [start - coefQuad * start, 0, 0]})
            });
          }
        }
      }
    }
  },
  mounted() {
    if(this.isPhone) {
      transform(this.$refs.img, {scale3d: [1.5,1.5, 1 ]})
    }else{
    transform(this.$refs.img, {scale3d: [2.1, 2.1, 1 ]})
      this.$nextTick(()=>{
        splitLines(this.$el.querySelector('header'))
        splitLines(this.$el.querySelector('p'))


          this.textContent = this.$el.querySelector('.text-content')
          this.textContent.style.opacity = 0
        if(this.isDevice) {
          transform(this.textContent, {translate3d: [0,-200, 0 ]})
          this.headerLines = [].slice.call(this.$el.querySelectorAll('header .line'))
          this.pLines = [].slice.call(this.$el.querySelectorAll('p .line'))
          this.headerLines.forEach((line, i) => {
            const start = 50 + i * 50
            transform(line, {translate3d: [0, start, 0]})
          });
          this.pLines.forEach((line, i) => {
            const start = 50 + i * 50
            transform(line, {translate3d: [0, start, 0]})
          });
        }else{
          this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
          this.lines.forEach((line, i) => {
            const start = 50 + i * 50
            transform(line, {translate3d: [start , 0, 0]})
          });
        }
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
article
  display flex
  overflow hidden
  width 100%
  height 100vh
  img
    transform-origin 0% 50%
    display block
    height 100%
    object-fit cover
    object-position 50% 50%
    width 100%
.img, .text-content
  width 50%
  height 100%
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
article
  +below('l')
    overflow auto
    display block
    .img
      width 100%
      max-height 75vh
      overflow hidden
      img
        transform-origin 50% 50%
    .text-content
      width 100%
      padding 10vh 7vw
      display flex
      justify-content space-between
      flex-direction row
      align-items flex-start
    header
      width 35%
      padding 0
    p
      width 50%
  +below('s')
    display block
    .text-content
      width 100%
      padding 10vh 4vw
      display block
    header
      padding-bottom 5vh
      width 100%
    .img
      max-height 50vh
    p
      width 100%


</style>
