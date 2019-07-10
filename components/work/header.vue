<template>
  <header>
    <nuxt-link :to="{name: 'work'}" class="strong back" ref="link"><span>Back To All Projects</span></nuxt-link>
    <h1 ref="title"><span v-html="work.title"></span></h1>
    <div class="text">
      <no-ssr>
        <div v-if="!isPhone">
          <button aria-label="scroll" @click="scrollTo" ref="arrow"><span class="arrow"><v-svg-arrow/></span></button>
        </div>
      </no-ssr>
      <div class="details">
        <no-ssr>
          <span class="letter-container" v-if="!isDevice"><span class="letter" ref="letter">{{letterStr}}</span><span class="dot" ref="dot">.</span></span>
        </no-ssr>
        <div class="details-text">
          <div>
            <h2 class="demi" v-text="work.subtitle"></h2>
            <ul>
              <li v-for="(skill, index) in work.skills" :key="`skill-${index}`" v-text="index === 0 ? skill : ` / ${skill}`" class="strong"></li>
            </ul>
          </div>
          <div>
            <v-link :to="work.link.url" ref="link" class="demi">{{ work.link.label }}</v-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import anime from 'animejs'
import vSvgArrow from "~/assets/svgs/arrow.svg?inline";
import vLink from '~/components/common/link.vue'
import { mapGetters } from 'vuex';
export default {
  props: { 'work': Object },
  components: {
    vSvgArrow, vLink
  },
  computed: {
    letterStr() {
      return this.work.title.charAt(0)
    },
    ...mapGetters(['isDevice', 'isPhone'])
  },
  methods: {
    resize(w,h) {
      if(w && h){
        this.w = w
        this.h = h
      }

    },
    tick(scrollTop, ease){
      if(ease < this.h) {
        if(this.w > 1024 && !this.isPhone)transform(this.$refs.arrow, {translate3d:[0, Math.min(ease,this.h ), 0]})
        //if(this.w > 1024)transform(this.$refs.link.$el, {translate3d:[0, scrollTop, 0]})
        if(this.w > 1024)transform(this.$refs.title, {translate3d:[0, ease / 3, 0]})
        if(!this.isDevice) transform(this.$refs.letter, {translate3d:[0, -scrollTop / this.h * this.w * .1, 0]})
        if(!this.isDevice) transform(this.$refs.dot, {translate3d:[0, -scrollTop / this.h * this.w * .1, 0]})
        if(!this.isDevice) this.$refs.dot.style.opacity = (this.h - ease * 2) / this.h
        this.$refs.title.style.opacity = (this.h - ease * 2) / this.h
        //this.$refs.link.$el.style.opacity = (this.h - ease * 2) / this.h
      }
    },
    scrollTo(scrollTop) {
      ScrollHelper.scrollTo(this.h * .7)
    },
    show(){
      anime({targets: this.title, opacity: 1, translateY: 0, duration: 1500,  easing: 'easeOutQuad'})
      anime({targets: this.back, opacity: 1, duration: 600, delay: 600, easing: 'easeOutQuad'})
      anime({targets: this.arrow, opacity: 1, translateY: 0, duration: 800, delay: 400, easing: 'easeOutQuad'})
      if(!this.isDevice) anime({targets: this.letter, opacity: 1, translateY: 0, duration: 1000, delay: 500,  easing: 'easeOutQuad'})
      anime({targets: this.text_array, opacity: 1, translateX: 0, duration: 1200, delay: anime.stagger(50, {start: 600}),  easing: 'easeOutQuad'})
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.back = this.$refs.link.$el.querySelector('span')
      this.title = this.$refs.title.querySelector('span')
      if(!this.isPhone) this.arrow = this.$refs.arrow.querySelector('.arrow')
      if(!this.isDevice) this.letter = this.$el.querySelector('.letter-container')
      this.text_array = [
        this.$el.querySelector('h2'),
        this.$el.querySelector('ul'),
        this.$el.querySelector('.link')
      ]
      anime.set(this.back, { opacity: 0})
      if(!this.isPhone) anime.set(this.arrow, { opacity: 0, translateY: -50})
      anime.set(this.title, { opacity: 0, translateY: 100})
      if(!this.isDevice) anime.set(this.letter, { opacity: 0, translateY: 50})
      anime.set(this.text_array , { opacity: 0, translateX: 30})
    })
  }
}
</script>

<style lang="stylus" scoped>
header
  height 100vh
  width 100%
  position relative
h1
  font-size 8.8vw
  text-align center
  line-height 1
  font-family $schnyder
  font-weight $demi
  padding-top 30vh
  span
    display block
h2
  margin-bottom 1em
.back
  display block
  top 32vh
  left 6vw
  position absolute
  z-index 1
.link
  font-size 20px
  position relative
  display inline-block
  &:after
    content ''
    width 100%
    height 1px
    background $black
    bottom 0
    left 0
    position absolute
    display block
.letter-container
  font-size 10.5vw
  line-height .68
  width 15vw
  display block
  font-weight $light
  flex-shrink 0
.dot
  display inline-block
.text
  display flex
  width 100%
  padding 0 6vw
  justify-content space-between
  position absolute
  bottom 5vh
  > div
    width 50%
.details
  width 50%
  display flex
li
  display inline
.details-text
  display flex
  flex-direction column
  justify-content space-between
  align-content flex-start

.arrow
  width 158px
  height 106px
  display block
  svg
    width 100%
    height 100%
    stroke $black
    fill $black
    transform translateY(-20px) rotate(90deg)
header
  +below('l')
    overflow hidden
    height auto
    ul
      width 100%
    .back
      top 100px
      left 50%
      span
        display block
        transform translate(-50%,0)
    h1
      padding-top 20vh
    .arrow
      height 45px
      width 30px
      display block
      svg
        transform  rotate(90deg)
    .text
      bottom auto
      position relative
      padding-top 10vh
    .link
      padding-top 5px
  +below('s')
    height auto
    padding 15vh 5vw 0
    .back
      position relative
      top auto
      left auto
      span
        display block
        transform none
    h1
      padding-top 5vh
      text-align left
    .arrow
      height 45px
      width 30px
      display block
      svg
        transform  rotate(90deg)
    .details
      width 100%
      display block
    .text
      bottom auto
      position relative
      padding 0
      padding-top 10vh
    .link
      padding-top 80px

</style>
<style lang="stylus">
.work-slug header h1
  span span
    display none
</style>

