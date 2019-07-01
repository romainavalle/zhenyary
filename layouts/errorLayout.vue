<template>
  <main :class="{ 'no-touch': !isTouch}" class="error">
    <no-ssr>
      <v-error-bg ref="bg"/>
    </no-ssr>
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <span>Bring me back</span>
    <nuxt-link :to="{name: 'index'}">Bring me back</nuxt-link>
    <nuxt/>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'

import { mapGetters } from 'vuex';
import vTurn from '~/components/common/turn.vue'
export default {
  data() {
    return {
      isTouch: false,
      count: 0
    }
  },
  computed: {
    ...mapGetters(['isDevice'])
  },
  components: {
    'v-error-bg': ()=> import('~/components/common/errorBackround.vue')
  },
  methods:{
     resize(){
      this.w = ResizeHelper.width()
      this.h = ResizeHelper.height()
      this.$refs.bg.resize(w,h)
    },
  },
  beforeDestroy() {
  },
  mounted() {
    this.isTouch = this.isDevice
    Emitter.on('GLOBAL:RESIZE', this.resize.bind(this))
  }
}
</script>
<style lang="stylus" scoped>
main
  position relative
  height 100%
  width 100%
  background #000000
  a,span
    font-size 4vw
    text-align center
    color $black
    position absolute
    border-bottom 3px solid #000
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 1
    user-select none
  a
    opacity 0
    z-index 2
</style>


