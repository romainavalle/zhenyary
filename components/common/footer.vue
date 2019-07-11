<template>
  <footer>
    <v-socials ref="socials"/>
  </footer>
</template>

<script>
import vSocials from '~/components/common/socials.vue'
import vSvgClose from "~/assets/svgs/close.svg?inline";
import anime from 'animejs'
export default {
  data() {
    return {
      isShown: false
    }
  },
  components: {
    vSocials
  },
  methods: {
    resize(w, h, ph) {
      if(w && h) {
        this.w = w
        this.h = h
        this.ph = ph
      }
    },
    tick(scrollTop) {
      if(scrollTop > this.ph - this.h * 1.1 ) {
        if(!this.isShown)this.show()
      }else{
        if(this.isShown)this.hide()
      }
    },
    show() {
      this.isShown = true
      this.$refs.socials.show()
    },
    hide(){
      this.isShown = false
      this.$refs.socials.hide()
    }
  },
  mounted() {
    this.$refs.socials.fastHide()
  }
}
</script>

<style lang="stylus" scoped>
footer
  position absolute
  bottom 0
  left 0
  width 100%
  display flex
  justify-content center
  padding 50px 0
  .work &
    bottom auto
    top calc(100vh - 100px)
  +below('l')
    padding 0 0 5vh
    .work &
      bottom 0
      top auto
</style>
