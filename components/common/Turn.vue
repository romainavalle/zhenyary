<template>
  <div class="TurnDevice">
    <div class="content">
      <div class="svg">
          <v-svg />
      </div>
    </div>
  </div>
</template>
<script>

import vSvg from "~/assets/svgs/mobile.svg?inline";
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
    }
  },
  components: {
    vSvg
  },
  computed: {
  },
  methods:{
  },
  watch: {
  },
  beforeDestroy(){
  },
  mounted() {
  }
}

</script>

<style lang="stylus" scoped>
.TurnDevice
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  z-index 20
  display none
  background $grey
  .content
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    text-align center
    display flex
    justify-content center
    align-items center
    flex-direction column
    .svg
      width 230px
      height 230px
      svg
        display block
  @media (orientation: landscape)
    display block
    .svg
      animation-name turn
      animation-duration 8s
      animation-timing-function linear
      animation-iteration-count infinite

@keyframes turn
  0%
    transform rotate(0turn)
  100%
    transform rotate(1turn)
</style>
