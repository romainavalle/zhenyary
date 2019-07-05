<template>
  <section class="index">
    <v-home ref="home" />
    <v-gems ref="gems" />
    <v-works ref="works" />
    <v-works-link ref="link" />
    <v-thanks ref="thanks" />
    <v-contact ref="contact" />
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vHome from '~/components/index/home.vue'
import vGems from '~/components/index/gems.vue'
import vWorks from '~/components/index/works.vue'
import vWorksLink from '~/components/index/worksLink.vue'
import vContact from '~/components/index/contact.vue'
import vThanks from '~/components/index/thanks.vue'
import mobileMixin from '~/components/mobileMixin.vue'
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0,
      isShown: false
    }
  },
  components: {
    vHome, vGems, vWorks, vWorksLink, vContact, vThanks
  },
  mixins: [mobileMixin],
  computed: {
    ...mapState(['isFirstTime']),
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.home.resize(this.w, this.h)
      this.$refs.gems.resize(this.w, this.h)
      this.$refs.works.resize(this.w, this.h)
      this.$refs.link.resize(this.w, this.h)
      this.$refs.contact.resize(this.w, this.h)
      this.$refs.thanks.resize(this.w, this.h)
      this.resizeMobile()
    },
    tick(scrollTop, ease) {
      this.$refs.home.tick(scrollTop)
      this.$refs.gems.tick(scrollTop)
      this.$refs.works.tick(scrollTop, ease)
      this.$refs.link.tick(scrollTop, ease)
      this.$refs.contact.tick(scrollTop)
      this.$refs.thanks.tick(scrollTop)
      this.tickMobile(scrollTop)
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.setupMobile()
      this.isShown = true
      Emitter.emit('PAGE:MOUNTED')
      setTimeout(() => {
        this.$refs.home.show()
      }, this.isFirstTime ? 2500 : 450)
    })
  }
}
</script>

<style lang="stylus" scoped>
.index
  position relative
</style>

