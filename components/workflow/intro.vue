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
          <p>
            <span class="line"><span>It's all about my</span> <v-svg-arrow class="arrow"/><span class="italic">design</span></span>
            <span class="line"><span class="italic">process</span><small>*how<br>the magic happens</small><ul><li><em>A.</em>Learn</li><li><em>B.</em>Think</li><li><em>C.</em>Create</li></ul></span>
          </p>
        </div>
        <strong class="strong">Scroll down for more</strong>
      </div>
    </no-ssr>
  </header>
</template>

<script>
import vSvgArrow from "~/assets/svgs/arrow-l.svg?inline";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  components: {
    vSvgArrow
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
    }
  },
  mounted() {
    if(this.isPhone) return
    this.$el.querySelector('.mobile').style.display = "none"
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
</style>
