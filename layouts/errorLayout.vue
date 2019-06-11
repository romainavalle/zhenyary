<template>
  <main :class="{ 'no-touch': !isTouch}" class="error">
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <nuxt/>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import { mapGetters } from 'vuex';
import vTurn from '~/components/common/Turn.vue'
export default {
  data() {
    return {
      isTouch: false,
    }
  },
  computed: {
    ...mapGetters(['isDevice'])
  },
  components: {
  },
  methods:{
     resize(){
      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
    },
    tick(){
    },



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
  background #000000
</style>

