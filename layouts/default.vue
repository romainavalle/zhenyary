<template>
  <main :class="{ 'no-touch': !isTouch, 'device': isDevice, 'mobile': isPhone}">
    <v-loader/>
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <div class="scroll" ref="scroll">
      <nuxt ref="page" :key="route.params.slug || route.name"/>
    </div>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import vTurn from '~/components/common/Turn.vue'
import vLoader from '~/components/common/Loader.vue'
import loop from 'raf-loop'
import transform from 'dom-transform'
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
    vLoader, vTurn
  },
  methods:{
     resize(){

      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      const pageHeight = this.$refs.scroll.clientHeight
      if(this.$refs.page && this.$refs.page.$children[0])this.$refs.page.$children[0].resize && this.$refs.page.$children[0].resize(w, h, pageHeight)
      if(!this.isDevice)document.body.style.height = pageHeight + 'px'
    },
    tick(){
      ScrollHelper.tick()
      if(this.$refs.page.$children[0])this.$refs.page.$children[0].tick && this.$refs.page.$children[0].tick(scrollTop,realScrollTop)
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
        this.pageFadeIn(300)
      })
    }
  },
  mounted() {
    Emitter.on('GLOBAL:RESIZE', this.resize.bind(this))
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
  background #fff
  &.no-touch .scroll
    position fixed
    top 0
    left 0
    right 0
    will-change transform
.white-layer
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background white
  pointer-events none
</style>

