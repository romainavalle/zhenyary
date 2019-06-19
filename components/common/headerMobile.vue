<template>
  <header>
    <nuxt-link :to="{name: 'index'}" >Z.</nuxt-link>
    <button @click="setNavMobile(true)">MENU</button>
  </header>
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
  },
  methods: {
    ...mapActions(['setNavMobile']),

  },
  watch: {
  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
header
  position fixed
  z-index 4
  width 100%
  padding 20px 5% 0
  display flex
  justify-content space-between
  align-items center
  button
  font-weight $light
    font-size 12px
  a
    font-size 24px
</style>
