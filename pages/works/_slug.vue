<template>
  <section class="work">
    <v-header :work="work" ref="header"/>
    <v-intro-text :work="work" ref="intro" />
    <component v-for="(item, i) in work.content" :key="`item-${i}`" ref="contents" :is="item.type" :content="item" :path="path" :title="work.title" ></component>
    <v-footer ref="footer"/>
  </section>
</template>

<script>
import vHeader from '~/components/work/header.vue'
import vIntroText from '~/components/work/introText.vue'
import vImageBackground from '~/components/work/imageBackground.vue'
import vImage from '~/components/work/image.vue'
import vImageText from '~/components/work/imageText.vue'
import vImages from '~/components/work/images.vue'
import vText from '~/components/work/text.vue'
import vFooter from '~/components/work/footer.vue'
import Emitter from '~/assets/js/events/EventsEmitter'
import mobileMixin from '~/components/mobileMixin.vue'
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
    vHeader, vIntroText, vImageBackground, vImage, vImages, vText, vImageText, vFooter
  },
  computed: {
    ...mapState(['worksById','path', 'isFirstTime']),
    ...mapGetters(['isPhone']),
    work() {
      return this.worksById[this.$route.params.slug]
    }
  },
  mixins: [mobileMixin],
  methods: {
    resize(w,h) {
      if(w, h) {
        this.w = w
        this.h =h
      }
      this.$refs.header.resize(this.w, this.h)
      this.$refs.intro.resize(this.w, this.h)
      this.$refs.footer.resize(this.w, this.h)
      this.$refs.contents.forEach(content => {
        content.resize(this.w, this.h)
      });
      this.resizeMobile()
    },
    tick(scrollTop, ease) {
      this.tickMobile(scrollTop)
      this.$refs.header.tick(scrollTop, ease)
      this.$refs.intro.tick(scrollTop, ease)
      this.$refs.footer.tick(scrollTop, ease)
      this.$refs.contents.forEach(content => {
        content.tick(scrollTop, ease)
      });
    },
    onLoad() {
      this.imgLoaded++
      if(this.imgLoaded % 3 === 0) Emitter.emit('GLOBAL:RESIZE')
      if(this.imgLoaded === this.imgs.length) Emitter.emit('GLOBAL:RESIZE')
    },
    show() {
      this.$refs.header.show()
    }
  },
  beforeDestroy() {
    this.imgs.forEach(element => {
      element.removeEventListener('load',this._onLoad)
    });
  },
  mounted() {
    this._onLoad = this.onLoad.bind(this)
    this.imgs = []
    this.$nextTick(()=>{
      const imgs = [].slice.call(this.$el.querySelectorAll('img'))
      imgs.forEach(element => {
        const img = new Image()
        img.addEventListener('load',this._onLoad)
        //img.src = element.dataset.src
        img.src = element.src
        this.imgs.push(img)
      });
      setTimeout(this.show.bind(this), this.isFirstTime ? 2500 : 450)
      if(this.isPhone){
        this.setupMobile()
        this.isShown = true
      }
      Emitter.emit('PAGE:MOUNTED')
    })

  }
}
</script>


<style lang="stylus" scoped>
.work
  position relative
  width 100vw
  min-height 100vh
  background $grey
  +below('s')
    min-height auto
h3
  font-size 20px
.content
  width 100%
</style>

<style lang="stylus" >
.page.work
  .line
    display block
</style>
