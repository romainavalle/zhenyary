<template>
  <nav :class="[{'sml': isMinimized}, color]">
    <div class="container">
      <nuxt-link :to="{name: 'index'}" v-if="isTablet && $route.name !== 'index'">Home</nuxt-link>
      <nuxt-link :to="{name: 'index'}">Z.<span>about me</span></nuxt-link>
      <nuxt-link :to="{name: 'index'}">Works<span>some cases</span></nuxt-link>
      <no-ssr>
        <span class="spacer" v-if="!isTablet"></span>
      </no-ssr>
      <nuxt-link :to="{name: 'index'}">Workflow<span>All the processes</span></nuxt-link>
      <nuxt-link :to="{name: 'index'}">Contact Me<span>For any collaborations</span></nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      isMinimized: false,
      w: 0,
      h: 0
    }
  },
  computed:{
    ...mapState(['color']),
    ...mapGetters(['isDevice', 'isTablet'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop) {
      if(this.isDevice) return
      if(scrollTop > this.h * .3 ) {
        if(!this.isMinimized) this.isMinimized = true
      }else{
        if(this.isMinimized) this.isMinimized = false
      }
    },
  },
  mounted(){
    console.log(this.isDevice);

    if(this.isDevice) this.isMinimized = true
  }
}
</script>

<style lang="stylus" scoped>
nav
  justify-content space-between
  left 0
  overflow hidden
  position fixed
  transition transform .4s ease-out-quad
  width 100%
  z-index 5
  &.sml
    transition transform .4s ease-in-quad
    transform translateY(-9vh)
    .container
      transition transform .4s ease-in-quad
      transform translateY(6vh)
    span
      opacity 0
      transform translateY(-20px)
      transition transform .4s ease-in-quad, opacity .4s ease-in-quad
  .container
    display flex
    padding 5vh 2vw
    transition transform .4s ease-out-quad
    width 100%
  .spacer
    display block
    width 100%
  a
    font-size 2.2vw
    display block
    margin 0 2vw
    line-height 1
    white-space nowrap
  span
    display block
    font-weight $light
    font-size 12px
    padding-top 1.5em
    text-transform uppercase
    transition transform .4s ease-out-quad .2s, opacity .4s ease-out-quad .2s

</style>
