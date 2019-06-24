<template>
  <section class="about">
    <div class="d-f">
      <div class="img">
        <img src="/images/zhenya.jpg" alt="zhenya rynzhuk">
      </div>
      <div class="text">
        <h1>Z.</h1>
        <h2>a bit about me</h2>
        <strong>Just about</strong>
        <p class="strong">background</p>
      </div>
    </div>
    <div class="d-f">
      <div class="spacer">
      </div>
      <div class="text">
        <strong>So,</strong>
        <p v-html="about.about"></p>
      </div>
    </div>
    <div class="d-f">
      <div class="spacer">
      </div>
      <div class="text">
        <h3>Regognitions</h3>
        <h4>Awwwards</h4>
        <h4>FWA</h4>
        <h4>Behance</h4>
        <ul class="behance">
          <li v-for="(behance, index) in about.behance" :key="`behance-${index}`" v-text="behance"></li>
        </ul>
        <h4>collablorations</h4>
        <ul class="collablorations">
          <li v-for="(collab, index) in about.collaborations" :key="`collab-${index}`" v-text="collab"></li>
        </ul>
      </div>
    </div>
    <v-footer ref="footer" />
  </section>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vFooter from '~/components/pageFooter.vue'
import mobileMixin from '~/components/mobileMixin.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  computed: {
    ...mapState(['about']),
    ...mapGetters(['isPhone'])
  },
  components: {
    vFooter
  },
  mixins: [mobileMixin],
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      if(this.isPhone) {
        this.resizeMobile()
      }
      this.$refs.footer.resize(this.w, this.h)
    },
    tick(scrollTop, ease) {
      this.$refs.footer.tick(scrollTop, ease)
      if(this.isPhone) {
        this.tickMobile(scrollTop)
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if(this.isPhone) this.setupMobile()
      Emitter.emit('PAGE:MOUNTED')
    })
  },
}
</script>

<style lang="stylus" scoped>
.about
  position relative
  width 100vw
  .d-flex
    display flex
    overflow hidden
    justify-content space-between
  h1
    font-size 15vw
    font-weight normal
  h2
    font-size 4.4vw
    font-family $schnyder
    font-weight $demi
  h3
    font-size 3.1vw
    font-family $schnyder
    font-weight $demi
  h4
    font-size 2vw
    font-weight normal
  .behance
    font-size 1.66vw
  .collaborations
    font-size 2.6vw
</style>


