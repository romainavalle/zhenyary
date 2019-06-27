<template>
  <div class="d-f desc">
    <div class="spacer"></div>
    <article :class="{'mobile-anime': !isPhone}">
      <div class="blur-container" :class="{'ready': isBlurReady}" aria-hidden="true" >
        <v-svg-blur class="svg-blur" :class="{'mobile-anime': isPhone}"/>
      </div>
      <strong class="h4" :class="{'mobile-anime': isPhone}">So,</strong>
      <p :class="{'mobile-anime': isPhone}" v-html="about.about" ></p>
    </article>
  </div>
</template>

<script>
import vSvgBlur from "~/assets/svgs/blur.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
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

        if(ease >= this.offset && ease < this.offset + this.h * .5) {
          coef = easeInOutQuad((ease-this.offset) / (this.h * .5))

          if(!this.isBlurReady && coef > .5)this.isBlurReady=true
          this.lines.forEach((line, i) => {
            const start = 50 + i * 50
            line.style.opacity = coef
            transform(line, {translate3d: [start - coef * start, 0, 0]})
          });
          if(coef < .1 && this.isBlurReady)this.isBlurReady=false
        }
      }
    },
    show() {
    }
  },
  mounted() {
    if(this.isPhone){
      this.isBlurReady = true
    }else{
      this.$nextTick(()=>{
        splitLines(this.$el.querySelector('p'))
        this.lines = [this.$el.querySelector('strong'), ...[].slice.call(this.$el.querySelectorAll('.line'))]
        this.lines.forEach((line, i) => {
          const start = 50 + i * 50
          line.style.opacity = 0
          transform(line, {translate3d: [start,0,  0]})
        });
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
    width 50%
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
.about .desc .line
  display block
</style>


