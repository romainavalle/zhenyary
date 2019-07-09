<template>
  <article class="content"  :style="{'background': background }" :class="[shadowClass, {'fit': content.fitHeight}]">
    <figure :style="{width, top}">
      <div class="img">
        <no-ssr>
          <img :data-src="`${path}${content.shadow}`" alt="shadow" class="shadow" aria-hidden="true" v-if="content.shadow">
        </no-ssr>
        <div class="img-container" ref="container">
          <img :data-src="`${path}${content.url}`" :alt="content.alt || title" ref="img" class="main">
        </div>
      </div>
    </figure>
  </article>
</template>

<script>
import anime from 'animejs'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex';
export default {
  props: ['content', 'path', 'title'],
  data() {
    return {
      isAnimatedIn: false
    }
  },
  computed: {
    ...mapGetters(['isPhone']),
    width() {
      return this.isPhone ? '80%' : this.content.width ? `${this.content.width}%`: '100%'
    },
    shadow(){
      return this.content.shadow ? require(`~/assets/imgs/${this.content.shadow}.png`) : ''
    },
    top() {
      return this.content.top ? `${this.content.top}%`: '50%'
    },
    shadowClass() {
      return this.content.shadow ? 'shadow' : ''
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
    },
    tick(scrollTop, ease){
      if(ease > this.offset + this.h * .3) {
        if(!this.isAnimatedIn) this.animateIn()
      }
      if(ease < this.offset) {
        if(this.isAnimatedIn) this.reset()
      }
    },
    animateIn() {
      this.isAnimatedIn = true
      anime({targets: this.$refs.img, scaleX: 1, scaleY:1, scaleZ:1, duration: 800, easing: 'easeInOutQuad'})
      anime({targets: this.$refs.container, scaleX: 1, scaleY:1, scaleZ:1, duration: 800, easing: 'easeInOutQuad'})
    },
    reset(){
      this.isAnimatedIn = false
      anime.set(this.$refs.img, {scaleX: 1.5, scaleY:1.5, scaleZ:1})
      anime.set(this.$refs.container, {scaleX: .7, scaleY:.7, scaleZ:1})
    }
  },
  mounted() {
    this.reset()
  }
}
</script>


<style lang="stylus" scoped>
article
  position relative
  height 100vh
  width 100%
  transform translateZ(0)
  &.fit
    height auto
    padding 10vh 0
    figure
      position relative
      top auto
      left auto
      transform none
      margin 0 auto
figure
  display block
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)

.img-container
  overflow hidden
  width 100%
.img
  margin 0 auto
  position relative
  .main
    position relative
  img.shadow
    position absolute
    bottom -10%
    width 80%
    left 10%
  img
    width 100%
article
  +below('l')
    &.content
      padding-top 10vh
      padding-bottom 10vh
      height auto
      &.shadow
        padding-top 15vh
        padding-bottom 15vh
      figure
        position relative
        top auto!important
        left auto
        transform none
        margin 0 auto
</style>
