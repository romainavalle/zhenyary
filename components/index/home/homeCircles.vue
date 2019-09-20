<template>
  <div class="circles">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"  ref="circles" v-for="(circle, index) in circles" :key="`circle-${index}`" :class="{'pink': circle.pink}">
      <circle cx="50" cy="50" r="50"/>
    </svg>
  </div>
</template>

<script>
import transform from 'dom-transform'
import anime from 'animejs'
export default {
  data() {
    return {
      isShown: false
    }
  },
  props: ['circles', 'id'],
  methods: {
    tick(mouseX, mouseY) {
      transform(this.$el, {translate3d: [mouseX * 200 /** (this.id /2 + 1)*/, mouseY * 200 /** (this.id /2 + 1)*/, 0]})
    },
    resize(w, h) {
      if(w && h){
        this.w = w
        this.h = h
      }
      if(!this.isShown)return
      this.$refs.circles.forEach((circle, i) => {
        circle.style.top = this.circles[i].top * this.h + 'px'
        circle.style.left = this.circles[i].left * this.w + 'px'
      });
    },
    toggleShow(doShow) {
      if(doShow){
        this.show()
      }else{
        this.hide()
      }
    },
    show() {
      this.isShown = true
      this.resize()
      if(this.anime) this.anime.pause()
      this.anime = anime({
        targets: this.$refs.circles,
        scale: 1,
        opacity: 1,
        translateX: '-50%',
        translateY: '-50%',
        duration: 500,
        delay: anime.stagger(150),
        easing: 'easeOutQuad'
      })
    },
    hide() {
      this.isShown = false
      if(this.anime) this.anime.pause()
      this.anime = anime({
        targets: this.$refs.circles,
        scale: .4,
        opacity: 0,
        translateX: '-50%',
        translateY: '100%',
        duration: 300,
        easing: 'easeInQuad'
      })
    }
  },
  beforeDestroy() {
    if(this.anime) this.anime.pause()
  },
  mounted() {
    anime.set(this.$refs.circles, {
      scale: .4,
      opacity: 0,
        translateX: '-50%',
        translateY: '100%',
    })
  }
}
</script>

<style lang="stylus" scoped>
.circles
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  pointer-events none
  svg
    position absolute
    display block
    fill $red
    width 15vw
    height 15vw
    transform translate(-50%, -50%)
    transition fill .5s ease-in-out-quad
    .red &
      fill $brown
    &.pink
      fill $pink
</style>
