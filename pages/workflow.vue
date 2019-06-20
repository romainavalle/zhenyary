<template>
  <section class="workflow">
    <v-intro ref="intro"/>
    <v-learn ref="learn"/>
    <v-think ref="think"/>
    <v-create ref="create"/>
    <v-implementation ref="implementation"/>
    <v-footer ref="footer" />
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vIntro from '~/components/workflow/intro.vue'
import vLearn from '~/components/workflow/learn.vue'
import vThink from '~/components/workflow/think.vue'
import vCreate from '~/components/workflow/create.vue'
import vImplementation from '~/components/workflow/implementation.vue'
import vFooter from '~/components/pageFooter.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  computed: {
  },
  components: {
    vIntro, vLearn, vThink, vCreate, vImplementation, vFooter
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.intro.resize(this.w, this.h)
      this.$refs.learn.resize(this.w, this.h)
      this.$refs.think.resize(this.w, this.h)
      this.$refs.create.resize(this.w, this.h)
      this.$refs.implementation.resize(this.w, this.h)
      this.$refs.footer.resize(this.w, this.h)
    },
    tick(scrollTop, ease) {
      this.$refs.intro.tick(scrollTop, ease)
      this.$refs.learn.tick(scrollTop, ease)
      this.$refs.think.tick(scrollTop, ease)
      this.$refs.create.tick(scrollTop, ease)
      this.$refs.implementation.tick(scrollTop, ease)
      this.$refs.footer.tick(scrollTop, ease)
    }
  },
  mounted() {
    Emitter.emit('PAGE:MOUNTED')
  },
}
</script>

<style lang="stylus" scoped>
.workflow
  position relative
  width 100vw
</style>
<style lang="stylus" >
section.workflow
  .title
    h2
      font-family $schnyder
      font-weight $demi
      font-size 10.6vw
      display block
      line-height 1
    span
      color $red
      display block
      font-size 2.2vw
</style>


