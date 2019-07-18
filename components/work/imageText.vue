<template>
  <article :style="{'background': background }" class="img-text">
    <div class="img">
      <no-ssr>
        <div class="bg-img" :style="{'background-image': `url(${getSrcSet(path+content.url)})`}" ref="img" v-if="isBrowser"></div>
      </no-ssr>
    </div>
    <div class="text-content" ref="textContent">
      <header v-html="content.header" class="demi" ref="header" :class="{'mobile-anime': isPhone}"></header>
      <p v-for="(paragraph, index) in content.paragraphs" :key="`paragraph-${index}`" v-html="paragraph" ref="paragraphs" :class="{'mobile-anime': isPhone}"></p>
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
      isAnimatedIn: false,
      isTextAnimatedIn: false
    }
  },
  props: ['content', 'path', 'title'],
  computed:{
    ...mapGetters(['isPhone', 'isDevice']),
    isBrowser() {
      return process.browser
    },
    width() {
      return this.isPhone ? '90%' : this.content.width ? `${this.content.width}%`: '100%'
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
      if(ease > this.offset + this.h *.3 ) {
        if(!this.isAnimatedIn)this.animateIn()
      }
      if(ease < this.offset  ) {
        if(this.isAnimatedIn)this.reset()
      }
      if(!this.isPhone){
        if(ease > this.offsetText + this.h *.3 ) {
          if(!this.isTextAnimatedIn)this.animateTextIn()
        }
        if(ease < this.offsetText  ) {
          if(this.isTextAnimatedIn)this.resetText()
        }
      }
    },
    animateIn() {
      this.isAnimatedIn = true
      anime({targets: this.$refs.img, scaleX: 1, scaleY:1, easing: 'easeOutQuad', duration: 1000})
    },
    reset() {
      this.isAnimatedIn = false
      anime.set(this.$refs.img, {scaleX: 1.3, scaleY:1.3})
    },
    animateTextIn() {

      this.isTextAnimatedIn = true
      if(this.isDevice) {
        anime({targets: this.headerLines, translateY: 0, opacity:  1, easing: 'easeOutQuad', duration: 500, delay: anime.stagger(100,{easing: 'easeInQuad'})})
        anime({targets: this.pLines, translateY: 0, opacity:  1, easing: 'easeOutQuad', duration: 500, delay: anime.stagger(100,{start: 200, easing: 'easeInQuad'})})
      }else{
        anime({targets: this.lines, translateX: 0, opacity:  1, easing: 'easeOutQuad', duration: 500, delay: anime.stagger(100,{start: 500, easing: 'easeInQuad'})})
      }
    },
    resetText() {
      this.isTextAnimatedIn = false
      if(this.isDevice) {
        anime.set(this.headerLines, {translateY: 50, opacity:  0})
        anime.set(this.pLines, {translateY: 50, opacity:  0})
      }else{
        anime.set(this.lines, {translateX: 100, opacity:  0})
      }
    }
  },
  mounted() {
    this.reset()
    if(!this.isPhone) {
      this.$nextTick(()=>{
        splitLines(this.$el.querySelector('header'))
        splitLines(this.$el.querySelector('p'))
        this.textContent = this.$el.querySelector('.text-content')
        if(this.isDevice) {
          this.headerLines = [].slice.call(this.$el.querySelectorAll('header .line'))
          this.pLines = [].slice.call(this.$el.querySelectorAll('p .line'))
        }else{
          this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
        }
        this.resetText()
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
article
  display flex
  width 100%
  height 100vh
  .bg-img
    height 100%
    background-size cover
    background-position 50% 50%
    display block
    position absolute
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
  position relative
  overflow hidden
header, p
  width 50%
header
  font-size 16px
  padding-bottom 50px
  padding-right 15%
article
  +below('l')
    overflow auto
    display block
    height auto
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
      padding 0
    p
      width 50%
  +below('s')
    display block
    .text-content
      width 100%
      padding 10vh 5vw
      display block
    header
      padding-bottom 5vh
      width 100%
    .img
      max-height 50vh
    p
      width 100%


</style>
