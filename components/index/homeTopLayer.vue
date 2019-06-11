<template>
  <div class="top-layer">
    <div class="horizontal" />
    <div class="circle" />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.top-layer
  height 100vh
  left 0
  pointer-events none
  position absolute
  top 0
  width 100vw
  .horizontal
    background $black
    height 1px
    left 0
    opacity 0.2
    position absolute
    top 65vh
    width 100%
  .circle
    border solid 1px $black
    border-radius 50%
    height 70vh
    left 50%
    opacity 0.2
    position absolute
    top 14vh
    transform translateX(-90%)
    width 70vh
</style>
