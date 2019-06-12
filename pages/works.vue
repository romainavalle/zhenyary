<template>
  <section class="works">
      <div class="screen">
        <div>
          <v-line id="0">
            <div class="work">
              <span class="number" v-text="getId(0)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(0).title" class="underline"></nuxt-link>
            </div>
            <div class="work">
              <span class="number wide" v-text="getId(1)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(1).title" class="italic"></nuxt-link>
            </div>
          </v-line>
          <v-line id="1">
            <div class="work">
              <span class="number" v-text="getId(2)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(2).title"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(3)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(3).title"></nuxt-link>
            </div>
          </v-line>
          <v-line id="3">
            <div class="work">
              <span class="number" v-text="getId(4)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(4).title" class="italic"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(5)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(5).title"></nuxt-link>
            </div>
          </v-line>
        </div>
      </div>
      <div class="screen">
        <div>
          <v-line id="4">
            <div class="work">
              <span class="number" v-text="getId(6)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(6).title" class="italic"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(7)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(7).title"></nuxt-link>
            </div>
          </v-line>
          <v-line id="5">
            <div class="work">
              <span class="number" v-text="getId(8)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(8).title" class="underline"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(9)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(9).title" class="italic"></nuxt-link>
            </div>
          </v-line>
          <v-line id="6">
            <div class="work">
              <span class="number" v-text="getId(10)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(10).title" class="italic"></nuxt-link>
            </div>
          </v-line>
        </div>
      </div>
      <div class="screen">
        <div>
          <v-line id="7">
            <div class="work">
              <span class="number" v-text="getId(11)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(11).title" class="underline"></nuxt-link>
            </div>
            <div class="work">
              <span class="number wide" v-text="getId(12)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(12).title" class="italic"></nuxt-link>
            </div>
          </v-line>
          <v-line id="8">
            <div class="work">
              <span class="number" v-text="getId(13)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(13).title"></nuxt-link>
            </div>
            <div class="work">
              <span class="number" v-text="getId(14)"></span>
              <nuxt-link :to="{name: 'works'}" v-html="getWork(14).title"></nuxt-link>
            </div>
          </v-line>
        </div>
      </div>
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vLine from '~/components/works/line.vue'
import anime from 'animejs'
import transform from 'dom-transform'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0,
      screenId: 0,
      direction: 1
    }
  },
  computed: {
    ...mapState(['works'])
  },
  components: {
    vLine
  },
  methods: {
    getId(id) {
      const thisId = id + 1
      return thisId < 10 ?  `0${thisId}` : thisId
    },
    getWork(id) {
      return this.works[id]
    },
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.screens.forEach((screen, i) => {
        transform(screen.el, {translateY:  i * this.h *.2})
      });
    },
    tick(scrollTop, easeScrollTop) {
      transform(this.$el, {translateY: easeScrollTop - easeScrollTop/this.h * this.h *.2})
      this.screenId = (Math.floor(.5 + scrollTop/this.h))
    },
    showLines(id = 0) {
      if(this.isAnimating)return
      const screen = this.screens[id]
      screen.el.style.pointerEvents = 'auto'
      this.isAnimating = true
      anime({
        targets: screen.lines,
        translateY: [this.direction === 1 ? 200 : -200, 0],
        scaleY: 1,
        transformOrigin:  [this.direction === 1 ? '0 0' : '0 100%','0 50%'],
        duration: 700,
        opacity: 1,
        easing: 'easeOutQuad',
        delay: anime.stagger(200, {from: this.direction === 1 ? 'first' : 'last'}),
        complete: ()=>{
          this.isAnimating = false
          if(id !== this.screenId) this.hideLines(id)
        }
      })
    },
    hideLines(id) {
      if(this.isAnimating)return

      const screen = this.screens[id]
      screen.el.style.pointerEvents = 'none'
      this.isAnimating = true
      anime({
        targets: screen.lines,
        translateY: this.direction === 1 ? -200 : 200,
        scaleY: 1.5,
        transformOrigin: this.direction === 1 ? '0 100%' : '0 0',
        duration: 400,
        opacity: 0,
        easing: 'easeInQuad',
        delay: anime.stagger(100, {from: this.direction === 1 ? 'first' : 'last'}),
        complete: ()=>{
          this.isAnimating = false
          this.showLines(this.screenId)
        }
      })
    },
    setDirection(direction) {
      }
  },
  watch: {
    screenId(val, old) {
      this.direction = val - old
      this.hideLines(old)
    }
  },
  mounted() {
    const lines = [].slice.call(this.$el.querySelectorAll('.line'))
    this.screens = []
    const screens = [].slice.call(this.$el.querySelectorAll('.screen'))

    screens.forEach(el => {
      const lines = [].slice.call(el.querySelectorAll('.line'))
      el.style.pointerEvents = 'none'
      this.screens.push({el,lines})
    });
    anime({
      targets: lines,
      translateY: 200,
      scaleY: 1.5,
      transformOrigin: '0 0',
      duration: 0,
      opacity: 0
    })
    this.$nextTick(()=>{
      Emitter.emit('PAGE:MOUNTED')
      this.showLines(0)
    })
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
  .screen
    width 100%
    height 100vh
    position absolute
    top 0
    left 0
    display flex
    align-items center

</style>

<style lang="stylus" >

</style>



