<template>
  <article class="intro">
    <div class="spacer"></div>
    <div class="text" >
      <p v-for="(text, index) in work.header" :key="`header-${index}`" v-html="text"></p>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import splitLines from '~/assets/js/utils/splitLines'
import anime from 'animejs'

import { easeInOutQuad } from '~/assets/js/utils/easings'
import { mapGetters } from 'vuex';
export default {
  props: ['work'],
  computed: {
    ...mapGetters(['isPhone'])
  },
  methods:{
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
    this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease){
      if(this.isPhone) {

      }else{
        if(this.w >1024) {
          if(ease > this.offset && ease <this.offset + this.h * .4) {
            const coef = easeInOutQuad(Math.min(1, (ease - this.offset) / (this.h * .4)))
            this.$el.style.opacity = coef
            this.lines.forEach((line, i) => {
              const start = 50 + i * 50
              transform(line, {translate3d: [0, start -  start * coef, 0]})
            });
          }
        }
      }
    },
    show(){
      this.$el.style.opacity = 1
       this.lines.forEach((line, i) => {
          transform(line, {translate3d: [0, 0, 0]})
        });
      anime({
        targets: this.lines,
        opacity: [0,1],
        translateY: [40,0],
        easing: 'easeOutQuad',
        duration: 400,
        delay: anime.stagger(50, {start: 500, easing: 'easeOutQuad'})
      })
    }
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
.intro
  padding 10vh 7vw
  +below('l')
    .text
      padding-left 0
    p
      width 100%
  +below('s')
    padding 2vh 5vw 10vh
    display block
    .spacer
      display none
    .text
      width 100%
</style>
