<template>
  <section class="workflow">
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop) {
    }
  },
  mounted() {
    Emitter.emit('PAGE:MOUNTED')
  },
}
</script>

<style lang="stylus" scoped>
.workflow
  position relative
  width 100vw
</style>


