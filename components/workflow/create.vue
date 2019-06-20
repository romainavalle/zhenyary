<template>
  <article>
    <div class="title">
      <span>C.</span>
      <h2 ref="title">Create</h2>
      <span ref="number">03</span>
    </div>
    <div class="content">
      <h3><no-ssr><div class="bar" aria-hidden="true" ref="bar"></div></no-ssr> UX strategy <small class="red">/ brand strategy</small><br>Visual strategy</h3>
      <p>To succeed, every digital product has to be aesthetically appealing, functional, robust, distinctive and memorable. To ensure that the right balance of these components is maintained I always stay in close contact with the client and address every project holistically.</p>
      <v-svg-star class="star"/>
      <ul>
        <li>product</li>
        <li>creation</li>
        <li>stage</li>
      </ul>
    </div>
  </article>
</template>

<script>
import vSvgStar from "~/assets/svgs/star.svg?inline";
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  components: {
    vSvgStar
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
      this.animHeight = this.h * .5
      this.offset = offset(this.$el).top - this.h * .9
    },
    tick(scrollTop, ease) {
      if(ease > this.offset && ease < this.offset + this.animHeight){
        const coef = (ease - this.offset) / this.animHeight
        this.$el.style.opacity = coef
        transform(this.$el, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.bar, {scaleX: coef })
        transform(this.$refs.title, {translate3d:[0, 200 - coef * 200, 0]})
        transform(this.$refs.number, {translate3d:[0, 400 - coef * 400, 0]})
      }
    }
  },
  mounted() {
    if(!this.isPhone)this.$el.style.opacity = 0
  }
}
</script>

<style lang="stylus" scoped>

article
  display flex
  padding 0 8vw 4vw
  justify-content space-between
  .title
    width 30%
  .content
    width 51%
    padding-right 20%
h3
  font-size 4.1vw
  font-family $schnyder
  font-weight $demi
  position relative
  padding-top 2vw
  .bar
    width 100%
    height 0.2vw
    background $black
    position absolute
    top 0
    left 0
    transform-origin 0 0
  small
    font-family $walsheim
    font-weight $light
    font-size 0.9vw
p
  padding-top 2vh
  padding-bottom 5vh
.star
  fill $red
  width 3vw
  height 3vw
  margin-left -1.5vw
li
  font-size 4.1vw
  font-family $schnyder
  font-weight $demi
  line-height 1

</style>
