<template>
  <article class="contact">
    <p>Let's make something great!<br><a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank">hey@zhenyary.com</a>  for collaborations.</p>
    <no-ssr>
      <div>
        <div class="line"><v-svg-smiley class="smiley" /></div>
        <div class="line">Let's make <strong class="italic">something</strong> great!</div>
        <div class="line"><a href="mailto:hey@zhenyary.com" rel="noopener" target="_blank">hey@zhenyary.com</a><v-svg-arrow class="arrow" /> <span class="italic">for</span></div>
        <div class="line"><v-svg-arrow class="arrow" /><v-svg-arrow class="arrow" /><v-svg-arrow class="arrow" /><span>collaborations.</span><v-svg-star class="star" /></div>
      </div>
    </no-ssr>
  </article>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
import vSvgStar from "~/assets/svgs/star.svg?inline";
import vSvgSmiley from "~/assets/svgs/smiley.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
export default {
  data() {
    return {
      w:0,
      h:0,
      isShown: false
    }
  },
  components: {
    vSvgArrow, vSvgStar, vSvgSmiley
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top

    },
    tick(scrollTop) {
      if(scrollTop > (this.offset - this.h * .5) && this.lines ) {
        this.isReseted = false
        this.lines.forEach((line, i) => {
          const duration = this.h * .2
          const start = (this.offset - this.h * .5) + this.h * .1 * i
          const end = start + duration
          let coef = 0
          if(scrollTop > start ) {
            coef = this.easeInOutQuad(Math.min(1,(scrollTop-start) / duration))
            transform(line, {translateY: 100 - 100 * coef, scaleY: 1.5 - .5 * coef})
            line.style.opacity = coef
          }
        });
      }else{
        if(!this.isReseted)this.reset()
      }
    },
    easeInOutQuad (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    reset() {
      this.isReseted = true
      this.lines.forEach((line, i) => {
        transform(line, {translateY: 100, scaleY: 1.5})
        line.style.opacity = 0
      });
    }
  },
  mounted() {
    this.$el.querySelector('p').style.display = 'none'
    this.$nextTick(()=>{
    this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
    this.reset()
      // anime({
      //   targets: this.lines,
      //   opacity: 0,
      //   translateY: 100,
      //   scaleY: 1.5,
      //   duration: 0
      // })
    })
  }
}
</script>

<style lang="stylus" scoped>
.contact
  height 100vh
  width 100vw
  font-size 8.3vw
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
    &:first-child
      justify-content center
  strong
    color $white
  a
    color $red
    border-bottom 0.3vw solid $red
  svg
    display block
  .arrow
    width 6.8vw
    height 4.5vw
  .star
    width 4.5vw
    height 4.5vw
    fill $red
  .smiley
    width 4.1vw
    height 4.1vw
</style>
