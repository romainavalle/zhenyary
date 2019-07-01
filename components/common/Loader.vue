<template>
  <div class="Loader" :class="{'transparent':isReady}" v-if="isFirstTime">
    <v-loader-animation />
  </div>
</template>
<script>
import anime from 'animejs'
import { mapActions, mapState } from 'vuex';
export default {
  data(){
    return {
      w: 0,
      h: 0,
      isReady: false
    }
  },
  components: {
     'v-loader-animation': ()=> import('~/components/common/loaderAnimation.vue')
  },
  computed: {
    ...mapState(['isFirstTime'])
  },
  methods:{
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {
    //if(process.env.NODE_ENV === 'development') this.$el.style.display = 'none'
    this.$el.style.display = 'block'
    this.$el.style.mixBlendMode = 'multiply'
  }
}

</script>

<style lang="stylus" scoped>
.Loader
  background $black
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 998
  pointer-events none
  &.transparent
    background none

</style>


