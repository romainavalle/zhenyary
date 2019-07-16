<template>
  <article class="works">
    <strong class="strong">selected works</strong>
    <v-work v-for="(work, index) in datas.homeWorks" :key="`work-${index}`" :work="worksById[work]" :id="index" ref="works" />
    <div class="dot-container" ref="dot">
      <div class="dot">.</div>
    </div>
  </article>
</template>

<script>
import vWork from '~/components/index/work/work.vue'
import { easeOutQuad } from '~/assets/js/utils/easings'
import transform from 'dom-transform'
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      w:0,
      h:0,
      coef: -1
    }
  },
  components: {
    vWork
  },
  computed: {
    ...mapState(['datas','worksById']),
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.works.forEach(work => {
        work.resize(this.w, this.h)
      });
    },
    tick(scrollTop, ease) {
      if(this.isPhone) {
      }else{
        let top = 0
        let coef = 0
        if(ease >=  this.h * 2) top = ease - this.h * 2
        if(ease >= this.h) coef = (ease-this.h) / this.h
        top = Math.min(this.h, top)
        coef = Math.min(1, coef)
        if(this.coef !== coef) {
          const easeCoef = easeOutQuad(coef)
          this.$refs.dot.style.opacity = Math.max(0, -1 + coef * 2)
          this.coef = coef
        }
        transform(this.$refs.dot,{translate3d:[0, top, 0] })
      }
      this.$refs.works.forEach(work => {
        work.tick(scrollTop, ease)
      });
    },

  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.works
  overflow hidden
  //height 300vh
  height 200vh
  width 100vw
  position relative
.strong
  position absolute
  display block
  left 75%
  z-index 1
  top 3vw
  +below('l')
    left 57%
  +below('s')
    position relative
    left  0
    width 100%
    text-align center
    top auto
    background $white
    padding-top 7vh
.dot-container
  font-size 10vw
  position absolute
  top 25%
  left 50%
  .dot
    text-align center
    font-weight $light
    color $black
    padding-left 8.5vw
    transform translate(-50%, -50%)
  +below('l')
    display none
.mobile &.works
  height auto
  .dot-container
    display none
</style>
