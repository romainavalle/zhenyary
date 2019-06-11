<template>
  <article class="gems">
    <div>
      <v-gems-line v-for="(item, index) in 3" :key="`line-${index}`" ref="lines"/>
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
      this.$refs.lines.forEach((line, i) => {
        const multiplier = (i === 1) ? -1 : 1
        const x = (scrollTop - this.h)/this.h * this.w * multiplier + this.w * i
        line.tick(x)
      });
    }
  },
  mounted() {
    console.log( this.$refs.lines)
  }
}
</script>

<style lang="stylus" scoped>
.gems
  background $grey
  overflow hidden
  height 100vh
  width 100vw
  font-size 6vw
  position relative
  display flex
  align-items center
  font-family $schnyder
  font-weight $demi

</style>
