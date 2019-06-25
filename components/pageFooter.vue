<template>
 <footer>
   <strong class="big" ref="big">So, no more words</strong>
   <div class="content">
     <div class="img">
       <img :src="`/images/${$route.name}.jpg`" alt="zhenya">
       <nuxt-link :to="{name:'contact'}" class="link">Contact Me</nuxt-link>
       <a :href="`mailto:${datas.email}`" class="mail" rel="noopener" target="_blank" v-text="datas.email"></a>
     </div>
     <div class="top">
       <div>
         <p class="line"><span class="left">let's make</span> <span class="spacer"></span><span class="right">a wonderfull</span></p>
         <p class="line"><span class="left red" v-text="words[currentWord]"></span> <span class="spacer"></span><span class="right">together</span></p>
       </div>
     </div>
   </div>
 </footer>
</template>

<script>
import offset from '~/assets/js/utils/offset'
import { easeOutQuad } from '~/assets/js/utils/easings'
import transform from 'dom-transform'
import anime from 'animejs'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0,
      isShown: false,
      words: ['website', 'experience', 'direction', 'strategy'],
      currentWord: 0
    }
  },
  computed: {
    ...mapState(['datas'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.animHeight = this.h * .5
      const offsetTop = offset(this.$el).top
      this.offset = offsetTop - this.h * .9
      this.animOffset = offsetTop - this.h * .5
    },
    tick(scrollTop, ease) {
      if(ease > this.offset && ease < this.offset + this.animHeight){
        const coef = easeOutQuad((ease - this.offset) / this.animHeight)
        transform(this.$refs.big, {translateX: 100 - coef * 100 +'%'})
      }
      if(scrollTop > this.animOffset  ) {
        if(!this.isShown)this.show()
      }else{
        if(this.isShown)this.hide()
      }
    },
    show() {
      this.isShown = true
      const duration = 1500
      if(this.mainAnim)this.mainAnim.pause()
      this.mainAnim = anime({
        targets: this.lines,
        opacity: [0, 1],
        duration,
        delay: 200,
        easing: 'easeOutQuad',
        complete: this.nextWord.bind(this)
      })
      anime({
        targets: this.spacers,
        scaleX: [0, 1],
        duration,
        easing: 'easeOutQuad'
      })
      anime({
        targets: this.rights,
        translateX: [-this.w * .3, 0],
        duration,
        easing: 'easeOutQuad'
      })
      anime({
        targets: this.left,
        translateX: [this.w * .3, 0],
        duration,
        easing: 'easeOutQuad'
      })
      anime({
        targets: this.link,
        translateY: [50, 0],
        translateX: ['-50%', '-50%'],
        opacity: [0, 1],
        duration : duration - 500,
        delay: 600,
        easing: 'easeOutQuad'
      })
    },
    hide() {
      this.isShown = false
      clearTimeout(this.wordsTimer)
      if(this.mainAnim)this.mainAnim.pause()
      anime({
        targets: this.lines,
        opacity: 0,
        duration: 500,
        easing: 'easeOutQuad'
      })

      anime({
        targets: this.link,
        translateY: 50,
        translateX: ['-50%', '-50%'],
        opacity: 0,
        duration: 400,
        easing: 'easeOutQuad'
      })
    },
    nextWord() {
      this.currentWord++
      if(this.currentWord === this.words.length)this.currentWord = 0
      this.wordsTimer = setTimeout(this.nextWord.bind(this), 500)
    }
  },
  beforeDestroy() {
    if(this.wordsTimer) clearTimeout(this.wordsTimer)
  },
  mounted() {
    transform(this.$refs.big, {translateX: 100  +'%'})
    this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
    this.spacers = [].slice.call(this.$el.querySelectorAll('.spacer'))
    this.rights = [].slice.call(this.$el.querySelectorAll('.right'))
    this.left = [].slice.call(this.$el.querySelectorAll('.left'))
    this.link = this.$el.querySelector('.link')
    anime.set(this.lines, {opacity: 0})
    anime.set(this.link, {opacity: 0})
  }
}
</script>

<style lang="stylus" scoped>
footer
  position relative
  padding-top 7vw
  margin-top 7vw
  overflow hidden
  width 100%
.mail
  display none
.big
  font-size 11.5vw
  line-height 1
  text-align right
  font-weight normal
  display block
  position absolute
  right 0
  top -1.3vw
  z-index 1
.content
  background #EAE9E5
  position relative
  padding-top 5vw
  width 100%
  .link
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    font-family $schnyder
    font-weight $demi
    font-size 30px
    line-height 1.4
    display block
    color $white
    &:after
      content ''
      backface-visibility hidden
      border-bottom 1px solid #fff
      width 100%
      background $white
      position absolute
      bottom 0
      left 0
  .img
    position relative
    margin 0 auto
    width 35%
.top
  pointer-events none
  width 100%
  height 43vw
  position absolute
  top 100%
  left 50%
  padding 0 8vw
  transform translate(-50%, -100%)
  display flex
  align-items center
  >div
    width 100%
    padding-top 2vw
  p
    margin 0
  .line
    display flex
    justify-content center
    align-items center
    font-size 1.8vw
    line-height 1
    span
      display block
    & + .line
      margin-top 10vw
  .left, .right
    width 12vw
  .left
    text-align right
  .spacer
    height 1px
    width 62vw
    margin 0 2vw
    background $black
footer
  +below('l')
    height 100vh
    .content
      padding 10vh 0 15vh
      .top
        display none
      .img
        width 90%
    .mail
      display block
      padding 5vh 0
      text-align center
      text-transform uppercase
      opacity 0.65
  +below('s')
    height 103vh
    .content
      padding 10vh 0 15vh
</style>
