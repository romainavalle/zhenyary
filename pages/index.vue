<template>
  <section class="index">
    <v-home ref="home"/>
    <v-gems ref="gems"/>
    <v-works ref="works"/>
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vHome from '~/components/index/home.vue'
import vGems from '~/components/index/gems.vue'
import vWorks from '~/components/index/works.vue'
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  components: {
    vHome, vGems, vWorks
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      //this.$refs.home.resize(this.w, this.h)
      this.$refs.gems.resize(this.w, this.h)
      this.$refs.works.resize(this.w, this.h)
    },
    tick(scrollTop) {
      //this.$refs.home.tick(scrollTop)
      this.$refs.gems.tick(scrollTop)
      this.$refs.works.tick(scrollTop)
    }
  },
  mounted() {
    Emitter.emit('PAGE:MOUNTED')
  },
}
</script>

<style lang="stylus" scoped>
.index
  position relative
</style>

