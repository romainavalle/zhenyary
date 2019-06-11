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
  .vertical
    background #C5C0B5
    height 100%
    left 50%
    position absolute
    top 0
    width 1px
  .numbers
    position absolute
    width 100%
    top 30vh
    display flex
    justify-content space-between
    li
      font-size 12px
      padding 0 4vw
      letter-spacing 6px


</style>
