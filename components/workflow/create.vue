<template>
  <article>
    <div class="title">
      <span>C.</span>
      <h2>Create</h2>
      <span>03</span>
    </div>
    <div class="content">
      <h3>UX strategy <small class="red">/ brand strategy</small><br>Visual strategy</h3>
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
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
    },
    tick(scrollTop, ease) {
    }
  },
  mounted() {
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
  &:before
    content ''
    width 100%
    height 0.2vw
    background $black
    position absolute
    top 0
    left 0
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
