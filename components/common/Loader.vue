<template>
  <div class="Loader">
  </div>
</template>
<script>

import anime from 'animejs'
export default {
  name: 'TurnDevice',
  data(){
    return {
    }
  },
  components: {
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
    anime({
      targets: this.$el,
      opacity: 0,
      duration: 500,
      easing: 'easeOutQuad',
      delay: 300,
      complete: ()=>{
        this.$el.style.visibility = 'hidden'
      }
    })
  }
}

</script>

<style lang="stylus" scoped>
.Loader
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 999
  background #000000
  will-change opacity
</style>
