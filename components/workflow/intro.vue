<template>
  <header>
    <div class="mobile">
      <h3>It's all about my process design</h3>
      <p>*How<br>the magic happens</p>
      <ul>
        <li>Learn</li>
        <li>Think</li>
        <li>Create</li>
      </ul>
    </div>
    <no-ssr>
      <div class="desktop" v-if="!isPhone">

        <div class="d-f">
          <p ref="te">
            <v-svg-smiley class="smiley"/>
            <span class="line"><span>It's all about my</span> <v-svg-arrow class="arrow"/><span class="italic">design</span></span>
            <span class="line"><span class="italic">process</span><small>*how<br>the magic happens</small><ul><li><em>A.</em><span :class="{'red': words[0]}">Learn</span></li><li><em>B.</em><span :class="{'red': words[1]}">Think</span></li><li><em>C.</em><span :class="{'red': words[2]}">Create</span></li></ul></span>
          </p>
        </div>
        <button class="strong" @click="scrollTo" ref="button" :disabled="buttonClicked">Scroll down for more</button>
      </div>
    </no-ssr>
  </header>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow-l.svg?inline";
import vSvgSmiley from "~/assets/svgs/smiley.svg?inline";
import anime from 'animejs'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import transform from 'dom-transform'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0,
      isShown: false,
      isActive: false,
      currentWord: -1,
      buttonClicked: false,
      words: [false, false, false],
    }
  },
  components: {
    vSvgArrow, vSvgSmiley
  },
  computed: {
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop, ease) {
      if(!this.isShown) return
      if(scrollTop > this.h) {
        if(this.active) this.reset()
      }else{
        if(!this.active)this.activateWords()
      }
      if(scrollTop > this.h) return
      const op = 1 - scrollTop / (this.h  /2)
      this.lines.forEach((line, i)=>{
        transform(line, {translate3d:[0, .1 * (i - 2) * scrollTop, 0]})
        line.style.opacity = op
      })
      this.smiley.style.opacity = op
    },
    scrollTo() {
      this.buttonClicked = true
      ScrollHelper.scrollTo(this.h * .7)

      anime({
        targets: this.$refs.button,
        opacity: 0,
        translateY: 0,
        duration: 300,
        easing: 'easeOutQuad'
      })
    },
    reset() {
      this.active = false
      clearTimeout(this.wordsTimer)
      this.words.forEach((element,i) => {
        this.$set(this.words, i, false)
      });
    },
    show() {
      anime({
        targets: this.lines,
        opacity: 1,
        translateY: 0,
        scaleY: 1,
        duraction: 700,
        easing: 'easeOutQuad',
        delay: anime.stagger(300)
      })
      anime({
        targets: this.smiley,
        opacity: 1,
        duraction: 700,
        easing: 'easeOutQuad',
        delay: 500,
        complete: ()=>{
          this.isShown = true
          this.activateWords()
        }
      })
    },
    activateWords() {
      this.animateWords()
      this.active = true
    },
    animateWords() {
      this.currentWord++
      if(this.currentWord === this.words.length * 3) this.currentWord = 0
      this.$nextTick(()=>{
        if((this.currentWord - this.words.length) % 3 >= 0)this.$set(this.words,(this.currentWord - this.words.length) % 3, false)
        if(this.words[this.currentWord] < this.words.length)this.$set(this.words,this.currentWord, true)
      })
      this.wordsTimer = setTimeout(this.animateWords.bind(this), 400)
    }
  },
  beforeDestroy() {
    clearTimeout(this.wordsTimer)
  },
  mounted() {
    if(this.isPhone) return
    this.$el.querySelector('.mobile').style.display = "none"
    this.$nextTick(()=>{
      this.lines = [].slice.call(this.$el.querySelectorAll('.line'))
      this.smiley = this.$el.querySelector('.smiley')
      anime.set(this.lines, {
        opacity: 0,
        translateY: 200,
        scaleY: 1.5
      })
      anime.set(this.smiley, {
        opacity: 0
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
.desktop
  width 100%
  height 100vh
  position relative
.d-f
  padding 0 8vw 0
  display flex
  align-items center
  width 100%
  height 100%
p
  width 100%
  font-size 7.8vw
  font-family $schnyder
  font-weight $demi
  line-height 1
  margin 0
  position relative
.strong
  position absolute
  bottom 3vh
  left 50%
  transform translate(-50%, -50%)
.arrow
  width 12vw
  height 3.6vw
  display block
  fill $black
.line
  display flex
  justify-content space-between
  align-items baseline
  transform-origin 0 0
  position relative
  & + .line
    margin-top 3vh

small
  display block
  font-size 1.2vw
  text-transform uppercase
  font-family $walsheim
  font-weight $light
  align-self flex-end
  line-height 1.2
  padding-bottom .5vw
  width 6.2vw
ul
  font-size 5.2vw
  display flex
  justify-content space-between
li
  display flex
  align-items baseline
  span
    display block
    transition transform .3s ease-out-quad,  color .3s ease-out-quad
    &.red
      transform translateY(-.5vw)
  & + li
    padding-left 2vw
em
  display block
  font-size 1.5vw
  text-transform uppercase
  font-family $walsheim
  font-weight 400
  color $red
  font-style normal
  padding-right .5vw
.smiley
  width 8vw
  height 8vw
  display block
  position absolute
  top -5vw
  left 15vw
</style>
