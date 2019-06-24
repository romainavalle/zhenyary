<template>
  <section class="about">
    <v-about ref="about"/>
    <v-footer ref="footer" />
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vFooter from '~/components/pageFooter.vue'
import vAbout from '~/components/about/about.vue'
import mobileMixin from '~/components/mobileMixin.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  computed: {
    ...mapState(['about', 'isFirstTime']),
    ...mapGetters(['isPhone'])
  },
  components: {
    vFooter,vAbout
  },
  mixins: [mobileMixin],
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.about.resize(this.w, this.h)
      this.$refs.footer.resize(this.w, this.h)
          if(this.isPhone) {
            this.resizeMobile()
          }
    },
    tick(scrollTop, ease) {
      this.$refs.footer.tick(scrollTop, ease)
      this.$refs.about.tick(scrollTop, ease)
      if(this.isPhone) {
        this.tickMobile(scrollTop, ease)
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if(this.isPhone) this.setupMobile()
      Emitter.emit('PAGE:MOUNTED')
      setTimeout(()=>{
        this.isShown = true
      }, this.isFirstTime ? 3000 : 400)
    })
  },
}
</script>

<style lang="stylus" scoped>
.about
  position relative
  width 100vw
</style>


