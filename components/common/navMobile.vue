<template>
  <nav class="navMobile">
    <button @click="setNavMobile(false)" ref="close"><v-svg-close /></button>
    <div class="container" ref="container">
      <nuxt-link :to="{name: 'about'}" @click.native="doClick('about')"><span class="title">Some things</span><span class="label">about me</span></nuxt-link>
      <nuxt-link :to="{name: 'works'}" @click.native="doClick('works')"><span class="title">Work</span><span class="label">some cases</span></nuxt-link>
      <nuxt-link :to="{name: 'workflow'}" @click.native="doClick('o')"><span class="title">Workflow</span><span class="label">my life — my rules</span></nuxt-link>
      <nuxt-link :to="{name: 'contact'}" @click.native="doClick('contact')"><span class="title">Contact me</span><span class="label">For any collaborations</span></nuxt-link>
      <nuxt-link :to="{name: 'index'}"  class="home" @click.native="doClick('index')">Go Home</nuxt-link>
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
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    doClick(id, $ev) {
      if(this.$route.name === id)this.setNavMobile(false)
    },
    show() {
      this.$el.style.display = 'block'
      anime.set(this.$refs.container,{translateY: '0%'})
      anime.set(this.$refs.close,{translateY: 0})
      //anime.set(this.letters,{translateY: ()=>{return anime.random(-30,30)}})

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
      anime({
        targets: this.$refs.close,
        opacity: 0,
        duration: 450,
        translateY: this.h,
        easing: 'easeInQuad',
      })
      anime({
        targets: this.$refs.container,
        translateY: '75%',
        duration: 450,
        easing: 'easeInQuad',
      })
      anime({
        targets: this.$el,
        translateY: '-100%',
        duration: 450,
        easing: 'easeInQuad',
        complete: ()=>{
          this.$el.style.display = 'none'
        }
      })
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
    /*const titles = [].slice.call(this.$el.querySelectorAll('.title'))
    titles.forEach(title => {
      title.innerHTML = title.innerText.split('').map(function(letter) {
        return '<span class="letter">' + (letter === ' ' ? '&nbsp;' : letter )+ '</span>'
      }).join(' ');
    });*/
    this.letters = [].slice.call(this.$el.querySelectorAll('.letter'))
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
      fill $black
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

<style lang="stylus" >
.navMobile
  a
    .title
      display flex
      justify-content center
    .letter
      display block
</style>
