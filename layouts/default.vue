<template>
  <main :class="{ 'no-touch': !isTouch, 'device': isDevice, 'bigTablet': isDevice && w > 1024, 'smlTablet': isDevice && w <= 1024, 'mobile': isPhone}">
    <v-loader/>
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <v-nav ref="nav"/>
    <div class="scroll" ref="scroll">
      <nuxt :key="route.params.slug || route.name"  ref="page"/>
      <v-footer />
    </div>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import vTurn from '~/components/common/turn.vue'
import vLoader from '~/components/common/loader.vue'
import vFooter from '~/components/common/footer.vue'
import vNav from '~/components/common/nav.vue'
import loop from 'raf-loop'
import transform from 'dom-transform'
import anime from 'animejs'
import { mapState, mapGetters } from 'vuex';
export default {

  data() {
    return {
      isTouch: false
    }
  },
  computed: {
    ...mapState(['route']),
    ...mapGetters(['isDevice', 'isPhone', 'work'])
  },
  components: {
    vLoader, vTurn, vNav, vFooter
  },
  methods:{
     resize(){

      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      const pageHeight = this.$refs.scroll.clientHeight
      if(this.$refs.page && this.$refs.page.$children[0])this.$refs.page.$children[0].resize && this.$refs.page.$children[0].resize(w, h, pageHeight)
      this.$refs.nav.resize(w, h, pageHeight)
      if(!this.isDevice)document.body.style.height = pageHeight + 'px'
    },
    tick(){
      ScrollHelper.tick()
      const scrollTop = this.isDevice ? ScrollHelper.scrollTop : ScrollHelper.ease
      this.$refs.nav.tick(scrollTop)
      if(this.$refs.page.$children[0])this.$refs.page.$children[0].tick && this.$refs.page.$children[0].tick(scrollTop)
      if(!this.isDevice)transform(this.$refs.scroll, {translate3d: [0, -scrollTop, 0]})
    },

    pageFadeOut(cb) {
      this.animation = anime({
        targets: this.$refs.scroll,
        opacity: 0,
        duration: 800,
        easing: 'easeInQuad',
        complete: cb
      });
    },
    pageFadeIn(delay) {
      this.animation = anime({
        targets: this.$refs.scroll,
        opacity: 1,
        duration: 750,
        delay,
        easing: 'easeOutQuad'
      });
    },
    setRouterHooks () {
      this.$router.beforeEach((to, from, next) => {
          this.pageFadeOut(next)
          ScrollHelper.scrollTo(0)
      })
      this.$router.afterEach((to, from) => {
        ScrollHelper.goTo(0)
      })
    },
    onPageMounted(){
      this.resize()
      this.pageFadeIn(0)
    }
  },
  mounted() {
    Emitter.on('GLOBAL:RESIZE', this.resize.bind(this))
    Emitter.on('PAGE:MOUNTED', this.onPageMounted.bind(this))
    this.$nextTick(()=>{
      this.resize()
    })
    const engine = loop(this.tick.bind(this)).start()
    this.setRouterHooks()
    this.isTouch = this.isDevice
  }
}
</script>
<style lang="stylus" scoped>
main
  position relative
  height 100%
  background $brown
  color black
  &.no-touch .scroll
    position fixed
    top 0
    left 0
    right 0
    will-change transform
</style>

