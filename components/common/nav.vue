<template>
  <nav>
    <nuxt-link :to="{name: 'index'}">
      Z.
      <span>about me</span>
    </nuxt-link>
    <nuxt-link :to="{name: 'index'}">
      Works
      <span>some cases</span>
    </nuxt-link>
    <span class="spacer"></span>
    <nuxt-link :to="{name: 'index'}">
      Workflow
      <span>All the processes</span>
    </nuxt-link>
    <nuxt-link :to="{name: 'index'}">
      Contact Me
      <span>For any collaborations</span>
    </nuxt-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
nav
  display flex
  font-size 43px
  height 75px
  justify-content space-between
  left 0
  position fixed
  top 3vw
  width 100%
  z-index 5
  .spacer
    display block
    width 100%
  a
    display block
    margin 0 4vw
    line-height 1
    white-space nowrap
  span
    display block
    font-weight $light
    font-size 12px
    padding-top 1.5em
    text-transform uppercase

</style>
