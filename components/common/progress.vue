<template>
  <div class="progress"></div>
</template>

<script>
import transform from 'dom-transform'
export default {
  methods: {
    resize(w, h, ph) {
      this.h = h
      this.ph = ph
    },
    tick(scrollTop, ease) {
      transform(this.$el, {scale3d: [1, ease/(this.ph - this.h), 1]})
      //transform(this.$el, {scaleY: ease/this.ph})
    }
  },
}
</script>

<style lang="stylus" scoped>
.progress
  position fixed
  top 0
  height 100vh
  left 0
  width 4px
  transform-origin 50% 0%
  background $red
  z-index 10
</style>
