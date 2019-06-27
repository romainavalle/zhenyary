

<script>
if(process.browser) {
  var classie = require('desandro-classie')
}
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
            classie.remove(anim.el, 'mobile-anime')
            classie.remove(anim.el, 'mobile-anime-top')
          }
        }
        if(anim.offset + anim.height < scrollTop - this.h) {
          if(anim.shown) {
            anim.shown = false
            classie.add(anim.el, 'mobile-anime')
            classie.add(anim.el, 'mobile-anime-top')
          }
        }
        if(anim.offset > scrollTop ) {
          if(anim.shown) {
            anim.shown = false
            classie.add(anim.el, 'mobile-anime')
          }
        }
      })
    },
    setupMobile(){
      this.anims = []
      const anims = [].slice.call(this.$el.querySelectorAll('.mobile-anime'))
      anims.forEach((el)=>{
        classie.add(el, 'mobile-trans')
        this.anims.push({el})
      })
    }
  }
}
</script>

<style>

</style>
