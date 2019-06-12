<template>
  <div class="work-img">
    <div class="img" v-for="(work, index) in works" :key="`work-${index}`">
      <img :src="`${path}${work.cover}`" :alt="work.title">
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import transform from 'dom-transform'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  props: ['id'],
  computed: {
    ...mapState(['works', 'path'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    show(id) {
      this.imgAnim = anime({
        targets: this.imgs[id],
        opacity: [0, 1],
        translateY: ['100%', '0%'],
        scaleY: [1.5, 1],
        duration: 500,
        easing: 'easeOutQuad'
      })
      let coef = 0
      if(id>5)coef++
      if(id>10)coef++
      transform(this.$el, {translateY: this.h *.2 *coef})

    },
    hide(id){
      if(this.imgAnim)this.imgAnim.pause()
      this.imgAnim = anime({
        targets: this.imgs[id],
        opacity: 0,
        translateY: 0,
        scaleY: 1,
        duration: 300,
        easing: 'easeInQuad'
      })
    }
  },
  watch: {
    id(val,old){
      if(old !== -1)this.hide(old)
      if(val !== -1)this.show(val)
    }
  },
  mounted(){
    this.imgs = [].slice.call(this.$el.querySelectorAll('.img'))
    this.imgs.forEach(element => {
      element.style.opacity = 0
    });
  }
}
</script>

<style lang="stylus" scoped>
.work-img
  position absolute
  width 25vw
  top 50vh
  left 50vw
  pointer-events none
  .img
    position absolute
    width 100%
    transform-origin 50% 100%
    will-change opacity, transform
  img
    display block
    height auto
    transform translate(-50%, -50%)
    width 100%
</style>
