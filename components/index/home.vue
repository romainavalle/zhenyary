<template>
  <article class="home">
    <v-bottom-layer />
    <img src="/images/home/zhenya-bg.jpg" alt="Zhenya Rynzhuk">
    <h1 :class="{'ready': isReady }">
      <span class="label">Zhenya Rynzhuk</span>
      <no-ssr>
        <span class="left">
          <span>Zhenya </span>
        </span>
        <span class="right">
          <span>Rynzhuk</span>
        </span>
      </no-ssr>
    </h1>
    <img src="/images/home/zhenya-front.png" alt="Zhenya Rynzhuk">
    <v-top-layer />
  </article>
</template>
<script>
import vTopLayer from '~/components/index/homeTopLayer.vue'
import vBottomLayer from '~/components/index/homeBottomLayer.vue'
export default {
  data() {
    return {
      isReady: false,
      w:0,
      h:0
    }
  },
  components:{
    vBottomLayer, vTopLayer
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
    this.$el.querySelector('.label').style.opacity = 0
    setTimeout(()=>{
      this.isReady = true
    }, 500)
  }
}
</script>

<style lang="stylus" scoped>
.home
  position relative
  height 100vh
  width 100vw
  .vertical
    background #C5C0B5
    height 100%
    left 50%
    position absolute
    top 0
    width 1px
  .horizontal
    background $black
    height 1px
    left 0
    opacity 0.2
    position absolute
    top 65vh
    width 100%
    z-index 5
  .circle
    border solid 1px $black
    border-radius 50%
    height 70vh
    left 50%
    opacity 0.2
    position absolute
    top 14vh
    transform translateX(-80%)
    width 70vh
    z-index 5
  img
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    height auto
    width 30vw
  h1
    color white
    font-family $schnyder
    font-size 7vw
    font-weight $demi
    left 50%
    position absolute
    top 50%
    transform translate(-50%, -50%)
    white-space nowrap
    span
      display block
    .label
      opacity 0
    .left,.right
      position absolute
      top 0
      overflow hidden
      width 70%
      span
        transition transform 2s ease-out-quad
    .left
      left -20%
      span
        transform translateX(100%)
    .right
      right -20%
      text-align right
      span
        transform translateX(-100%)
    &.ready
      .left
        span
          transform translateX(0)
      .right
        span
          transform translateX(0)

</style>
