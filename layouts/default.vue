<template>
  <main :class="{ 'no-touch': !isTouch, 'device': isDevice, 'tablet': isTablet, 'mobile': isPhone, 'safari': isSafari}">

    <no-ssr>
      <v-progress ref="progress" v-if="!isDevice" />
    </no-ssr>
    <v-loader ref="loader" v-if="isFirstTime"/>
    <v-loader-top ref="loaderTop"/>
    <no-ssr>
      <v-turn v-if="isDevice" />
    </no-ssr>
    <no-ssr>
      <v-header-mobile v-if="isPhone" />
    </no-ssr>
    <no-ssr>
      <v-nav-mobile v-if="isPhone" ref="navMobile"/>
    </no-ssr>
    <v-video-player ref="video"/>
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
import MouseHelper from '~/assets/js/utils/MouseHelper'
import vTurn from '~/components/common/turn.vue'
import vNavMobile from '~/components/common/navMobile.vue'
import vHeaderMobile from '~/components/common/headerMobile.vue'
import vLoader from '~/components/common/loader.vue'
import vLoaderTop from '~/components/common/loaderTop.vue'
import vFooter from '~/components/common/footer.vue'
import vVideoPlayer from '~/components/common/videoPlayer.vue'
import vNav from '~/components/common/nav.vue'
import vProgress from '~/components/common/progress.vue'
import loop from 'raf-loop'
import transform from 'dom-transform'
import anime from 'animejs'
import { mapState, mapGetters, mapActions } from 'vuex';
if(process.browser) {
  var classie = require('desandro-classie')
}
export default {

  data() {
    return {
      isTouch: false,
      colorId: 1,
      canScroll: false
    }
  },
  computed: {
    ...mapState(['route', 'isFirstTime']),
    ...mapGetters(['isDevice', 'isPhone', 'isTablet', 'isSafari'])
  },
  components: {
    vLoader, vLoaderTop, vTurn, vNav, vFooter,vProgress, vNavMobile, vHeaderMobile, vVideoPlayer
  },
  methods:{
    ...mapActions(['setNavMobile']),
    resize(){
      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      const pageHeight = this.$route.name === 'works' ? h * 3 :  this.$refs.scroll.clientHeight
      if(this.$refs.page && this.$refs.page.$children[0])this.$refs.page.$children[0].resize && this.$refs.page.$children[0].resize(w, h, pageHeight)
      this.$refs.nav.resize(w, h, pageHeight)
      if(this.$refs.progress) this.$refs.progress.resize(w, h, pageHeight)
      if(this.$refs.navMobile) this.$refs.navMobile.resize(w, h, pageHeight)
      if(this.$refs.loader)this.$refs.loader.resize(w, h)
      this.$refs.loaderTop.resize(w, h)
      this.$refs.footer.resize(w, h, pageHeight)
      if(this.$refs.video)this.$refs.video.resize(w, h)
      if(!this.isDevice && this.canScroll)document.body.style.height = pageHeight + 'px'
    },
    tick(){
      ScrollHelper.tick()
      const scrollTop = this.isDevice ? ScrollHelper.scrollTop : ScrollHelper.ease
      const scrollTopEase = this.isDevice ? ScrollHelper.ease : ScrollHelper.easeSlow

      this.$refs.nav.tick(scrollTop)
      this.$refs.footer.tick(scrollTop)
      if(this.$refs.loader)this.$refs.loader.tick()
      if(this.$refs.page.$children[0])this.$refs.page.$children[0].tick && this.$refs.page.$children[0].tick(scrollTop, scrollTopEase)
      if(this.$refs.progress) this.$refs.progress.tick(scrollTop, scrollTopEase)
      if(!this.isDevice) {
        MouseHelper.tick()
        if(this.$route.name !== 'work') {
          transform(this.$refs.scroll, {translate3d: [0, -scrollTop, 0]})
        } else{
          transform(this.$refs.scroll, {translateY: 0})
        }
        if(this.$refs.video)this.$refs.video.tick()
      }
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
        const routes = this.$router.options.routes.map((r)=>r.name)
        routes.forEach(r => {
          classie.removeClass(document.body, r)
        });
        classie.addClass(document.body, to.name)
        this.setNavMobile(false)
      })
    },
    onPageMounted(){
      setTimeout(()=>{
        this.resize()
        this.checkImg()
      }, 100)
      //this.pageFadeIn(0)

      if(!this.isFirstTime)this.$refs.loaderTop.hide()

    },
    onLoaded() {
      this.imageCount++
      if(this.imageCount %3 === 0 || this.imageCount === this.imgs.length) this.resize()
    },
    checkImg() {
      const imgs = [].slice.call(this.$el.querySelectorAll('img'))
      this.imgs = []
      this.imageCount = 0
      imgs.forEach(img => {
        if(img.dataset.src){
          img.addEventListener('load', this.onLoaded.bind(this))
          img.src = this.getSrcSet(img.dataset.src, classie.has(img, 'js-fs-on-mobile'))
          this.imgs.push(img)
        }
      });
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
      this.canScroll = true
      this.resize()
    },2000)
   if(!this.isTouch) classie.addClass(document.querySelector("html"), "no-touch")
    classie.addClass(document.body, `color${this.colorId}`)
    classie.addClass(document.body, this.$route.name)


   window.addEventListener('mousedown', ()=>{
     classie.removeClass(document.body, `color${this.colorId}`)
     this.colorId++
     if(this.colorId===5)this.colorId = 1
     classie.addClass(document.body, `color${this.colorId}`)
   })
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

