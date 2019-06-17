<template>
  <article class="gems">
    <strong class="strong">My main services</strong>
    <div class="d-f">
      <div>
        <v-gems-line v-for="(item, index) in 3" :key="`line-${index}`" ref="lines"/>
      </div>
    </div>
  </article>
</template>

<script>
import vGemsLine from '~/components/index/gemsLine.vue'
export default {
  data() {
    return {
      w:0,
      h:0
    }
  },
  components: {
    vGemsLine
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.lines.forEach((line, i) => {
        line.resize(this.w, this.h)
      });
    },
    tick(scrollTop) {
      const dist =  (scrollTop - this.h) / this.h * this.w
      this.$refs.lines.forEach((line, i) => {
        const multiplier = (i === 1) ? -1 : 1
        const offset = this.w * i
        const x = dist * multiplier - offset
        line.tick(x)
      });
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.gems
  background $grey
  overflow hidden
  height 100vh
  width 100vw
  position relative
  .d-f
    font-size 6vw
    display flex
    align-items center
    font-family $schnyder
    font-weight $demi
    height 100%
  strong
    position absolute
    top 2vh
    text-align center
    left 50%
    transform translateX(-50%)
</style>
