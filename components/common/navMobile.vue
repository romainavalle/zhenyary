<template>
  <nav>
    <button @click="setNavMobile(false)" ref="close"><v-svg-close /></button>
    <div class="container">
      <nuxt-link :to="{name: 'about'}" class="z"><span class="title">Some thing</span><span class="label">about me</span></nuxt-link>
      <nuxt-link :to="{name: 'works'}"><span class="title">Works</span><span class="label">some cases</span></nuxt-link>
      <nuxt-link :to="{name: 'workflow'}"><span class="title">Workflow</span><span class="label">my life — my rules</span></nuxt-link>
      <nuxt-link :to="{name: 'contact'}"><span class="title">Connect</span><span class="label">For any collaborations</span></nuxt-link>
      <nuxt-link :to="{name: 'index'}"  v-show="$route.name !== 'index'" class="home">Go Home</nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import vSvgClose from "~/assets/svgs/close.svg?inline";
import anime from 'animejs'
export default {
  data() {
    return {
      isMinimized: false,
      w: 0,
      h: 0
    }
  },
  components:{
    vSvgClose
  },
  computed:{
    ...mapState(['navMobile'])
  },
  methods: {
    ...mapActions(['setNavMobile']),
    show() {
      this.$el.style.display = 'block'
      anime({
        targets: this.$refs.close,
        opacity: [0,1],
        duration: 500,
        easing: 'easeOutQuad',
        delay: 1000
      })
      anime({
        targets: this.links,
        opacity: [0,1],
        translateY: [40,0],
        duration: 500,
        easing: 'easeOutQuad',
        delay: anime.stagger(100, {start: 500})
      })
      anime({
        targets: this.$el,
        translateY: ['-100%', '0%'],
        duration: 500,
        easing: 'easeOutQuad'
      })
    },
    hide() {
      this.$el.style.display = 'none'
    }
  },
  watch: {
    navMobile(val) {
      if(val) {
        this.show()
      }else{
        this.hide()
      }
    }
  },
  mounted(){
    this.links = [].slice.call(this.$el.querySelectorAll('a'))
    this.$el.style.display = 'none'
  }
}
</script>

<style lang="stylus" scoped>
nav
  background $brown
  overflow hidden
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 5
  button
    position absolute
    top 25px
    right 20px
    width 20px
    height 20px
    z-index 1
    svg
      display block
      width 100%
      height 100%
  .container
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    padding 50px 0 50px
    display flex
    flex-direction column
    justify-content space-between
    text-align center
    a
      font-size 40px
      &.home
        font-size 30px
      .label
        display block
        text-transform uppercase
        font-weight $light
        font-size 12px
</style>
