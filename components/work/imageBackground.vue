<template>
  <article>
    <img :src="`${path}${content.url}`" :alt="content.alt || title">
  </article>
</template>

<script>
export default {
  props: ['content', 'path', 'title']
}
</script>

<style>

</style>
