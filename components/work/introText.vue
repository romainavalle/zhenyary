<template>
  <article class="intro">
    <div class="spacer"></div>
    <div class="text">
      <p v-for="(text, index) in work.header" :key="`header-${index}`" v-html="text"></p>
    </div>
  </article>
</template>

<script>
export default {
  props: { 'work': Object },
  components: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.intro
  width 100%
  padding 0 6vw 6vw
  position relative
  display flex
  align-items flex-start
  justify-content flex-start
.spacer
  width 50%
.text
  width 50%
  padding-left 15vw
p
  width 70%
</style>
