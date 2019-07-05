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

