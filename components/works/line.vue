<template>
  <div class="line">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.line
  width 100vw
  padding 1vh 6vw
  line-height 1.1
  font-size 8.8vw
  display flex
  justify-content space-between
  color $red
  align-items baseline
  span.number
    font-size 1vw
    margin-right 2vw
    line-height 2
    display block
    &.wide
      border-bottom 0.2vw solid $red
      width 15vw
      text-align center
      margin-right 4vw
  .work
    display flex
    align-items center
    a
      display flex
      align-items baseline
  .underline
    border-bottom 0.2vw solid $red
</style>
<style lang="stylus">
section.works .line .work a
  span
    font-size 3.6vw
  span.slash
    font-size 7vw
    align-self flex-end
</style>
