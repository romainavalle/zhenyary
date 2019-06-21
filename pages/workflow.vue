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
import offset from '~/assets/js/utils/offset'
import { mapState, mapGetters } from 'vuex'
if(process.browser) {
  var classie =require('desandro-classie')
}
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  computed: {
    ...mapGetters(['isPhone'])
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
      if(this.isPhone) {
        this.animes.forEach((anim)=>{
          anim.offset = offset(anim.el).top - this.h * .9
        })
      }
    },
    tick(scrollTop, ease) {
      this.$refs.intro.tick(scrollTop, ease)
      this.$refs.learn.tick(scrollTop, ease)
      this.$refs.think.tick(scrollTop, ease)
      this.$refs.create.tick(scrollTop, ease)
      this.$refs.implementation.tick(scrollTop, ease)
      this.$refs.footer.tick(scrollTop, ease)
       if(this.isPhone) {
        this.animes.forEach((anim)=>{
          if(!anim.shown) {
            if(anim.offset < scrollTop) {
              anim.shown = true
              classie.remove(anim.el, 'mobile-anime')
              //anim.className = classnames.split('anim-mobile')[0]
            }
          }
          if(anim.shown) {
            if(anim.offset > scrollTop + this.h) {
              anim.shown = false
              classie.add(anim.el, 'mobile-anime')
            }
          }
        })
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      Emitter.emit('PAGE:MOUNTED')
      if(this.isPhone){
        this.animes = []
        const animes = [].slice.call(this.$el.querySelectorAll('.mobile-anime'))
        animes.forEach((el)=>{
          classie.add(el, 'mobile-trans')
          this.animes.push({el})
        })
      }
      setTimeout(()=>{
        this.$refs.intro.show()
      }, 3000)
    })
  },
}
</script>

<style lang="stylus" scoped>
.workflow
  position relative
  width 100vw
  +below('s')
    overflow hidden
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
    +below('s')
      text-align center
      width 100%
      h2
        font-size 28vw
      span
        font-size 5vw
  .mobile-trans
    display block
    transition opacity .9s ease-out-quad, transform .9s ease-out-quad
  .mobile-anime
    opacity 0
    transform translateY(50px)
</style>


