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
    height 2px
    border-bottom 1px solid $black
    left 0
    opacity 0.1
    position absolute
    top 65vh
    width 100%
  .circle
    border solid 1px $black
    border-radius 50%
    height 45vw
    left 50%
    opacity 0.1
    position absolute
    top 50%
    transform translate(-95%, -50%)
    width 45vw
</style>
