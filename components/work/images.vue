<template>
  <article>
    <div class="img" v-for="(image, index) in content.images" :key="`image-${index}`" :style="{'background': background(index)}">
      <img :src="`${path}${content.images[index].url}`" :alt="alt(index)" :style="{'width': width(index)}" :class="shadowClass(index)">
    </div>
  </article>
</template>

<script>
export default {
  props: ['content', 'path', 'title'],
  computed:{

  },
  methods: {
    width(id) {
      return this.content.images[id].width ? `${this.content.images[id].width}%`: '100%'
    },
    background(id) {
      return this.content.images[id].background ? this.content.images[id].background : 'none'
    },
    shadowClass(id) {
      return this.content.images[id].shadow ? true : false
    },
    alt(id) {
      return this.content.images[id].alt ? this.content.images[id].alt : this.title
    }
  },
  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
article
  display flex
.img
  width 50%
  display flex
  justify-content center
  align-items center
</style>
