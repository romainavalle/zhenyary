<template>
  <div class="video" >
    <button @click="setVideo(false)" ref="close" aria-label="close"><v-svg-close /></button>
    <video src="https://preprod.zhenyary.com/videos/video.mp4" v-bind="controls" ref="video" type='video/mp4' preload="auto"></video>
    <no-ssr>
      <div class="circle" ref="circle" v-if="!isDevice">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"  ref="circle-inner">
          <circle cx="50" cy="50" r="49"/>
        </svg>
      </div>
    </no-ssr>
    <no-ssr>
      <div class="icons" ref="icons" v-if="!isDevice">
        <transition name="cursor">
          <div class="play" v-if="!isPlaying && !isCloseAttracted" @click="play">
            <v-svg-play/>
          </div>
        </transition>
        <transition name="cursor">
          <div class="pause" v-if="isPlaying && !isCloseAttracted" @click="pause">
            <v-svg-pause/>
          </div>
        </transition>
      </div>
    </no-ssr>
  </div>
</template>

<script>

import Emitter from '~/assets/js/events/EventsEmitter'
import { easeInOutQuint } from '~/assets/js/utils/easings'
import MouseHelper from '~/assets/js/utils/MouseHelper'
import anime from'animejs'
import { mapState, mapActions, mapGetters } from 'vuex';
import transform from 'dom-transform'
import vSvgClose from "~/assets/svgs/closeVideo.svg?inline";
import vSvgPlay from "~/assets/svgs/play.svg?inline";
import vSvgPause from "~/assets/svgs/pause.svg?inline";
export default {
  data() {
    return {
      isPlaying: true,
      isCloseAttracted: false
    }
  },
  components: {
    vSvgClose, vSvgPlay, vSvgPause
  },
  computed: {
    ...mapState(['showVideo']),
    ...mapGetters(['isDevice', 'isSafari']),
    controls() {
      return this.isDevice ? {'controls': 'controls', 'playsinline': 'false'} : { 'playsinline': 'playsinline'}
    }
  },
  methods: {
    ...mapActions(['setVideo']),
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    play() {
      this.$refs.video.play()
      this.isPlaying = true
    },
    pause() {
      this.$refs.video.pause()
      this.isPlaying = false
    },
    tick() {
      if(!this.showVideo) return
      const x = MouseHelper.x
      const y = MouseHelper.y
      const easeX = MouseHelper.easeX
      const easeY = MouseHelper.easeY
      transform(this.$refs.icons, {translate3d: [x,y,0]})
      transform(this.$refs.circle, {translate3d: [easeX,easeY,0]})
      const posX = this.w-(20+15)
      const posY = (25+15)
      const dist = this.distance(x,y,posX,posY)
      let pourc = 0
      if(dist < 200) {
        pourc = easeInOutQuint(1 - (dist / 200))
        if(pourc > 1) pourc = 1
      }
      if(pourc > .7) {
        if(!this.isCloseAttracted) this.isCloseAttracted = true
      }else{
        if(this.isCloseAttracted) this.isCloseAttracted = false
      }
      transform(this.$refs.close, {translate3d: [  (x-posX) * pourc , (y-posY) * pourc,0]})
    },
    distance(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    },
    show() {
      this.$el.style.visibility = 'visible'
      this.$refs.video.addEventListener('ended',this._onEnd)
      window.addEventListener('keydown',this._onKeyPress)
      anime({
        targets:this.$el,
        opacity: 1,
        duration: 1000,
        easing: 'easeOutQuad',
        complete: ()=>{
          if(!this.isSafari) this.play()
        }
      })
    },
    hide() {
      this.$refs.video.removeEventListener('ended',this._onEnd)
      window.removeEventListener('keydown',this._onKeyPress)
      this.pause()
      anime({
        targets:this.$el,
        opacity: 0,
        duration: 700,
        easing: 'easeInQuad',
        complete: ()=>{
          this.$refs.video.currentTime = 0
          this.$el.style.visibility = 'hidden'
        }
      })
    },
    onEnd() {
      setTimeout(()=>{
        this.setVideo(false)
      }, 1000)
    },
    onKeyPress(e) {
      if(e.code === 'Escape') this.setVideo(false)
    }

  },
  watch: {
    showVideo(val) {
      if(val) {
        this.show()
      }else{
        this.hide()
      }
    },
    isCloseAttracted() {
      anime({
        targets: this.$refs.circle.querySelector('svg'),
        scaleX: [1,1.1,1],
        scaleY: [1,1.1,1],
        translateX: '-50%',
        translateY: '-50%',
        duration: 100,
        easing: 'easeInOutCubic'
      })
    }
  },
  beforeDestroy() {
    this.$refs.video.removeEventListener('ended',this._onEnd)
    window.removeEventListener('keydown',this._onKeyPress)
    if(this.isSafari) Emitter.removeListener('VIDEO_BUTTON_CLICKED', this._play)
  },
  mounted() {
    console.log(this.controls);

    this._onEnd = this.onEnd.bind(this)
    this._onKeyPress = this.onKeyPress.bind(this)
    this._play = this.play.bind('this')
    if(this.isSafari) Emitter.on('VIDEO_BUTTON_CLICKED', this._play)
    this.$el.style.visibility = 'hidden'
    anime.set(this.$el, {opacity: 0})
    if(!this.isDevice) {
      this.$nextTick(()=>{
        anime.set( this.$refs.circle.querySelector('svg'),{
          scaleX: 1,
          scaleY: 1,
          translateX: '-50%',
          translateY: '-50%'
        })
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.video
  background $black
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 10
  cursor none
  button
    position absolute
    width 30px
    height 30px
    right 20px
    top 25px
    z-index 1
    cursor none
    svg
      display block
      width 100%
      height 100%
      stroke $white

  video
    position absolute
    width 100%
    height auto
    transform translate(-50%, -50%)
    left 50%
    top 50%
.circle, .icons
  position fixed
.circle
  width 100px
  height 100px
  svg
    display block
    width 100%
    height 100%
    fill none
    stroke $white
    stroke-width 2px
    transform translate(-50%, -50%)
.icons
  width 20px
  height 25px
  >div
    width 100%
    height 100%
    position absolute
    top 0
    left 0
  svg
    display block
    width 100%
    height 100%
    transform translate(-50%, -50%)
.cursor-enter-active
  transition opacity .5s ease-out-quad, transform .5s ease-out-quad
.cursor-leave-active
  transition opacity .2s ease-in-quad, transform .2s ease-in-quad
.cursor-enter, .cursor-leave-to
  opacity 0
  transform scale(.5, .5)

</style>
