<template>
  <section class="works">
      <div class="screen">
        <div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(0)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(0).title" class="underline" @mouseover.native="onMouseEnter(0)"></nuxt-link>
            </div>
            <div class="work">
              <span class="number wide" v-text="getId(1)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(1).title" class="italic" @mouseover.native="onMouseEnter(1)"></nuxt-link>
            </div>
          </div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(2)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(2).title" @mouseover.native="onMouseEnter(2)"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(3)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(3).title" @mouseover.native="onMouseEnter(3)"></nuxt-link>
            </div>
          </div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(4)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(4).title" class="italic" @mouseover.native="onMouseEnter(4)"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(5)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(5).title" @mouseover.native="onMouseEnter(5)"></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="screen">
        <div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(6)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(6).title" class="italic" @mouseover.native="onMouseEnter(6)"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(7)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(7).title" @mouseover.native="onMouseEnter(7)"></nuxt-link>
            </div>
          </div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(8)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(8).title" class="underline" @mouseover.native="onMouseEnter(8)"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(9)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(9).title" class="italic" @mouseover.native="onMouseEnter(9)"></nuxt-link>
            </div>
          </div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(10)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(10).title" class="italic" @mouseover.native="onMouseEnter(10)"></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="screen">
        <div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(11)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(11).title" class="underline" @mouseover.native="onMouseEnter(11)"></nuxt-link>
            </div>
            <div class="work">
              <span class="number wide" v-text="getId(12)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(12).title" class="italic" @mouseover.native="onMouseEnter(12)"></nuxt-link>
            </div>
          </div>
          <div class="line">
            <div class="work">
              <span class="number" v-text="getId(13)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(13).title" @mouseover.native="onMouseEnter(13)"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(14)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(14).title" @mouseover.native="onMouseEnter(14)"></nuxt-link>
            </div>
          </div>
        </div>
      </div>
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
    ...mapState(['works']),
    ...mapGetters(['isDevice'])
  },
  components: {
    vWorkOver, vWorkImg
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
      transform(this.$el, {translateY: easeScrollTop - easeScrollTop/this.h * this.h *.2})
      this.screenId = (Math.floor(.5 + scrollTop/this.h))
      if(scrollTop > 10 && !this.isScrolled) this.hideScrollIndication()
    },
    scrollTo(){
      if(this.isDevice) return
      this.hideScrollIndication()
      ScrollHelper.scrollTo(this.h)
    },
    onMouseEnter(id) {
      if(this.isDevice) return
      this.showId = id
      this.$refs.work.setWork(this.worksEl[this.showId], id)
      if(this.worksOpacity)this.worksOpacity.pause()
      this.worksOpacity = anime({
        targets: this.worksEl,
        opacity: .3,
        duration: 500,
        easing: 'easeOutQuad'
      })
      this.$refs.work.show()

    },
    onMouseLeave() {
      if(this.isDevice) return
      this.showId = -1
      this.$refs.work.hide()
      if(this.worksOpacity)this.worksOpacity.pause()
      this.worksOpacity = anime({
        targets: this.worksEl,
        opacity: 1,
        duration: 300,
        easing: 'easeInQuad'
      })
    },
    getId(id) {
      const thisId = id + 1
      return thisId < 10 ? `0${thisId}` : thisId
    },
    getWork(id) {
      return this.works[id]
    },
    hideScrollIndication() {
      if(this.isDevice) return
      this.isScrolled = true
      anime({
          targets: this.$refs.strong,
          opacity: 0,
          duration: 400,
          easing: 'easeInQuad'
        })
    },
    showLines(id = 0) {
      if(this.isDevice) return
      if(this.isAnimating)return
      const screen = this.screens[id]
      this.isAnimating = true
      anime({
        targets: screen.lines,
        translateY: [this.direction === 1 ? 200 : -200, 0],
        scaleY: 1,
        transformOrigin:  [this.direction === 1 ? '0 0' : '0 100%','0 50%'],
        duration: 500,
        opacity: 1,
        easing: 'easeOutQuad',
        delay: anime.stagger(200, {from: this.direction === 1 ? 'first' : 'last'}),
        complete: ()=>{
          screen.el.style.pointerEvents = 'auto'
          this.isAnimating = false
          if(id !== this.screenId) this.hideLines(id)
        }
      })
    },
    hideLines(id) {
      if(this.isDevice) return
      if(this.isAnimating)return
      let start = 0
      if(this.showId !== 1) {
        this.onMouseLeave()
        start = 200
      }
      const screen = this.screens[id]
      screen.el.style.pointerEvents = 'none'
      this.isAnimating = true
      anime({
        targets: screen.lines,
        translateY: this.direction === 1 ? -200 : 200,
        scaleY: 1.5,
        transformOrigin: this.direction === 1 ? '0 100%' : '0 0',
        duration: 300,
        opacity: 0,
        easing: 'easeInQuad',
        delay: anime.stagger(100, {start, from: this.direction === 1 ? 'first' : 'last'}),
        complete: ()=>{
          this.isAnimating = false
          this.showLines(this.screenId)
        }
      })
    }
  },
  watch: {
    screenId(val, old) {
      this.direction = val - old
      this.hideLines(old)
    }
  },
  beforeDestroy() {
    if(!this.isDevice)Emitter.removeListener('WORKS:MOUSELEAVE', this._onMouseLeave)
  },
  mounted() {
    if(this.isDevice){
      this.$nextTick(()=>{
        Emitter.emit('PAGE:MOUNTED')
      })
    }else{
      this.worksEl = [].slice.call(this.$el.querySelectorAll('.screen .work'))
      const lines = [].slice.call(this.$el.querySelectorAll('.line'))
      this.screens = []
      const screens = [].slice.call(this.$el.querySelectorAll('.screen'))
      screens.forEach(el => {
        const lines = [].slice.call(el.querySelectorAll('.line'))
        el.style.pointerEvents = 'none'
        this.screens.push({el, lines})
      });
      this._onMouseLeave = this.onMouseLeave.bind(this)
      Emitter.on('WORKS:MOUSELEAVE', this._onMouseLeave)
      anime.set(lines, {
        translateY: 200,
        scaleY: 1.5,
        transformOrigin: '0 0',
        opacity: 0
      })
      this.$nextTick(()=>{
        Emitter.emit('PAGE:MOUNTED')
        this.showLines(0)
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

  .screen
    width 100%
    height 100vh
    position absolute
    top 0
    left 0
    display flex
    align-items center
  .line
    width 100vw
    padding 1vh 6vw
    display flex
    justify-content space-between
    align-items baseline
    overflow hidden
    & + .line
      margin-top 5vh
  .number
    font-size 1vw
    margin-right 2vw
    line-height 2
    display block
    &.wide
      border-bottom 0.2vw solid $red
      width 15vw
      text-align center
      margin-right 4vw
  .work
    display flex
    align-items center
    font-size 8.8vw
    line-height 1
    color $red
    a
      display flex
      align-items baseline
  .underline
    border-bottom 0.2vw solid $red
  +below('l')
    background $pink
    position relative
    width 100vw
    height auto
    padding 10vh 0
    .screen
      width 100%
      height auto
      position relative
      top auto
      left auto
      display block
      padding 0 12vw
      margin-left -4vw
    .line
      padding 0
      display block
      width auto
      &.line
        margin 0
      .work
        margin-top 3vh
        font-size 10vw
        display block
        text-align center
        .number,
        a
          display inline
        .number
          vertical-align bottom
    .number
      font-size 14px
    .number.wide
      border-bottom none
      width auto
      text-align left
      margin-right 2vw

  +below('s')
    padding 10vh 0
    .screen
      margin-left 0
    .line .work
      display flex
      align-items baseline
      text-align left
      .number
        display block
        margin-right 4vw
</style>

<style lang="stylus" >
section.works .work a
  span
    font-size 3.6vw
  span.slash
    font-size 7vw
    align-self flex-end
</style>



