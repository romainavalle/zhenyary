<template>
  <div class="d-f top">
    <div class="img" ref="imgContainer">
      <div class="show-outer" ref="showOuter">
        <div class="show-inner" ref="showInner">
            <img src="/images/zhenya.jpg" alt="zhenya rynzhuk" ref="img">
        </div>
      </div>
    </div>
    <article>
      <h1 :class="{'mobile-anime': isPhone}">Z.</h1>
      <h2 :class="{'mobile-anime': isPhone}">a bit about me</h2>
      <strong class="h4" :class="{'mobile-anime': isPhone}">Just about</strong>
      <p class="strong" :class="{'mobile-anime': isPhone}">background</p>
      <p :class="{'mobile-anime': isPhone}"><span>My experience, awards</span><span>and own vibes</span><span>for sure!</span></p>
    </article>
  </div>
</template>

<script>
import anime from 'animejs'
import transform from 'dom-transform'
import { easeInOutQuad } from '~/assets/js/utils/easings'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h: 0,
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }

    },
    tick(scrollTop, ease) {
      let coef = 0

      const val = this.isPhone ? scrollTop : ease
      if(val >= 0 && val < this.h ) {
        coef = val/this.h
        transform(this.$refs.imgContainer, {translate3d:[0,coef*this.h*.2,0]})
        transform(this.$refs.img, {translate3d:[0,coef*this.h*.2,0]})
      }
    },
    show() {
      anime({
        targets: this.$refs.showOuter,
        translateX: '0%',
        duration: 1000,
        easing: 'easeOutCubic'
      })
      anime({
        targets: this.$refs.showInner,
        translateX: '0%',
        duration: 1000,
        easing: 'easeOutCubic'
      })
      anime({
        targets: this.animate_array,
        translateX: 0,
        opacity: 1,
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(100, {start: 300, easing: 'easeOutQuad'})
      })

    }
  },
  mounted() {
    this.animate_array = [
      this.$el.querySelector('h1'),
      this.$el.querySelector('h2'),
      this.$el.querySelector('strong'),
      this.$el.querySelector('p'),
      ...[].slice.call(this.$el.querySelectorAll('span')),
    ]
    anime.set(this.$refs.showInner, {translateX: '50%'})
    anime.set(this.$refs.showOuter, {translateX: '-100%'})
    anime.set(this.animate_array, {translateX: 50, opacity: 0})
  },
}
</script>

<style lang="stylus" scoped>
.top
  position relative
  z-index 1
  h1,h2,h3,p,span
    display block
  .show-outer
    overflow hidden
  .img
    overflow hidden
  .img, .spacer
    width 45%
  +below('l')
    .img
      margin-left 6vw
      width 50%
    article
      width 45%
  +below('s')
    padding 0 4vw
    .img
      padding 0
      margin 0
      width 100%
    article
      width 100%
      padding 0!important
</style>


