<template>
  <footer>
    <button @click="setColor('red')" :class="{'active' : color === 'red'}" class="red">In red</button>
    <v-socials />
    <button @click="setColor('nude')" :class="{'active' : color === 'nude'}" class="nude">In nude</button>
  </footer>
</template>
<script>
import vSocials from '~/components/common/socials.vue'
import { mapState, mapActions } from 'vuex';
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
    ...mapActions(['setColor'])
  },
  mounted() {
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



</style>
