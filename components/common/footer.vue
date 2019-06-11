<template>
  <footer>
    <v-socials />
  </footer>
</template>

<script>
import vSocials from '~/components/common/socials.vue'
export default {
  components: {
    vSocials
  }
}
</script>

<style lang="stylus" scoped>
footer
  position absolute
  bottom 0
  left 0
  width 100%
  display flex
  justify-content center
  padding 50px 0
</style>
