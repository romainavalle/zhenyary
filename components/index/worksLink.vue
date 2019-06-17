<template>
  <div class="worksLink">
    <nuxt-link :to="{name: 'index'}" class="link" ref="link">All cases here</nuxt-link>
  </div>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
export default {
  data() {
    return {
      w:0,
      h:0,
      coef: 0
    }
  },
  components: {
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease) {
      let coef = 0
      if(ease>=this.offset) coef = (ease-this.offset) / this.h * 1.5
      coef = Math.min(1, coef)
      if(coef !== this.coef) {

        const easeCoef = this.easeOutQuad(coef)
        transform(this.$refs.link.$el, {scale3d:[1.5-easeCoef * .5,1.5-easeCoef * .5, 1]})
        this.$refs.link.$el.style.opacity = -1 + easeCoef * 2
        this.coef = coef
      }
    },
    easeOutQuad: function (t) { return t*(2-t) }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.worksLink
  height 50vh
  width 100vw
  position relative
  display flex
  justify-content center
  align-items center
  overflow hidden
  a
    color $white
    font-size 11vw
    line-height 1.1
    display block
    position relative
    &:after
      content ''
      background $white
      height 0.4vw
      width 100%
      bottom 0
      position absolute
      left 0
      display block

</style>
