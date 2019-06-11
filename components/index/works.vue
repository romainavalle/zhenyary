<template>
  <article class="works">

  </article>
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
.works
  background $white
  overflow hidden
  height 100vh
  width 100vw
  font-size 6vw
  position relative
  display flex
</style>
