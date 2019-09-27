<template>
  <main :class="{ 'no-touch': !isTouch}" class="error">
    <no-ssr>
      <v-error-bg ref="bg"/>
    </no-ssr>
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <v-link :to="{name: 'index'}">Bring me back</v-link>
    <nuxt/>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'

import { mapGetters } from 'vuex';
import vTurn from '~/components/common/turn.vue'
import vLink from '~/components/common/link.vue'
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
    'v-error-bg': ()=> import('~/components/common/errorBackround.vue'), vLink, vTurn
  },
  methods:{
     resize(){
      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
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
  background #ff0400
  a,span
    font-size 4vw
    text-align center
    color $black
    position absolute
    font-family $schnyder
    font-weight $demi
    font-style italic
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 1
    user-select none
    line-height 1
  a
    z-index 2
    &:after
      content ''
      display block
      bottom 0
      width 100%
      height .2vw
      left 0
      background $black
      transition transform .5s ease-out-quad
</style>


