<template>
  <div class="socials">
    <a v-for="(social,i) in datas.socials" :key="`social-${i}`" :href="social.link" v-text="social.label" target="_blank" rel="noopener" :class="color" ref="links"></a>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import anime from 'animejs'
export default {
  props: ['color'],
  computed: {
    ...mapState(['datas'])
  },
  methods:{
    hide() {
      anime.set(this.$refs.links,{
        translateY: '100%',
        opacity: 0
      })
    },
    show() {
      anime({
        targets: this.$refs.links,
        translateY: '0%',
        opacity: 1,
        duration: 500,
        easing: 'easeOutQuad',
        delay: anime.stagger(200, {start: 1000})
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.socials
  font-family $schnyder
  font-size 21px
  display flex
  justify-content center
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
      margin 0 20px
.red &
  a
    color $white
</style>
