<template>
  <div class="socials">
    <a v-for="(social,i) in datas.socials" :key="`social-${i}`" :href="social.link" v-text="social.label" target="_blank" rel="noopener" :class="color"></a>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['color'],
  computed: {
    ...mapState(['datas'])
  },
}
</script>

<style lang="stylus" scoped>
.socials
  font-family $schnyder
  font-size 21px
  display flex
  justify-content center
  a
    color $black
    display block
    margin 0 50px
    &.nude
      color $nude
    &.red
      color $red
  +below('l')
    a
      margin 0 20px
.red &
  a
    color $white
</style>
