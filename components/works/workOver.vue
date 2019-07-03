<template>
  <div class="work-link blur ready" v-if="work">
    <span class="number" v-text="getId"  :class="{'wide': work.menuNumberUnderline}"></span>
    <div v-html="work.title" class="label" :class="{'italic': work.menuItalic}"></div>
    <div class="work-link inner-blur" v-for="index in 10" :key="index">
      <span class="number" v-text="getId"  :class="{'wide': work.menuNumberUnderline}"></span>
      <div v-html="work.title" class="label" :class="{'italic': work.menuItalic}"></div>
    </div>
  </div>
</template>

<script>
import offset from '~/assets/js/utils/offset'
import anime from 'animejs'
import Emitter from '~/assets/js/events/EventsEmitter'
import blurMixin from '~/components/blurMixin.vue'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      work: null,
      id: -1
    }
  },
  mixins:[blurMixin],
  computed: {
    ...mapState(['works']),
    getId() {
      const thisId = this.id + 1
      return thisId < 10 ? `0${thisId}` : thisId
    }
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },

    setWork(workEl,id ,screenId) {
      this.work = this.works[id]

      this.id = id
      this.$nextTick(()=>{
        const workOffset = offset(workEl)
        this.$el.style.left = workOffset.left + 'px'
        const left = workOffset.left
        const top = workOffset.top /*+ screenId * this.h *.2*/
        this.$el.style.top = top + 'px'
        this.show()
      })
    },
    show() {
      if(this.workOpacity)this.workOpacity.pause()
      this.workOpacity = anime({
        targets: this.$el,
        opacity: [0,1],
        duration: 500,
        easing: 'easeOutQuad'
      })
      this.doBlur()

    },
    hide(){
      if(!this.work )return
      if(this.workOpacity)this.workOpacity.pause()
      this.workOpacity = anime({
        targets: this.$el,
        opacity: 0,
        duration: 300,
        easing: 'easeInQuad',
        complete:()=>{
          if(this.blurAnime)this.blurAnime.pause()
          this.work = null
        }
      })
    },
    onMouseLeave(){
    }
  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
.work-link
  position absolute
  pointer-events none
  width 100vw
  .inner-blur
    display flex
</style>

