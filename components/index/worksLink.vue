<template>
  <div class="worksLink">
    <nuxt-link :to="{name: 'index'}">All cases here</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      w:0,
      h:0
    }
  },
  components: {
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop) {
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.worksLink
  height 50vh
  width 100vw
  position relative
  display flex
  justify-content center
  align-items center
  a
    border-bottom 0.4vw solid $white
    color $white
    font-size 11vw
    line-height 1.1
</style>
