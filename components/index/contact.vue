<template>
  <article class="contact">
    <no-ssr>
    <v-svg-star class="star mobile-anime" v-if="isPhone"/>
    </no-ssr>
    <p :class="{'mobile-anime': isPhone}">Let’s make something great!<br><a :href="`mailto:${datas.email}`" rel="noopener" target="_blank" v-text="datas.email"></a>  for any <br> collaborations.</p>
    <no-ssr>
      <div v-if="!isPhone">
        <div class="line" :class="{'ready': linesReady[0]}"><v-svg-smiley class="smiley" /></div>
        <div class="line" :class="{'ready': linesReady[1]}">Let’s make <strong class="italic">something</strong> great!</div>
        <div class="line" :class="{'ready': linesReady[2]}"><a :href="`mailto:${datas.email}`" rel="noopener" target="_blank" class="link"  v-text="datas.email"></a><v-svg-arrow class="arrow" /> <span class="italic">for</span></div>
        <div class="line" :class="{'ready': linesReady[3]}"><v-svg-arrow class="arrow" :class="{'red': arrow[0]}" /><v-svg-arrow class="arrow"  :class="{'red': arrow[1]}"/><v-svg-arrow class="arrow"  :class="{'red': arrow[2]}"/><span>collaborations.</span><v-svg-star class="star" /></div>
      </div>
    </no-ssr>
  </article>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
import vSvgStar from "~/assets/svgs/star.svg?inline";
import vSvgSmiley from "~/assets/svgs/smiley.svg?inline";
import { easeInOutQuad } from '~/assets/js/utils/easings'
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      w:0,
      h:0,
      isShown: false,
      linesReady: [false, false, false, false],
      arrow: [false, false, false],
      currentArrow: 0
    }
  },
  computed: {
    ...mapGetters(['isPhone']),
    ...mapState(['datas'])
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
      if(this.isPhone) return
      if(scrollTop > (this.offset - this.h * .7) && this.lines ) {
        this.isReseted = false
        this.lines.forEach((line, i) => {
          const duration = this.h * .2
          const start = (this.offset - this.h * .7) + this.h * .1 * i
          const end = start + duration
          let coef = 0
          if(scrollTop > start ) {
            coef = easeInOutQuad(Math.min(1,(scrollTop-start) / duration))
            transform(line, {translateY: 100 - 100 * coef, scaleY: 1.5 - .5 * coef})
            line.style.opacity = coef
            if(coef > .95 && !this.linesReady[i]){
              this.$set(this.linesReady,i, true)
              if(i === 3)this.switchArrow()
            }
          }
          if(coef === 0 && this.linesReady[i]){
            this.$set(this.linesReady,i, false)
          }
        });
      }else{
        if(!this.isReseted)this.reset()
      }
    },
    reset() {
      this.isReseted = true
      this.lines.forEach((line, i) => {
        transform(line, {translateY: 100, scaleY: 1.5})
        line.style.opacity = 0
      });
      clearTimeout(this.arrowTimer)
      this.currentArrow = 0
      for (let index = 0; index < 3; index++) {
          this.$set(this.arrow,index, false)
      }
    },
    switchArrow() {
      this.$set(this.arrow, this.currentArrow++, false)
      if(this.currentArrow === 3) {
        this.currentArrow = -1
      }else{
        this.$set(this.arrow, this.currentArrow, true)
      }
      this.arrowTimer = setTimeout(this.switchArrow.bind(this), 200)
    }
  },
  beforeDestroy() {
    clearTimeout(this.arrowTimer)
  },
  mounted() {
    if(this.isPhone)return
    this.$el.querySelector('p').style.display = 'none'
    this.$nextTick(()=>{
    this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
    this.reset()

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
    transition color .5s ease-out-quad
  a
    color $red
    position relative
    &:after
      content ''
      display block
      bottom 0
      width 100%
      height .3vw
      left 0
      background $red
      transform scale(0, 1)
      transform-origin 0 50%
      transition transform .5s ease-out-quad
  svg
    display block
  .arrow
    width 6.8vw
    height 4.5vw
    opacity 0
    transform translateX(-3vw)
    transition transform .5s ease-out-quad, opacity .5s ease-out-quad
    &.red
      fill $red
    & + .arrow
      transition transform .5s ease-out-quad .2s, opacity .5s ease-out-quad .2s
      & + .arrow
        transition transform .5s ease-out-quad .3s, opacity .5s ease-out-quad .3s
  .star
    width 4.5vw
    height 4.5vw
    fill $red
  .smiley
    width 4.1vw
    height 4.1vw
  .safari &
    strong
      color $white
  .ready
    a:after
      transform scale(1)
    .arrow
      opacity 1
      transform translateX(0)
    strong
      color $white
.mobile &.contact
  display block
  height 80vh
  svg
    width 30px
    height 30px
    margin 0 auto 30px
  p
    text-align center
    font-family $schnyder
    font-weight $demi
    font-size 12vw
    a
      display inline-block
      line-height 1.2
    a:after
      transform scale(1)
      height 3px

</style>
