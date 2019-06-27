<template>
  <div class="about">
    <v-top ref="top" />
    <v-desc ref="desc" />
    <v-recognitions ref="recognitions" />
  </div>
</template>

<script>
import vTop from "~/components/about/top.vue";
import vDesc from "~/components/about/desc.vue";
import vRecognitions from "~/components/about/recognitions.vue";
export default {
  data() {
    return {
      w: 0,
      h: 0
    }
  },
  components: {
    vTop, vDesc, vRecognitions
  },
  computed: {
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.top.resize(this.w, this.h)
      this.$refs.desc.resize(this.w, this.h)
      this.$refs.recognitions.resize(this.w, this.h)
    },
    tick(scrollTop, ease) {
      this.$refs.top.tick(scrollTop, ease)
      this.$refs.desc.tick(scrollTop, ease)
      this.$refs.recognitions.tick(scrollTop, ease)
    },
    show() {
      this.$refs.top.show()
    }
  },
  mounted() {
  },
}
</script>

<style lang="stylus" >
section.about .about
  position relative
  width 100vw
  padding-top 200px
  overflow hidden
  .d-f
    display flex
    justify-content flex-start
  .spacer
    width 45%
  article
    padding 0 4vw
    position relative
    z-index 1
    width 45%
  strong
    display block
    font-weight normal
  .strong
    padding-bottom 2vw
  p
    width 50%
  h1
    font-size 15vw
    font-weight normal
  h2
    font-size 4.4vw
    font-family $schnyder
    font-weight $demi
    padding-bottom 2vw
  h3
    font-size 3.1vw
    font-family $schnyder
    font-weight $demi
    padding-bottom 3vw
  h4, .h4
    font-size 2vw
    font-weight normal
  h4
    padding-bottom 2vw
  +below('l')
    padding-top 100px
    .spacer
      width 30%
    article
      width 70%
    h1
      font-size 10vw
    h2
      font-size 5.4vw
      padding-bottom 4vw
    h3
      font-size 5.4vw
      padding-bottom 4vw
    h4, .h4
      font-size 5.2vw
    h4
      padding-bottom 4vw
  +below('s')
    padding-top 100px
    .d-f
      display block
    .spacer
      display none
    article
      width 100%
      padding 0 4vw
    h1
      font-size 140px
    h2
      font-size 35px
    h3
      font-size 35px
      padding-bottom 30px
    h4, .h4
      font-size 22px
    h4
      padding-bottom 20px
    p
      font-size 14px
</style>


