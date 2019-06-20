<template>
 <footer>
   <strong class="big">So, no more words</strong>
   <div class="content">
     <div class="img">
       <img src="/images/workflow.jpg" alt="zhenya">
       <nuxt-link :to="{name:'contact'}" class="link">Contact Me</nuxt-link>
     </div>
     <div class="top">
       <div>
         <p class="line"><span>let's make</span> <span class="spacer"></span><span>a wonderfull</span></p>
         <p class="line"><span class="red">website</span> <span class="spacer"></span><span>together</span></p>
       </div>
     </div>
   </div>
 </footer>
</template>

<script>
export default {
  data() {
    return {
      w: 0,
      h:0
    }
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
footer
  position relative
  margin-top 7vw
.big
  font-size 11.5vw
  line-height 1
  text-align right
  font-weight normal
  display block
  position absolute
  right 0
  top -8vw
  z-index 1
.content
  background #EAE9E5
  position relative
  padding-top 5vw
  width 100%
  a
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
      height 1px
      width 100%
      background $white
      position absolute
      bottom 0
      left 0
  .img
    position relative
    margin 0 auto
    width 40%
.top
  pointer-events none
  width 100%
  height 51vw
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
    justify-content space-between
    align-items center
    font-size 1.8vw
    line-height 1
    span
      display block
    & + .line
      margin-top 10vw
  .spacer
    height 1px
    flex 1
    margin 0 2vw
    background $black
</style>
