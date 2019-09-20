<template>
  <canvas></canvas>
</template>

<script>
import anime from 'animejs'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      particles: []
    }
  },
  methods: {
    ...mapActions(['setFirstTime', 'setFirstLoaderDone']),
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      if(this.canvas) {
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.offScreenCanvas.width = this.w
        this.offScreenCanvas.height = this.h
      }
    },
    tick() {
      if(!this.offScreenCtx) return
      this.offScreenCtx.globalCompositeOperation = 'source-over';
      this.offScreenCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.offScreenCtx.globalCompositeOperation = 'destination-out';
      this.particles.forEach(particle => {
        this.drawParticle(particle)
      });
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.drawImage(this.offScreenCanvas, 0, 0);
    },
    drawParticle(particle) {
      this.offScreenCtx.beginPath();
      this.offScreenCtx.arc(particle.posX, particle.posY, particle.radius * particle.scale, 0, Math.PI*2, true);
      this.offScreenCtx.closePath();
      this.offScreenCtx.fill();
    },
    setupCanvas() {
      this.canvas = this.$el
      this.context = this.canvas.getContext('2d');
      this.offScreenCanvas = document.createElement('canvas')
      this.offScreenCtx = this.offScreenCanvas.getContext('2d');
      this.offScreenCtx.fillStyle = "black";
      const maxSize = this.w > this.h
      const radius = Math.max(this.w, this.h ) / 7
      const num = 5
      for (let index = 0; index < num * num; index++) {
        const endX = (this.w ) / num * (index % num) + radius / 2
        const endY = (this.h ) / num * Math.floor(index / num) + radius / 2
        const particle =  {
          posX: this.w * Math.random() ,
          posY:this.h * Math.random(),
          endX,
          endY,
          radius: radius + Math.random() * radius * .4,
          scale: 0
        }
        this.particles.push(particle)
      }
      this.resize()
      anime({
        targets: this.particles,
        posX: {value: el => el.endX, easing: 'easeOutQuad', duration: 1000 + Math.random() * 2500},
        posY:  {value: el => el.endY, easing: 'easeOutQuad', duration: 1000 + Math.random() * 2500},
        scale: {value: 1.1 + Math.random() * .3, easing: 'easeOutQuad', duration: 1000 + Math.random() * 2500},
        delay: anime.stagger(300, {grid: [num, num], from: 'center'}),
        duration: 2000,
        easing: 'easeOutQuad',
        complete: () => {this.setFirstLoaderDone()}
      })
      setTimeout(()=>{
        this.setFirstTime()
      },100)
    }
  },
  beforeDestroy() {
    this.offScreenCtx = null
    this.ctx = null
  },
  mounted() {
    setTimeout(this.setupCanvas.bind(this), 1500)
  }
}
</script>

<style lang="stylus" scoped>
canvas
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  pointer-events none
  z-index 10
</style>

