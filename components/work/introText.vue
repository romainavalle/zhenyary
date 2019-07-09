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
  data() {
    return {
      isAnimatedIn: false
    }
  },
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
          if(ease > this.offset + this.h * .3) {
            if(!this.isAnimatedIn) this.show()
          }
          if(ease < this.offset + this.h * .05) {
            if(this.isAnimatedIn) this.reset()
          }
        }
      }
    },
    show(start = 0){
      if(this.isAnimatedIn) return
      this.isAnimatedIn = true
      anime({
        targets: this.lines,
        opacity: 1,
        translateY: 0,
        easing: 'easeOutQuad',
        duration: 600,
        delay: anime.stagger(100, {start, easing: 'easeInQuad'})
      })
    },
    reset() {
      this.isAnimatedIn = false
      anime.set(this.lines, {opacity:0, translateY: 50})
    }
  },
  mounted() {
      this.$nextTick(()=>{
        const paragraphs = [].slice.call(this.$el.querySelectorAll('p'))
        paragraphs.forEach(paragraph => {
          splitLines(paragraph)
        });
        this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
        this.reset()
      })
  },
}
</script>
<style lang="stylus" scoped>
.intro
  width 100%
  padding 6vw
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
  +below('l')
    padding 10vh 7vw
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
