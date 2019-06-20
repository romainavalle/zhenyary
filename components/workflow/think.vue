<template>
  <article>
    <div class="title">
      <span>02</span>
      <h2>Think</h2>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop, ease) {
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>

</style>
