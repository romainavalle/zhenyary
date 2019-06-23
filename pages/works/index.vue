<template>
  <section class="works">
      <v-screen v-for="(lines, index) in datas.works" :key="`screen-${index}`" :id="index" :lines="lines" ref="screens"/>
      <no-ssr>
        <v-work-img ref="img" :id="showId"></v-work-img>
      </no-ssr>
      <no-ssr>
        <v-work-over ref="work"></v-work-over>
      </no-ssr>
      <no-ssr>
        <button class="strong" ref="strong" @click="scrollTo" v-if="!isDevice">scroll down for all cases</button>
      </no-ssr>
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vWorkOver from '~/components/works/workOver.vue'
import vWorkImg from '~/components/works/workImg.vue'
import vScreen from '~/components/works/screen.vue'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import anime from 'animejs'
import transform from 'dom-transform'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0,
      screenId: 0,
      direction: 1,
      showId: -1,
      img: '',
      isScrolled: false
    }
  },
  computed: {
    ...mapState(['datas', 'isFirstTime']),
    ...mapGetters(['isDevice'])
  },
  components: {
    vWorkOver, vWorkImg, vScreen
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      if(this.isDevice)return
      this.screens.forEach((screen, i) => {
        transform(screen.el, {translateY:  i * this.h *.2})
      });
      this.$refs.img.resize(this.w, this.h)
      this.$refs.work.resize(this.w, this.h)
    },
    tick(scrollTop, easeScrollTop) {
      if(this.isDevice) return
      if(this.h) {
        transform(this.$el, {translateY: scrollTop - scrollTop/this.h * this.h *.2})
        this.screenId = (Math.floor(.5 + scrollTop/this.h))
      }
    },
    scrollTo(){
      if(this.isDevice) return
      this.hideScrollIndication()
      ScrollHelper.scrollTo(this.h)
    },
    onWorkEnter(id) {
      if(this.isDevice) return
      this.showId = id
      this.$refs.work.setWork(this.worksEl[this.showId], this.showId, this.screenId)
      this.$refs.screens[this.screenId].hideWorks()
    },
    onWorkLeave(screenId = -1) {
      if(this.isDevice) return
      this.showId = -1
      this.$refs.work.hide()
      this.$refs.screens[screenId === -1 ? this.screenId : screenId].showWorks()
    },
    hideScrollIndication() {
      if(this.isDevice) return
      if(this.isScrolled) return
      this.isScrolled = true
      anime({
          targets: this.$refs.strong,
          opacity: 0,
          duration: 400,
          easing: 'easeInQuad'
        })
    },
    showScreen(id){
      if(this.isDevice) return
      if(this.isAnimating)return
      this.isAnimating = true
      this.$refs.screens[id].showLines(this.direction)
    },
    hideScreen(id){
      if(this.isDevice) return
      if(this.isAnimating)return

      const start = this.showId === -1 ? 0 : 200
      if(this.showId !== -1)this.onWorkLeave(id)
      this.isAnimating = true
      this.$refs.screens[id].hideLines(this.direction, start)
    },
    onScreenHideComplete(){
      this.isAnimating = false
      this.showScreen(this.screenId)
    },
    onScreenShowComplete(id){
      this.isAnimating = false
      if(id !== this.screenId) this.hideScreen(id)
    }

  },
  watch: {
    screenId(val, old) {

      this.direction = val - old
      this.hideScreen(old)
      this.hideScrollIndication()
    }
  },
  beforeDestroy() {
    if(!this.isDevice) {
      Emitter.removeListener('WORK:MOUSELEAVE', this._onWorkLeave)
      Emitter.removeListener('WORK:MOUSEENTER', this._onWorkEnter)
      Emitter.removeListener('SCREEN:HIDECOMPLETE', this._onScreenHideComplete)
      Emitter.removeListener('SCREEN:SHOWCOMPLETE', this._onScreenShowComplete)
    }
  },
  mounted() {
    if(this.isDevice){
      this.$nextTick(()=>{
        Emitter.emit('PAGE:MOUNTED')
      })
    }else{
      this.worksEl = [].slice.call(this.$el.querySelectorAll('.screen .work-link'))
      const lines = [].slice.call(this.$el.querySelectorAll('.line'))
      this.screens = []
      const screens = [].slice.call(this.$el.querySelectorAll('.screen'))
      screens.forEach(el => {
        const lines = [].slice.call(el.querySelectorAll('.line'))
        el.style.pointerEvents = 'none'
        this.screens.push({el, lines})
      });
      this._onWorkLeave = this.onWorkLeave.bind(this)
      this._onWorkEnter = this.onWorkEnter.bind(this)
      this._onScreenHideComplete = this.onScreenHideComplete.bind(this)
      this._onScreenShowComplete = this.onScreenShowComplete.bind(this)
      if(!this.isDevice) {
        Emitter.on('WORK:MOUSEENTER', this._onWorkEnter)
        Emitter.on('WORK:MOUSELEAVE', this._onWorkLeave)
      }
      Emitter.on('SCREEN:HIDECOMPLETE', this._onScreenHideComplete)
      Emitter.on('SCREEN:SHOWCOMPLETE', this._onScreenShowComplete)
      this.direction = 1
      this.$nextTick(()=>{
        Emitter.emit('PAGE:MOUNTED')
        setTimeout(this.showScreen.bind(this, this.screenId), this.isFirstTime ? 3000 : 450)
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.works
  background $pink
  position relative
  width 100vw
  height 300vh
  font-family $schnyder
  font-weight $demi
  .strong
    position absolute
    top 95vh
    left 50%
    text-align center
    transform translateX(-50%)
  +below('l')
    background $pink
    position relative
    width 100vw
    height auto
    padding 10vh 0 15vh
</style>




