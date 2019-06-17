<template>
  <div class="background">
    <transition name="fade">
      <div class="bg" v-show="color === 'red'"></div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['color'])
  },
}
</script>

<style lang="stylus" scoped>
.background
  height 100vh
  left 0
  pointer-events none
  position absolute
  top 0
  width 100vw
.bg
  background $red
  bottom 0
  left 0
  position absolute
  right 0
  top 0
.fade-enter-active, .fade-leave-active
    transition opacity .5s
  .fade-enter, .fade-leave-to
    opacity 0
</style>
