<template>
  <nav :class="[{'sml': isMinimized}, color, $route.name]">
    <nuxt-link :to="{name: 'index'}" class="home strong" v-if="$route.name !== 'index'">Go home</nuxt-link>
    <div class="container">
      <nuxt-link :to="{name: 'index'}" v-if="isTablet && $route.name !== 'index'">Home</nuxt-link>
      <nuxt-link :to="{name: 'z'}">Z.<span>about me</span></nuxt-link>
      <nuxt-link :to="{name: 'works'}">Works<span>some cases</span></nuxt-link>
      <no-ssr>
        <div class="spacer" v-if="!isTablet"></div>
      </no-ssr>
      <nuxt-link :to="{name: 'workflow'}">Workflow<span>All the processes</span></nuxt-link>
      <nuxt-link :to="{name: 'contact'}">Contact Me<span>For any collaborations</span></nuxt-link>
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
  &.works .container:before
    background $pink
  .no-touch &.nude a:hover
    color $red
  .no-touch &.red a:hover
    color $white
  .home
    position absolute
    top 5vh
    line-height 2
    text-align center
    left 50%
    transform translateX(-50%)
    transition transform .4s ease-out-quad
    z-index 2
  &.sml
    transition transform .4s ease-in-quad
    transform translateY(-9vh)
    .home
      transform translate(-50%, 6vh)
      transition transform .4s ease-in-quad
    .container
      transition transform .4s ease-in-quad
      transform translateY(6vh)
      &:before
        transform translateY(0%)
        transition transform .4s ease-in-quad
    span
      opacity 0
      transform translateY(-20px)
      transition transform .4s ease-in-quad, opacity .4s ease-in-quad
  .container
    display flex
    position relative
    padding 5vh 2vw
    transition transform .4s ease-out-quad
    width 100%
    &:before
      background $brown
      bottom 0
      content ''
      display block
      left 0
      position absolute
      right 0
      top 0
      transform translateY(-100%)
      transition transform .4s ease-out-quad
      z-index -1
    a
      font-size 2.2vw
      display block
      margin 0 2vw
      line-height 1
      white-space nowrap
      transition color .5s ease-in-out-quad
      &.nuxt-link-exact-active
        color $red
  .spacer
    display block
    width 100%

  span
    display block
    font-weight $light
    font-size 12px
    padding-top 1.5em
    text-transform uppercase
    transition transform .4s ease-out-quad .2s, opacity .4s ease-out-quad .2s

</style>
