<template>
  <article>
    <div class="img">
      <img :src="`${path}${content.url}`" :alt="alt" :style="{ background }">
    </div>
    <div class="text-content">
      <header v-html="content.header" class="demi"></header>
      <p v-for="(paragraph, index) in content.paragraphs" :key="`paragraph-${index}`" v-html="paragraph"></p>
    </div>
  </article>
</template>

<script>
export default {
  props: ['content', 'path', 'title'],
  computed:{
    width() {
      return this.content.width ? `${this.content.width}%`: '100%'
    },
    background() {
      return this.content.background ? this.content.background : 'none'
    },
    alt() {
      return this.content.alt ? this.content.alt : this.title
    }
  },
  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
article
  display flex
.img, .text-content
  width 50%
.text-content
  display flex
  justify-content center
  align-items center
  flex-direction column
header, p
  width 50%
</style>
