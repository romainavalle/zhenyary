<template>
  <footer>
    <button @click="setColor('red')" :class="{'active' : color === 'red'}" class="red" ref="buttonRed">In red</button>
    <v-socials  ref="socials"/>
    <button @click="setColor('nude')" :class="{'active' : color === 'nude'}" class="nude" ref="buttonNude">In Light</button>
  </footer>
</template>
<script>
import vSocials from '~/components/common/socials.vue'
import { mapState, mapActions } from 'vuex';
import anime from 'animejs'
export default {
  data() {
    return {
    }
  },
  components:{
    vSocials
  },
  computed: {
    ...mapState(['color'])
  },
  methods: {
    ...mapActions(['setColor']),
    show() {
      this.$refs.socials.show(1000)
      anime({
        targets: [this.$refs.buttonRed, this.$refs.buttonNude],
        translateX: '0%',
        duration: 700,
        easing: 'easeOutQuad',
        delay: anime.stagger(900, {start:500})
      })
    }
  },
  mounted() {
    anime.set(
      this.$refs.buttonRed, {
        translateX: '-100%'
      }
    )
    anime.set(
      this.$refs.buttonNude, {
        translateX: '100%'
      }
    )
    this.$refs.socials.fastHide()
  }
}
</script>

<style lang="stylus" scoped>
footer
  position absolute
  width 100%
  display flex
  bottom 0
  justify-content space-between
  align-items  baseline
  button
    padding 0 4vw 3vh
    position relative
    text-transform uppercase
    transition color .3s ease-out-quad
    &:after
      content ''
      height 3px
      width 100%
      display block
      position absolute
      bottom 0
      left 0
      transition transform .7s ease-out-quad
    &.active.red:after,
    &.active.nude:after
      transform translateY(0)
    &.red
      color $black
      &.active
        color $white
      &:after
        background $white
        transform translateX(-100%)
    &.nude
      color $black
      &.active
        color $red
      &:after
        background $red
        transform translateX(100%)
  +below('l')
    justify-content center
    padding-bottom 4vh
    button
      display none
</style>
