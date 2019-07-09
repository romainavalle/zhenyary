<template>
  <div class="d-f desc">
    <div class="spacer"></div>
    <article>
      <div class="blur-container" :class="{'ready': isBlurReady}" aria-hidden="true" >
        <v-svg-blur class="svg-blur" :class="{'mobile-anime': isPhone}"/>
      </div>
      <strong class="h4" >So,</strong>
      <p  v-html="about.about"  :class="{'mobile-anime': isPhone}"></p>
    </article>
  </div>
</template>

<script>
import vSvgBlur from "~/assets/svgs/blur.svg?inline";
import offset from '~/assets/js/utils/offset'
import anime from 'animejs'
import splitLines from '~/assets/js/utils/splitLines'
import { easeInOutQuad } from '~/assets/js/utils/easings'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h: 0,
      isBlurReady: false
    }
  },
  components: {
    vSvgBlur
  },
  computed: {
    ...mapState(['about']),
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h * .95
    },
    tick(scrollTop, ease) {
      if(!this.isPhone) {
        let coef = 0
        if(!this.lines) return
        if(ease >= this.offset && ease < this.offset + this.h * .5) {
          coef = (ease-this.offset) / (this.h * .5)

          if(!this.isBlurReady && coef > .5)this.show()
          if(coef < .1 && this.isBlurReady)this.hide()
        }
      }
    },
    show() {
      this.isBlurReady=true

      anime({
        targets: this.lines,
        translateX: 0,
        opacity: 1,
        easing: 'easeOutQuad',
        duration: 500,
        delay: anime.stagger(50, {easing: 'easeOutQuad'})
      })
    },
    hide() {
      this.isBlurReady = false
      anime({
        targets: this.lines,
        translateX: 50,
        opacity: 0,
        easing: 'easeInQuad',
        duration: 500
      })

    }
  },
  mounted() {
    if(this.isPhone){
      this.isBlurReady = true
    }else{
      this.$nextTick(()=>{
        //splitLines(this.$el.querySelector('p'))
        const innerhtml = this.$el.querySelector('p').innerHTML
        const html = '<span class="line">' + innerhtml.split('<br>').join('</span><span class="line">') + '</span>'
        this.$el.querySelector('p').innerHTML = html
        this.lines = [this.$el.querySelector('strong'), ...[].slice.call(this.$el.querySelectorAll('.line'))]
        anime.set(this.lines, {
          translateX: 50,
          opacity: 0,
        })
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.desc
  z-index 0
  position relative
  margin-top -4vw
  strong, p
    display block
    position relative
  p
    font-weight $light
  .blur-container
    position absolute
    left 0vw
    top 4vw
  .svg-blur
    width 30vw
    height 30vw
    display block
    transform translate(-50%, -50%)
  +below('l')
    margin-top 4vw
    p
      width 68%
  +below('s')
    p
      width 100%
</style>
<style lang="stylus" >
.about .desc
  +below('s')
    p
      br
        display none
</style>


