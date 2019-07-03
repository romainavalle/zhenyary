<template>
  <article class="thanks">
    <p :class="{'ready': showLink, 'mobile-anime': isPhone}"><span>Special thanks to <a href="https://www.romainavalle.dev" target="_blank" rel="noopener" class="link">Romain Avalle</a></span><span>for development.</span></p>
  </article>
</template>

<script>
import vSvgSmiley from "~/assets/svgs/smiley.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      w:0,
      h:0,
      showLink: false
    }
  },
  computed: {
    ...mapGetters(['isPhone'])
  },
  components: {
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h * .7

    },
    tick(scrollTop) {
      if(this.isPhone) return
      if(scrollTop > this.offset) {
        if(!this.showLink) this.showLink = true
      }else{
        if(this.showLink) this.showLink = false
      }
    },
  },
  beforeDestroy() {
  },
  mounted() {
    if(this.isPhone){
      this.showLink = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.thanks
  height auto
  width 100vw
  height 50vh
  position relative
  display flex
  justify-content center
  align-items center
  p
    font-size 2vw
    align-items center
    font-family $schnyder
    font-weight $demi
    text-align center
    line-height 1.1
    span
      display block
      margin-bottom 0.2vw
  a
    position relative
    display inline-block
    &:after
      content ''
      display block
      bottom 0
      width 100%
      height .15vw
      left 0
      background $black
      transform scale(0, 1)
      transform-origin 0 50%
      transition transform .5s ease-out-quad
  .ready
    a:after
      transform scale(1)
  +below('l')
    height auto
    padding 10vh 0 20vh
    p
      font-size 6vw
    a
      &:after
        height 2px
  +below('s')
    padding-top 0
</style>
