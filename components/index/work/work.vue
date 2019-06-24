<template>
  <article class="work">
    <div class="inner">
      <div class="left">
        <div class="img" ref="leftImgContainer">
          <img :src="`${path}${work.cover}`" :alt="work.title" ref="img">
        </div>
        <div class="text">
          <h3 class="h3"  v-html="work.title" ref="title" :class="{'mobile-anime': isPhone}"></h3>
          <p class="type"  v-text="work.type" ref="type" :class="{'mobile-anime': isPhone}"></p>
        </div>
      </div>
      <div class="right">
        <div class="text">
          <p v-html="work.title" ref="rTitle" class="title"  :class="{'mobile-anime': isPhone}"></p>
          <ul ref="skills"  :class="{'mobile-anime': isPhone}">
            <li v-for="(skill, index) in work.skills" :key="`skill-${index}`" v-text="index === 0 ? skill : ` / ${skill}`" class="strong"></li>
          </ul>
          <p v-html="work.intro" class="intro" ref="intro" :class="{'mobile-anime': isPhone}"></p>
          <nuxt-link :to="{name: 'works-slug', params: {slug: work.slug}}" ref="link" :class="{'mobile-anime': isPhone}">Check full case +</nuxt-link>
        </div>
        <no-ssr>
          <div class="img" ref="rightImgContainer" v-if="!isPhone">
            <img :src="`${path}${work.homeMenu}`" :alt="work.title" ref="rightImg">
          </div>
        </no-ssr>
      </div>
    </div>
    <div class="letter-container" ref="letter">
      <div class="letter" v-text="letter"></div>
    </div>
  </article>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h: 0,
      coef: -1
    }
  },
  props: ['work', 'id'],
  computed: {
    ...mapState(['path']),
    ...mapGetters(['isPhone']),
    letter() {
      return this.work.title.charAt(0)
    }
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h
    },
    tick(scrollTop, ease) {
      if(this.isPhone)  {
        let coef = 0
        if(ease >= this.offset) coef = (ease-this.offset) / this.h
        coef = Math.min(1, coef)
        transform(this.$refs.img, {scale3d:[1.5-coef * .5,1.5-coef * .5, 1]})
      }else {
        let coef = 0
        if(ease>=this.offset) coef = (ease-this.offset) / this.h
        if(this.id === 0 && coef >1) {
          transform(this.$refs.letter, {translate3d:[0, (coef -1) * this.h * .8,0]})
          this.$refs.letter.style.opacity = 2 + (1 - coef * 2)
        }
        coef = Math.min(1, coef)
        if(coef !== this.coef) {
          transform(this.$refs.leftImgContainer, {scale3d:[1.5-coef * .5,1.5-coef * .5, 1]})
          transform(this.$refs.rightImgContainer, {translate3d:[0, -this.h * .7  + coef * this.h * .7 , 0]})
          transform(this.$refs.title, {translate3d:[0, this.h * .3 - coef * this.h * .3, 0]})
          transform(this.$refs.rightImg, {scale3d:[1.25-coef * .25,1.25-coef * .25, 1]})
          this.$refs.title.style.opacity = Math.max(0, -4 + coef * 5)
          this.$refs.type.style.opacity = Math.max(0, -4 + coef * 5)
          this.$refs.rTitle.style.opacity = Math.max(0, -1 + coef * 2)
          this.$refs.skills.style.opacity = Math.max(0, -1.5 + coef * 2.5)
          this.$refs.intro.style.opacity = Math.max(0, -3 + coef * 4)
          this.$refs.link.$el.style.opacity = Math.max(0, -4 + coef * 5)
          this.$refs.letter.style.opacity = Math.max(0, -1 + coef * 2)
          if(this.id === 1) transform(this.$refs.letter, {translate3d:[0, -this.h*.8 + (coef) * this.h *.8,0]})
          this.coef = coef
        }
      }
        /*let top = 0
        if(scrollTop >= this.offset + this.h) {
          top = scrollTop - (this.offset + this.h)
        }
        top = Math.min(top, this.h * .5)
        transform(this.$el, {translate3d:[0, top, 1]})*/


    },
    easeOutQuad: function (t) { return t*(2-t) }
  },
  mounted(){

  }
}
</script>

<style lang="stylus" scoped>
.work
  width 100%
  height 100vh
  position relative
.inner
  display flex
  display flex
  height 100vh
  width 100%
.letter-container
  position absolute
  top 50%
  left 50%
.letter
  font-size 10vw
  text-align center
  width 8vw
  font-weight $light
  color $black
  transform translate(-50%, -50%)
.left,
.right
  width 50%
  height 100%
  position relative
  overflow hidden
.left
  background $white
  .img
    width 50%
    height 60vh
    overflow hidden
    margin 20vh auto 0
  img
    object-fit cover
    width 100%
    height 100%
  .text
    height 20vh
.right
  background $grey
  .img
    width 100%
    height 30vh
    overflow hidden
    position absolute
    bottom 0

.right .text
  width 40%
  left 50%
  height 30vh
  position absolute
  top 30vh
.title
  font-size 1.8vw
  margin-bottom 10px
.h3
  font-size 3.1vw
  font-family $schnyder
  font-weight $demi
  text-align center
  line-height .9
  width 40%
  margin -20px auto
  text-transform uppercase
.type
  font-size 20px
  font-family $schnyder
  font-weight $demi
  text-align center
  position absolute
  bottom 3vh
  left 25%
  width 50%
  color $black
ul li
  display inline
.intro
  width 50%
  padding 50px 0
a
  font-family $schnyder
  font-weight $demi
  font-size 1.8vw
.work + .work
  color $white
  .left
    background $brown
  .right
    background $red
.work
  +below('l')
    .letter
      display none
    .right .text
      position relative
      width 70%
      padding-top 10vh
      left auto
      top auto
      height auto
      margin 10px auto
    .left .img
      width 70%
    p
      margin 10px auto
  +below('s')
    padding 40px 0
    height auto
    text-align center
    background $white
    .left, .right
      background none
    .inner
      display block
      height auto
    .right .text
      position relative
      width 70%
      left auto
      top auto
      height auto
      margin 10px auto
      padding-top 0
    .title
      display none
    .h3, .type
      position relative
      width 90%
      margin 10px auto
      top auto
      left auto
      bottom auto

    .left
      .img
        width 90%
        position relative
        margin 0 auto
        overflow hidden
      .text
        height auto
        padding-top 10px
    .right .img
      display none
    .left, .right
      width 100%
      height auto
    p
      margin 10px auto

    & + .work
      background $red
      .left, .right
        background none

</style>
