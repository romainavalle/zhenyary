<template>
  <div class="work-link">
    <span class="number" v-text="getId"  :class="{'wide': worksById[work].menuNumberUnderline}"></span>
    <nuxt-link :to="{name: 'works'}" v-html="worksById[work].title" :class="{'underline': worksById[work].menuUnderline, 'italic': worksById[work].menuItalic}" @mouseover.native="onMouseEnter(id)"></nuxt-link>
  </div>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import { mapState } from 'vuex';
import anime from 'animejs'
export default {
  props: ['work', 'id'],
  computed:{
    ...mapState(['worksById']),
    getId() {
      const thisId = this.id + 1
      return thisId < 10 ? `0${thisId}` : thisId
    }
  },
  methods: {
    onMouseEnter(id) {
      Emitter.emit('WORK:MOUSEENTER', this.id)
    },
    hideWork() {
      if(this.worksOpacity)this.worksOpacity.pause()
      this.worksOpacity = anime({
        targets: this.$el,
        opacity: .3,
        duration: 500,
        easing: 'easeOutQuad'
      })
    },
    showWork() {
      if(this.worksOpacity)this.worksOpacity.pause()
      this.worksOpacity = anime({
        targets: this.$el,
        opacity: 1,
        duration: 300,
        easing: 'easeInQuad'
      })
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.work-link
  display flex
  align-items center
  font-size 8.8vw
  line-height 1
  color $red
  .number
    font-size 1vw
    margin-right 2vw
    line-height 2
    font-family $walsheim
    font-weight $light
    letter-spacing 3px
    display block
    &.wide
      border-bottom 0.2vw solid $red
      width 13vw
      text-align center
      margin-right 4vw
  a
    display flex
    align-items baseline
  .underline
    border-bottom 0.2vw solid $red
  +below('l')
    margin-top 3vh
    font-size 10vw
    display block
    text-align center
    .number,
    a
      display inline
    .number
      vertical-align bottom
      font-size 14px
    .number.wide
      border-bottom none
      width auto
      text-align left
      margin-right 2vw
  +below('s')
    display flex
    align-items baseline
    text-align left
    .number
      display block
      margin-right 4vw

</style>
