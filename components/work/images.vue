<template>
  <article>
    <div class="img" v-for="(image, index) in content.images" :key="`image-${index}`" :style="{'background': background(index)}">
      <img :src="`${path}${content.images[index].url}`" :alt="alt(index)" :style="{'width': width(index)}" :class="shadowClass(index)" ref="imgs">
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
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
    },
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease){
      if(ease > this.offset && ease <this.offset + this.h) {
        const coef = (ease - this.offset) / this.h
        transform(this.$refs.imgs[0], {scale3d: [2.1 - coef * 1.1, 2.1 - coef * 1.1, 1]})
        transform(this.$refs.imgs[1], {translate3d: [300 - coef * 300, 0, 0]})
        this.$refs.imgs[1].style.opacity = coef
      }
    }
  },
  mounted() {
    this.$refs.imgs[0].style.transformOrigin = "0% 50%"
    this.$refs.imgs[0].style.zIndex = 1
    transform(this.$refs.imgs[0], {scale3d: [2.1, 2.1, 1]})
    transform(this.$refs.imgs[1], {translate3d: [300, 0, 0]})
    this.$refs.imgs[1].style.opacity = 0
  }
}
</script>


<style lang="stylus" scoped>
article
  display flex
  overflow hidden
.img
  width 50%
  display flex
  justify-content center
  align-items center
</style>
