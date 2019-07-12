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
import anime from 'animejs'
import offset from '~/assets/js/utils/offset'
import splitLines from '~/assets/js/utils/splitLines'

import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      isAnimatedIn: false
    }
  },
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
        if(ease > this.offset + this.h * .1) {
          if(!this.isAnimatedIn) this.animateIn()
        }
        if(ease < this.offset) {
          if(this.isAnimatedIn) this.reset()
        }
      }
    },
    animateIn() {
      this.isAnimatedIn = true
      anime({targets: this.$el, translateY: 0, duration: 2000, easing: 'easeOutQuad'})
      anime({targets: this.headerLines, translateY: 0, opacity:1, duration: 600, easing: 'easeOutQuad', delay: anime.stagger(100, {easing: 'easeInQuad'})})
      anime({targets: this.pLines, translateY: 0, opacity:1, duration: 600, easing: 'easeOutQuad', delay: anime.stagger(100, {start: 300, easing: 'easeInQuad'})})
    },
    reset(){
      this.isAnimatedIn = false
      anime.set(this.$el, {translateY: 200})
      anime.set(this.headerLines, {translateY: 50, opacity:0})
      anime.set(this.pLines, {translateY: 50, opacity:0})
    }
  },
  mounted() {
      if(this.isPhone) {

      }else{

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
          this.reset()
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
  font-size 16px
p
  font-size 10px
.paragraphs>div
  width 50%
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
