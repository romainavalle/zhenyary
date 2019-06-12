<template>
  <div class="work">
  </div>
</template>

<script>
import offset from '~/assets/js/utils/offset'
import anime from 'animejs'
import Emitter from '~/assets/js/events/EventsEmitter'
export default {
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    setWork(work ,id) {
      this.$el.innerHTML = work.innerHTML
      this.$nextTick(()=>{
        this.$el.querySelector('a').addEventListener('mouseleave', this._onMouseLeave, false)
      })
      const workOffset = offset(work)
      this.$el.style.left = workOffset.left + 'px'
      let left = workOffset.left
      let top = workOffset.top
      if(id>5) {
        top +=  this.h *.2
      }
      if(id>10) {
        top +=  this.h *.2
      }
      this.$el.style.top = top + 'px'
    },
    setPosition(x,y) {

    },
    show() {
      this.$el.style.pointerEvents = 'auto'
      if(this.workOpacity)this.workOpacity.pause()
      this.workOpacity = anime({
        targets: this.$el,
        opacity: 1,
        duration: 500,
        easing: 'easeOutQuad'
      })

    },
    hide(){
      this.$el.style.pointerEvents = 'none'
      if(this.workOpacity)this.workOpacity.pause()
      if(this.$el.querySelector('a'))this.$el.querySelector('a').removeEventListener('mouseleave', this._onMouseLeave, false)
      this.workOpacity = anime({
        targets: this.$el,
        opacity: 0,
        duration: 300,
        easing: 'easeInQuad',
        complete:()=>{
          this.$el.innerHTML = ''
        }
      })
    },
    onMouseLeave(){
      Emitter.emit('WORKS:MOUSELEAVE')
    }
  },
  beforeDestroy() {
    if(this.$el.querySelector('a'))this.$el.querySelector('a').removeEventListener('mouseleave', this._onMouseLeave, false)
  },
  mounted(){
    this._onMouseLeave = this.onMouseLeave.bind(this)
  }
}
</script>

<style lang="stylus" scoped>
.work
  position absolute
</style>
