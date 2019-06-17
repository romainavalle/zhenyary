<template>
  <nav :class="[{'sml': isMinimized,'large': !isMinimized}, color, $route.name]">
    <transition name="back">
        <nuxt-link :to="{name: 'index'}" class="home strong" v-if="$route.name !== 'index'">Go home</nuxt-link>
    </transition>
    <div class="container">
      <transition name="mainHome">
        <span v-if="$route.name !== 'index'" class="home-main">
          <nuxt-link :to="{name: 'index'}" >Home</nuxt-link>
        </span>
      </transition>
      <nuxt-link :to="{name: 'z'}" class="z"><span class="title">Z.</span><span class="label">about me</span></nuxt-link>
      <nuxt-link :to="{name: 'works'}"><span class="title">Works</span><span class="label">some cases</span></nuxt-link>
      <no-ssr>
        <div class="spacer" v-if="!isTablet"></div>
      </no-ssr>
      <nuxt-link :to="{name: 'workflow'}"><span class="title">Workflow</span><span class="label">All the processes</span></nuxt-link>
      <nuxt-link :to="{name: 'contact'}"><span class="title">Contact Me</span><span class="label">For any collaborations</span></nuxt-link>
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
 /* &.works .container:before
    background $pink
  &.contact .container:before
    background none
  &.works-slug .container:before
    background none*/
  .no-touch & a:hover
    color $red
  &.index.red a
    color $white
  .no-touch &.index.red a:hover
    color $brown
  .home
    position absolute
    top 5vh
    line-height 2
    text-align center
    left 50%
    transform translateX(-50%)
    transition transform .4s ease-out-quad
    z-index 2

  .container
    display flex
    position relative
    padding 5vh 0 5vh 4vw
    transition transform .4s ease-out-quad
    width 100%
    /*&:before
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
      z-index -1*/
    a
      font-size 2.2vw
      display block
      margin 0
      line-height 1
      white-space nowrap
      transition color .5s ease-in-out-quad
      &.nuxt-link-active
        color $red
      &.z .title
        padding-right 5.4vw
    .home-main
      display none
      margin-right 4vw
      padding-left 2vw
  .title
    display block
    padding-right 4vw
  .spacer
    display block
    width 100%
  .label
    display block
    font-weight $light
    font-size 12px
    padding-top 1.5em
    text-transform uppercase
    transition transform .4s ease-out-quad .2s, opacity .4s ease-out-quad .2s, letter-spacing .5s ease-out-quad
  .back-enter-active
    transition transform .5s ease-out-quad, opacity .5s ease-out-quad
  .back-leave-active
    transition transform .5s ease-in-quad, opacity .5s ease-in-quad
  .back-enter, .back-leave-to
    opacity 0
    transform translate(-50%, -5vh)
  .mainHome-enter-active
    transition margin .5s
  .mainHome-leave-active
    transition margin .5s
  .mainHome-enter, .mainHome-leave-to
    margin-left -26.7vw
  &.sml
    transition transform .4s ease-in-quad
    transform translateY(-9vh)
    .home
      transform translate(-50%, 6vh)
      transition transform .4s ease-in-quad
    .container
      transition transform .4s ease-in-quad
      transform translateY(6vh)
      /*&:before
        transform translateY(0%)
        transition transform .4s ease-in-quad*/
    .label
      opacity 0
      transform translateY(-20px)
      transition transform .4s ease-in-quad, opacity .4s ease-in-quad
  +below('l')
    transform translateY(-6vh)
    transition none
    .spacer
      display none
    .home
      display none
    .container
      transition none
      justify-content space-between
      transform translateY(3vh)
      /*&:before
        transform translateY(0)*/
      .home-main
        display block
    .label
      opacity .2
      display none

</style>
