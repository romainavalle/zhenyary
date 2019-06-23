<template>
  <section class="contact">
    <p>Let’s make something great!<br>Reach out <a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank">hey@zhenyary.com</a>  for wonderfull collaborations. <v-svg-star class="star" /></p>
    <no-ssr>
      <div v-if="isDevice">
        <div class="line">Let’s make</div>
        <div class="line"><strong class="italic">something</strong> great!</div>
        <div class="line" :class="{'ready': lineThree}"><a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank" class="underline">hey@zhenyary.com</a></div>
        <div class="line" :class="{'ready': lineTwo}"><strong class="italic">Reach out</strong> for</div>
        <div class="line"><span class="slider-container"><span class="slider"><span v-for="(word, index) in words" :key="`word-${index}`" v-text="word"></span></span>.</span></div>
        <div class="line"><v-svg-star class="star" /></div>
      </div>
    </no-ssr>
    <no-ssr>
      <div  v-if="!isDevice">
        <div class="line">Let’s make <strong class="italic">something</strong> great!</div>
        <div class="line" :class="{'ready': lineTwo}"><span class="rounded">Reach out</span><a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank" class="link underline">hey@zhenyary.com</a></div>
        <div class="line" :class="{'ready': lineThree}">for <span class="underline wide">wonderfull</span> <span class="slider-container"><span class="slider"><span v-for="(word, index) in words" :key="`word-${index}`" v-text="word"></span></span>.</span><v-svg-star class="star" /></div>
      </div>
    </no-ssr>
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vSvgStar from "~/assets/svgs/star.svg?inline";
import anime from 'animejs'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0,
      id:0,
      lineTwo: false,
      lineThree: false,
      words: ['collaborations', 'new projects', 'expeeeeriences', 'collaborations']
    }
  },
  computed: {
    ...mapState(['firstTime']),
    ...mapGetters(['isDevice'])
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
        translateY: this.id *  this.isDevice ? -( .12 * this.w) : -(.08 *this.w) ,
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
      this.lineTimer = setTimeout(()=>{
        this.lineTwo = true
        this.lineTimer = setTimeout(()=>{
          this.lineThree = true
        }, 700)
      }, 700)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    if(this.lineTimer)clearTimeout(this.lineTimer)
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
      setTimeout(()=>{
        this.showWord()
        this.show()
      }, this.firstTime ? 3000 : 450)
    })
  }
}
</script>

<style lang="stylus" scoped>
.contact
  align-items center
  background $grey
  display flex
  font-family $schnyder
  font-size 7.6vw
  font-weight $demi
  height 100vh
  position relative
  position relative
  width 100vw
  .line
    width 100vw
    padding 1vh 6vw
    line-height 1.1
    display flex
    justify-content space-between
    align-items baseline
  .rounded
    border .15vw solid $black
    border-radius 50%
    font-size 2.9vw
    padding 2.9vw 5vw
  .underline
    position relative
    &:after
      content ''
      display block
      bottom 0
      width 100%
      height .3vw
      left 0
      background $black
      transform scale(0)
      transition transform .5s ease-out-quad
  .wide
    font-size 1.5vw
    line-height 2
    width 20vw
    align-self center
    text-align center
  a
    color $red
    &.underline:after
      background $red
      transform-origin 0 0
  .line.ready
    .underline:after
      transform scale(1)
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
  .device &
    font-size 12vw
    height 100vh
    padding-top 20vh
    .line
      display block
      text-align center
      padding-top 0
      padding-bottom 0
    a
      display inline-block
      font-size 10vw
      padding-bottom 2vh
    .slider-container
      display block
      height 12vw
      .slider span
        text-align center
        height 12vw
    .star
      margin 3vh auto
</style>


