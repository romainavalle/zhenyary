<template>
  <component :is="is" v-bind="linkProps" @mouseenter.native="onMouseEnter" @mouseleave.native="onMouseLeave" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" :class="{'hover': isHover}" class="link"><slot></slot></component>
</template>

<script>
export default {
  data() {
    return {
      isHover: false,
      isTimerDone: false,
      isLeaveRequested: false
    }
  },
  props: ['to'],
  computed: {
    is() {

      if (typeof(this.to) === 'string') {
        return 'a'
      }
      return 'nuxt-link'
    },
    linkProps () {
      if (typeof(this.to) === 'string') {
        return {
          href: this.to,
          target: this.to.indexOf('mailto') === -1 ? '_blank' : '_parent',
          rel: 'noopener'
        }
      }
      return {
        to: this.to
      }
    }
  },
  methods: {
    onMouseEnter() {
      if(this.isHover) return
      this.isHover = true
      this.isTimerDone = false
      this.timer = setTimeout(() => { this.isTimerDone = true; this.doOut()}, 1000)
    },
    onMouseLeave() {
      this.isLeaveRequested = true
      this.doOut()
    },
    doOut() {
      if(!this.isLeaveRequested || !this.isTimerDone) return
      this.isHover = false
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
}
</script>

<style lang="stylus" scoped>
.no-touch .link.hover
  &:after
    animation-name link
    animation-duration 1s
    animation-timing-function ease-out-quad
    will-change transform

@keyframes link
  0%
    transform-origin 100% 0
    transform scale3d(1, 1, 1)
  0.1%
    transform-origin 100% 0
    transform scale3d(1, 1, 1)
  50%
    transform-origin 100% 0
    transform scale3d(0, 1, 1)
  50.1%
    transform-origin 0% 0
    transform scale3d(0, 1, 1)
  100%
    transform-origin 0% 0
    transform scale3d(1, 1, 1)

</style>
