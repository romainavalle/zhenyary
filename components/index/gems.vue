<template>
  <article class="gems">
    <strong class="strong">My main services</strong>
    <ul>
      <li><v-svg-star class="star"/></li>
      <li>Art direction</li>
      <li>Product design</li>
      <li>Visual design</li>
      <li>Mobile esign</li>
      <li> web design</li>
      <li>Interaction design</li>
      <li>Animation</li>
    </ul>
    <no-ssr>
      <div class="d-f" aria-hidden="true" v-if="!isPhone">
        <div>
          <div class="line">
            <span class="word">Art direction</span>
            <v-svg-star class="star"/>
            <span class="italic blur" :class="{'ready': isBlurActive}">Product Design
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
                <span class="inner-blur" data-text="Product Design"></span>
            </span>
          </div>
          <div class="line">
            <span class="underline" :class="{'ready': isShown}">Visual design</span>
            <span class="word">Mobile & web design</span>
          </div>
          <div class="line">
            <span class="word italic">Interaction design</span>
            <div class="and" :class="{'ready': isShown}"><span>&</span><span>&</span></div>
            <span class="word">Animation</span>
          </div>
        </div>
      </div>
    </no-ssr>
  </article>
</template>

<script>
import anime from 'animejs'
import vSvgStar from "~/assets/svgs/star.svg?inline";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w:0,
      h:0,
      isShown: false,
      isBlurActive: false,
      showComplete: false
    }
  },
  components: {
    vSvgStar
  },
  computed: {
    ...mapGetters(['isDevice', 'isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = this.h
    },
    tick(scrollTop) {
      if(this.isPhone) return
      if(scrollTop > this.offset - this.h * .5 && !this.isShown) {
        this.show()
      }
      if(scrollTop > this.offset- this.h * .8 && scrollTop < this.offset +this.h * .5 && this.showComplete) {
        if(!this.isBlurActive)this.doBlur()
      }else{
        if(this.isBlurActive){
          this.isBlurActive = false
          if(this.blurAnime) this.blurAnime.pause()
        }
      }
    },
    show() {
      this.isShown = true
      this.words.forEach((word, i) => {
        anime({
          targets: word.inners,
          opacity: 1,
          translateX: 0,
          duration: 100,
          easing: 'easeOutQuad',
          delay: anime.stagger(50 , {start: 100 * i, easing: 'easeInQuad'})
        })
      })

      anime({
        targets: [this.star, this.blur],
        opacity: 1,
        easing: 'easeOutQuad',
        delay: anime.stagger(200, {start: 100})
      })
      setTimeout(this.doBlur.bind(this), 500)

    },
    doBlur() {
      if(this.isDevice) return

      this.showComplete = true
      this.isBlurActive = true
      const duration = 50 + Math.random() * 50
      const delay = Math.random() * 100
      const scaleX = 1 + Math.random() / 10
      const scaleY = 1 + Math.random() / 10
      const translateX = (Math.random() -.5) / 100

      const translateY = (Math.random() - .5) / 100
      this.blurAnime = anime({
        targets: '.inner-blur',
        translateX: () => { return anime.random(-4, 4); },
        translateY: () => { return anime.random(-4, 4); },
        duration: duration,
        easing: 'easeOutQuad',
        delay,
        direction: 'alternate',
        loop: 1,
        complete: this.doBlur.bind(this),
      })

    },
    setup() {
      this.words.forEach(word => {
        const html = '<span class="inner">' + word.el.innerText.split('').join('</span><span class="inner">') + '</span>'
        word.el.innerHTML = html
        word.inners = [].slice.call(word.el.querySelectorAll('.inner'))
        word.inners.forEach(inner => {
          if(inner.innerText === '')inner.innerHTML = '&nbsp;'
        })
        anime.set(word.inners,{
          opacity: 0,
          translateX: 50,
        })
      });

      anime.set([this.blur,this.star],{
        opacity: 0
      })

    }
  },
  beforeDestroy() {
    if(this.blurAnime)this.blurAnime.pause()
  },
  mounted() {
    if(this.isPhone) return
    this.$el.querySelector('ul').style.display = "none"
    this.$nextTick(()=>{
      const words = [].slice.call(this.$el.querySelectorAll('.word'))
      this.words =[]
      words.forEach(word => {
        this.words.push({el: word})
      })
      this.star = this.$el.querySelector('.d-f .star')
      this.blur = this.$el.querySelector('.d-f .blur')
      this.setup()
    })
  }
}
</script>

<style lang="stylus" scoped>
.gems
  background $grey
  overflow hidden
  height 60vh
  width 100vw
  position relative
  strong
    position absolute
    top 2vh
    text-align center
    left 50%
    transform translateX(-50%)
.d-f
  font-size 6vw
  display flex
  align-items center
  font-family $schnyder
  font-weight $demi
  height 100%
.line
  display flex
  justify-content space-between
  align-items center
  will-change transform
  line-height 1.11
  padding 1vh 0
  padding 0 6vw
  width 100vw
.star
  fill $red
  width 2vw
  height 2vw
  display block
.underline
  opacity 0
  position relative
  transition opacity .5s ease-out-quad .1s
  &:after
    position absolute
    width 100%
    height 0.2vw
    background $red
    content ''
    bottom 0
    display block
    transition transform .5s ease-out-quad .5s
    transform translateX(-150%)
  &.ready
    opacity 1
    &:after
      transform translateX(0%)
.and
  width 10vw
  height 3vw
  position relative
  span
    text-align center
    line-height 1.6
    font-size 1.5vw
    border-bottom .2vw solid $black
    opacity 0
    position absolute
    width 100%
    height 100%
    transform translateX(60%)
    transition transform .5s ease-out-quad .5s, opacity .7s ease-out-quad .5s
    & + span
      transform translateX(-60%)
  &.ready span
    opacity 1
    transform translateX(0%)
.word
  display flex
.mobile &.gems
  height auto
  ul
    padding 100px 0
  li
    display block
    text-align center
    font-family $schnyder
    font-weight $demi
    font-size 12vw
  .star
    width 30px
    height 30px
    margin 0 auto 30px

</style>

<style lang="stylus">
.gems .inner
  display block
</style>
