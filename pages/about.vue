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
      this.resizeMobile()
    },
    tick(scrollTop, ease) {
      this.$refs.footer.tick(scrollTop, ease)
      this.$refs.about.tick(scrollTop, ease)
      this.tickMobile(scrollTop, ease)
    },
    show(){
      setTimeout(()=>{
        this.isShown = true
      },1000)
      this.$refs.about.show()
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.setupMobile()
      Emitter.emit('PAGE:MOUNTED')
      setTimeout(this.show.bind(this), this.isFirstTime ? 2500 : 600)
    })
  },
}
</script>

<style lang="stylus" scoped>
.about
  position relative
  width 100vw
</style>


