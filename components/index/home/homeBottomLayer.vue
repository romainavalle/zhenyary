<template>
  <div class="bottom-layer">
    <div class="vertical" />
    <ul class="numbers">
      <li v-for="(item, index) in 9" :key="index">0{{index + 1}}</li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.bottom-layer
  height 100vh
  left 0
  pointer-events none
  position absolute
  top 0
  width 100vw
  .bg
    background $red
    bottom 0
    left 0
    position absolute
    right 0
    top 0
  .vertical
    background $black
    height 100%
    left 50%
    position absolute
    top 0
    width 1px
    opacity 0.1
  .numbers
    position absolute
    width 100%
    top 30vh
    display flex
    justify-content space-between
    li
      padding 0 4vw
      letter-spacing 6px
  .device &
    .numbers
      display none

</style>
