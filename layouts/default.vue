<template>
  <main :class="{ 'no-touch': !isTouch, 'device': isDevice, 'tablet': isTablet, 'mobile': isPhone}">

    <no-ssr>
      <v-progress ref="progress" v-if="!isDevice" />
    </no-ssr>
    <v-loader ref="loader"/>
    <no-ssr>
    <v-loader-top ref="loaderTop"/>
    </no-ssr>
    <no-ssr>
      <v-turn v-if="isDevice" />
    </no-ssr>
    <no-ssr>
      <v-header-mobile v-if="isPhone" />
    </no-ssr>
    <no-ssr>
      <v-nav-mobile v-if="isPhone" />
    </no-ssr>
    <v-nav ref="nav"/>
    <div class="scroll" ref="scroll">
      <nuxt :key="route.params.slug || route.name"  ref="page" class="page"/>
      <v-footer ref="footer"/>
    </div>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import vTurn from '~/components/common/turn.vue'
import vNavMobile from '~/components/common/navMobile.vue'
import vHeaderMobile from '~/components/common/headerMobile.vue'
import vLoader from '~/components/common/loader.vue'
import vLoaderTop from '~/components/common/loaderTop.vue'
import vFooter from '~/components/common/footer.vue'
import vNav from '~/components/common/nav.vue'
import vProgress from '~/components/common/progress.vue'
import loop from 'raf-loop'
import transform from 'dom-transform'
import anime from 'animejs'
import { mapState, mapGetters, mapActions } from 'vuex';
export default {

  data() {
    return {
      isTouch: false
    }
  },
  computed: {
    ...mapState(['route']),
    ...mapGetters(['isDevice', 'isPhone', 'isTablet'])
  },
  components: {
    vLoader, vLoaderTop, vTurn, vNav, vFooter,vProgress, vNavMobile, vHeaderMobile
  },
  methods:{
    ...mapActions(['setNavMobile']),
    resize(){
      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      const pageHeight = this.$refs.scroll.clientHeight
      if(this.$refs.page && this.$refs.page.$children[0])this.$refs.page.$children[0].resize && this.$refs.page.$children[0].resize(w, h, pageHeight)
      this.$refs.nav.resize(w, h, pageHeight)
      if(this.$refs.progress) this.$refs.progress.resize(w, h, pageHeight)
      this.$refs.loader.resize(w, h)
      this.$refs.loaderTop.resize(w, h)
      this.$refs.footer.resize(w, h, pageHeight)
      if(!this.isDevice)document.body.style.height = pageHeight + 'px'
    },
    tick(){
      ScrollHelper.tick()
      const scrollTop = this.isDevice ? ScrollHelper.scrollTop : ScrollHelper.ease
      const scrollTopEase = this.isDevice ? ScrollHelper.ease : ScrollHelper.easeSlow
      this.$refs.nav.tick(scrollTop)
      this.$refs.footer.tick(scrollTop)
      if(this.$refs.page.$children[0])this.$refs.page.$children[0].tick && this.$refs.page.$children[0].tick(scrollTop, scrollTopEase)
      if(!this.isDevice)transform(this.$refs.scroll, {translate3d: [0, -scrollTop, 0]})
      if(this.$refs.progress) this.$refs.progress.tick(scrollTop, scrollTopEase)
    },

    pageFadeOut(cb) {
      this.animation = anime({
        targets: this.$refs.scroll,
        //opacity: 0,
        duration: 700,
        //easing: 'easeInQuad',
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
          this.$refs.loaderTop.show()
      })
      this.$router.afterEach((to, from) => {
        ScrollHelper.goTo(0)
        this.setNavMobile(false)
      })
    },
    onPageMounted(){
      setTimeout(()=>{
        this.resize()
      }, 100)
      //this.pageFadeIn(0)
      this.$refs.loaderTop.hide()

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
    setTimeout(()=>{
      this.$refs.loader.hide()
      this.$refs.loaderTop.hide()
    },1000)
   if(!this.isTouch)  document.body.className = "no-touch"
  }
}
</script>
<style lang="stylus" scoped>
main
  position relative
  background $brown
  color $black
  .page
    //padding-bottom 150px
  &.no-touch
    height 100%
    .page
      padding-bottom 0
    .scroll
      position fixed
      top 0
      left 0
      right 0
      will-change transform
</style>

