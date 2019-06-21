<template>
  <div class="socials" :class="{'white': $route.name ==='workflow' && !isDevice}">
    <a v-for="(social,i) in datas.socials" :key="`social-${i}`" :href="social.link" v-text="social.label" target="_blank" rel="noopener" :class="color" ref="links"></a>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import anime from 'animejs'
export default {
  props: ['color'],
  computed: {
    ...mapState(['datas']),
    ...mapGetters(['isDevice'])
  },
  methods:{
    hide() {
      anime({
        targets: this.$refs.links,
        translateY: '100%',
        opacity: 0,
        duration: 500,
        easing: 'easeOutQuad'
      })
    },
    show(start = 0) {
      anime({
        targets: this.$refs.links,
        translateY: '0%',
        opacity: 1,
        duration: 500,
        easing: 'easeOutQuad',
        delay: anime.stagger(200, {start})
      })
    },
    fastHide() {
      anime.set(this.$refs.links,{
        translateY: '100%',
        opacity: 0
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.socials
  font-family $schnyder
  font-weight $demi
  font-size 21px
  display flex
  justify-content center
  &.white
    a
      color $white
  a
    color $black
    display block
    margin 0 50px
    &.nude
      color $nude
    &.red
      color $red
  +below('l')
    a
      margin 0 30px
.red &
  a
    color $white
</style>
