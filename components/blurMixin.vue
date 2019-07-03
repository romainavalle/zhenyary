<script>
import anime from 'animejs'
export default {
  methods: {
    doBlur(multiplier = 1) {
      if(this.isDevice) return
      const duration = 50 + Math.random() * 50
      const delay = Math.random() * 100
      this.blurAnime = anime({
        targets: '.inner-blur',
        translateX: () => { return anime.random(-4, 4) * multiplier; },
        translateY: () => { return anime.random(-4, 4) * multiplier; },
        duration: duration,
        easing: 'easeOutQuad',
        delay,
        direction: 'alternate',
        loop: 1,
        complete: this.doBlur.bind(this, multiplier),
      })
    }
  },
  beforeDestroy() {
    if(this.blurAnime)this.blurAnime.pause()
  },
}
</script>
