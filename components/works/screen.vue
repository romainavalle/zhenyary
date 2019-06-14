<template>
  <div class="screen">
    <div>
      <v-line class="line" v-for="(works, index) in lines" :key="`line-${index}`" :works="works" :id="id  * lines.length + index" ref="lines"/>
    </div>
  </div>
</template>

<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import vLine from '~/components/works/line.vue'
import anime from 'animejs'
import { mapGetters } from 'vuex';
export default {
  props: {'id': Number, 'lines': Array},
  components: {
    vLine
  },
  computed: {
    ...mapGetters(['isDevice'])
  },
  methods: {
    hideWorks() {
      this.$refs.lines.forEach(line => {
        line.hideWorks()
      });
    },
    showWorks() {
      this.$refs.lines.forEach(line => {
        line.showWorks()
      });
    },
    showLines(direction ) {
      anime({
        targets:  this.$refs.lines.map(el => el.$el),
        translateY: [direction === 1 ? 200 : -200, 0],
        scaleY: 1,
        transformOrigin:  [direction === 1 ? '0 0' : '0 100%','0 50%'],
        duration: 500,
        opacity: 1,
        easing: 'easeOutQuad',
        delay: anime.stagger(200, {from: direction === 1 ? 'first' : 'last'}),
        complete: ()=>{
          this.$el.style.pointerEvents = 'auto'
          Emitter.emit('SCREEN:SHOWCOMPLETE', this.id)
        }
      })
    },
    hideLines(direction, start) {
      this.$el.style.pointerEvents = 'none'
      anime({
        targets: this.$refs.lines.map(el => el.$el),
        translateY: direction === 1 ? -200 : 200,
        scaleY: 1.5,
        transformOrigin: direction === 1 ? '0 100%' : '0 0',
        duration: 300,
        opacity: 0,
        easing: 'easeInQuad',
        delay: anime.stagger(100, {start, from: direction === 1 ? 'first' : 'last'}),
        complete: ()=>{
          Emitter.emit('SCREEN:HIDECOMPLETE', this.id)
        }
      })
    }
  },
  mounted() {
    if(this.isDevice)return
     anime.set( this.$refs.lines.map(el => el.$el), {
        translateY: 200,
        scaleY: 1.5,
        transformOrigin: '0 0',
        opacity: 0
      })
    this.$el.style.pointerEvents = 'none'
  },
}
</script>

<style lang="stylus" scoped>
.screen
  width 100%
  height 100vh
  position absolute
  top 0
  left 0
  display flex
  align-items center
  +below('l')
    width 100%
    height auto
    position relative
    top auto
    left auto
    display block
    padding 0 12vw
    margin-left -4vw
  +below('s')
    margin-left 0
</style>
