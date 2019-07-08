

<script>
if(process.browser) {
  var classie = require('desandro-classie')
}
import anime from 'animejs'
import offset from '~/assets/js/utils/offset'
export default {
  data() {
    return {
      anims:[]
    }
  },
  methods: {
    resizeMobile() {
      this.anims.forEach((anim)=>{
        anim.offset = offset(anim.el).top - this.h
        anim.height = anim.el.clientHeight
      })

    },
    tickMobile(scrollTop) {
      if(!this.isShown) return

      this.anims.forEach((anim)=>{
        if(anim.offset < scrollTop && anim.offset + anim.height > scrollTop - this.h) {

          if(!anim.shown) {
            anim.shown = true
            //classie.add(anim.el, 'mobile-show')
            anim.anime = anime({targets: anim.el, translateY: 0, opacity: 1, duration:900, easing: 'easeOutQuad', delay: 100})
          }
        }
        if(anim.offset + anim.height < scrollTop  - this.h) {
          if(anim.shown) {
            anim.shown = false
            //classie.add(anim.el, 'mobile-anime-top')
            //classie.remove(anim.el, 'mobile-show')
            anim.anime.pause()
            anime.set(anim.el, {translateY: -50, opacity: 0})
          }
        }
        if(anim.offset > scrollTop ) {
          if(anim.shown) {
            anim.shown = false
            anim.anime.pause()
            anime.set(anim.el, {translateY: 50, opacity: 0})
            //classie.remove(anim.el, 'mobile-show')
          }
        }
      })
    },
    setupMobile(){
      this.anims = []
      const anims = [].slice.call(this.$el.querySelectorAll('.mobile-anime'))

      anims.forEach((el)=>{
        this.anims.push({el})
        anime.set(el, {translateY: 50, opacity: 0})
      })
    }
  }
}
</script>

<style>

</style>
