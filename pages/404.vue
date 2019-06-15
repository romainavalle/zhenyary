<template>
<section>
  <h1>404</h1>
</section>
</template>

<script>
export default {
  layout: 'error'
}
</script>

<style lang="stylus" scoped>
section
  position relative
  height 100vh
h1
  font-size 20vw
  font-family $schnyder
  text-align center
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
</style>
