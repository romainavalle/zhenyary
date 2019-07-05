<template>
  <div class="worksLink" :class="{'ready': isReady}">
    <v-link :to="{name: 'works'}" class="link" ref="link"><span>All cases</span> <span>here</span></v-link>
  </div>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import vLink from '~/components/common/link.vue'
import { easeOutQuad } from '~/assets/js/utils/easings'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w:0,
      h:0,
      coef: 0,
      isReady: false
    }
  },
  components: {
    vLink
  },
  computed: {
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      if(this.isPhone) return
      this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease) {
      if(this.isPhone) return
      let coef = 0
      if(ease>=this.offset) coef = (ease-this.offset) / this.h * 1.5
      coef = Math.min(1, coef)
      if(coef>.8){
        if(!this.isReady) this.isReady = true
      }else{
        if(this.isReady) this.isReady = false
      }
      if(coef !== this.coef) {

        const easeCoef = easeOutQuad(coef)
        transform(this.$refs.link.$el, {scale3d:[1.5-easeCoef * .5,1.5-easeCoef * .5, 1]})
        this.$refs.link.$el.style.opacity = -1 + easeCoef * 2
        this.coef = coef
      }
    }
  },
  mounted() {
    transform(this.$refs.link.$el, {scale3d:[1.5,1.5, 1]})
    this.$refs.link.$el.style.opacity = 0
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
      transform scale(0, 1)
      transform-origin 0 50%
      transition transform .5s ease-out-quad
  &.ready
    a:after
      transform scale(1)
  +below('s')
    a
      width 50%
      margin 0 auto
      text-align center
      font-size 12vw
      span
        line-height 1
        display inline-block
        border-bottom 2px solid $white
      &:after
        display none

</style>
