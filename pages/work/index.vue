<template>
  <section class="works">
    <div class="container" ref="container">
      <v-screen v-for="(lines, index) in datas.works" :key="`screen-${index}`" :id="index" :lines="lines" :previousLines="getWorksBefore(index)" ref="screens"/>
    </div>
      <no-ssr>
        <v-work-img ref="img" :id="showId" v-if="!isDevice"></v-work-img>
      </no-ssr>
      <no-ssr>
        <v-work-over ref="work" v-if="!isDevice"></v-work-over>
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
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0,
      direction: 1,
      showId: -1,
      img: '',
      isScrolled: false
    }
  },
  computed: {
    ...mapState(['datas', 'isFirstTime', 'workScreenId']),
    ...mapGetters(['isDevice'])
  },
  components: {
    vWorkOver, vWorkImg, vScreen
  },
  methods: {
    ...mapActions(['setWorkScreenId']),
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      if(this.isDevice)return
      if(this.$refs.img)this.$refs.img.resize(this.w, this.h)
      if(this.$refs.work)this.$refs.work.resize(this.w, this.h)
    },
    tick(scrollTop, easeScrollTop) {
      if(this.isDevice) return
      //transform(this.$el, {translate3d: [0, scrollTop,0]})
    },
    getWorksBefore(id) {
      let count = 0
      for (let index = 0; index < id; index++) {
        const screen = this.datas.works[index]
        screen.forEach(line=>{
          count += line.length;
        })
      }
      return count
    },
    scrollTo(){
      this.hideScrollIndication()
      if(this.isDevice) {
        ScrollHelper.scrollTo(this.h)
      }else{
        this.setWorkScreenId(this.workScreenId + 1)
      }
    },
    onWorkEnter(id) {
      if(this.isDevice) return
      this.showId = id

      if(this.$refs.work)this.$refs.work.setWork(this.worksEl[this.showId], this.showId, this.workScreenId)
      this.$refs.screens[this.workScreenId].hideWorks()
    },
    onWorkLeave(screenId = -1) {
      if(this.isDevice) return
      if(this.$refs.work)this.$refs.work.hide()
      this.showId = -1
      this.$refs.screens[screenId === -1 ? this.workScreenId : screenId].showWorks()
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

      const start = this.showId === -1 ? 0 : 300
      if(this.showId !== -1)this.onWorkLeave(id)
      this.isAnimating = true
      this.$refs.screens[id].hideLines(this.direction, start)
    },
    onScreenHideComplete(){
      this.isAnimating = false
      this.showScreen(this.workScreenId)
    },
    onScreenShowComplete(id){
      this.isAnimating = false
      if(id !== this.workScreenId) this.hideScreen(id)
    },
    onWheel(e) {
      let id = this.workScreenId
      if(e.deltaY > 0){
        id++
      }else{
        id--
      }
      if(id<0)return
      if(id>this.$refs.screens.length-1)return
      this.setWorkScreenId(id)
      this.removeWheel()
      this.wheelTimer = setTimeout(this.addWheel.bind(this), 1200)
    },
    addWheel() {
      this.$el.addEventListener('wheel', this._onWheel, {passive: true})
    },
    removeWheel() {
      this.$el.removeEventListener('wheel', this._onWheel)
    }
  },
  watch: {
    workScreenId(val, old) {
      this.direction = val - old
      if(this.$refs.img)this.$refs.img.setScreenId(val)
      this.hideScreen(old)
      this.hideScrollIndication()
    }
  },
  beforeDestroy() {
    if(!this.isDevice) {
      this.removeWheel()
      clearTimeout(this.wheelTimer)
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
        const array = [].slice.call(this.$el.querySelectorAll('.work-link'))
        anime.set(array, {opacity: 0, translateY: 50})
        setTimeout(() => {
        anime({targets: array, opacity: 1, translateY: 0, duration: 500, easing: 'easeOutQuad', delay: anime.stagger(100, {start: 500, easing: 'easeInQuad'})})

        }, this.isFirstTime ? 1500 : 450)
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
      this._onWheel = this.onWheel.bind(this)
      this.addWheel()
      this.$nextTick(()=>{
        Emitter.emit('PAGE:MOUNTED')
        //setTimeout(this.showScreen.bind(this, this.workScreenId), this.isFirstTime ? 2500 : 450)
        setTimeout(this.showScreen.bind(this, this.workScreenId), this.isFirstTime ? 1500 : 450)
        if(!this.isDevice && this.workScreenId){
          ScrollHelper.scrollTo(window.innerHeight * this.workScreenId)
          this.hideScrollIndication()
        }
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
  height 100vh
  font-family $schnyder
  font-weight $demi
  .device &
    position relative
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




