<template>
  <article class="content">
    <div class="text-content">
      <div class="header">
        <header v-html="content.header" class="demi"></header>
      </div>
      <div class="paragraphs">
        <p v-for="(paragraph, index) in content.paragraphs" :key="`paragraph-${index}`" v-html="paragraph"></p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['content', 'path', 'title']
}
</script>

<style lang="stylus" scoped>
article.content
  display flex
  align-items center
  min-height 30vh
  padding-top 7vw
  padding-bottom 7vw
  height auto
.text-content
  width 80%
  margin 0 auto
  display flex
.header, .paragraphs
  width 50%
  display flex
  justify-content flex-end
header
  width 25%
p
  width 50%

</style>
