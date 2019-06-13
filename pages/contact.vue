<template>
  <section class="contact">
    <p>Let’s make something great!<br>Reach out <a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank">hey@zhenyary.com</a>  for wonderfull collaborations. <v-svg-star class="star" /></p>
    <no-ssr>
      <div>
        <div class="line">Let’s make <strong class="italic">something</strong> great!</div>
        <div class="line"><span class="rounded">Reach out</span><a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank">hey@zhenyary.com</a></div>
        <div class="line">for <span class="underline">wonderfull</span> <span class="slider-container"><span class="slider"><span v-for="(word, index) in words" :key="`word-${index}`" v-text="word"></span></span>.</span><v-svg-star class="star" /></div>
      </div>
    </no-ssr>
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vSvgStar from "~/assets/svgs/star.svg?inline";
import anime from 'animejs'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0,
      id:0,
      words: ['collaborations', 'cooool stories', 'new projects', 'collaborations']
    }
  },
  computed: {
  },
  components: {
    vSvgStar
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop) {
    },
    showWord() {
      this.timer = setTimeout(this.showWord.bind(this),1000)
      anime({
        targets: this.slider ,
        translateY: this.id *  -(.08 *this.w) ,
        easing: 'easeInOutQuad',
        duration: 0,
        complete: ()=>{
          if(this.id === this.words.length) {
            this.id = 1
            anime.set(this.slider, { translateY: 0 })
          }
        }
      })
      this.id++

    },
    show(){
      anime({
        targets: this.lines,
        translateY: 0,
        opacity: 1,
        scaleY: 1,
        durration: 700,
        easing: 'easeOutQuad',
        delay: anime.stagger(500)
      })
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  mounted() {
    this.$el.querySelector('p').style.display = 'none'
    Emitter.emit('PAGE:MOUNTED')
    this.$nextTick(()=>{
      this.slider = this.$el.querySelector('.slider')
      this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
      anime.set( this.lines, {
        translateY: 200,
        opacity: 0,
        scaleY: 1.5,
        transformOrigin: '50% 100%'
      })
      this.showWord()
      this.show()
    })
  }
}
</script>

<style lang="stylus" scoped>
.contact
  position relative
  width 100vw
  height 100vh
  font-size 7.6vw
  position relative
  display flex
  align-items center
  font-family $schnyder
  font-weight $demi
  .line
    width 100vw
    padding 1vh 6vw
    line-height 1.1
    display flex
    justify-content space-between
    align-items baseline
    &:llast-child
      overflow hidden
      height 9vw
  .rounded
    border .15vw solid $black
    border-radius 50%
    font-size 2.9vw
    padding 2.9vw 5vw
  .underline
    font-size 1.5vw
    line-height 2
    padding 0 10vw
    align-self center
    border-bottom .3vw solid black
  a
    color $red
    border-bottom 0.3vw solid $red
  .slider-container
    display flex
    height 8vw
    overflow hidden
    line-height 1
  .slider
    display block
    span
      display block
      height 8vw
      text-align right
  svg
    display block
  .arrow
    width 6.8vw
    height 4.5vw
  .star
    width 4.5vw
    height 4.5vw
    fill $red
</style>


