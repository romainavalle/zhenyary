<template>
  <main :class="{ 'no-touch': !isTouch}" class="error">
    <no-ssr>
      <v-turn v-if="isDevice"></v-turn>
    </no-ssr>
    <span>Bring me back</span>
    <nuxt-link :to="{name: 'index'}">Bring me back</nuxt-link>
    <nuxt/>
  </main>
</template>
<script>
import Emitter from '~/assets/js/events/EventsEmitter'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import { mapGetters } from 'vuex';
import vTurn from '~/components/common/turn.vue'
import Matter from 'matter-js'
export default {
  data() {
    return {
      isTouch: false,
    }
  },
  computed: {
    ...mapGetters(['isDevice'])
  },
  components: {
  },
  methods:{
     resize(){
      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      const ratioW = w/800
      const ratioH = h/600
      this.Render.lookAt(this.render, {
        min: { x: 0, y: 0 },
        max: { x: 800 , y: 600 }
    });
    this.render.canvas.width = w
    this.render.canvas.height = h

    },
    tick(){
    },


  },
  mounted() {

const w = window.innerWidth
const h = window.innerHeight
     var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Common = Matter.Common,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Events = Matter.Events;
        this.Render = Render

    // create engine
    this.engine = Engine.create()
    let    world = this.engine.world;

    // create renderer
    this.render = Render.create({
        element: this.$el,
        engine: this.engine,
        options: {
            width: w,
            height: h,
            wireframes: false,
            showAngleIndicator: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio
        }
    });

    Render.run(this.render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, this.engine);

    // add bodies
    var stack = Composites.stack(90, 50, 15, 15, 0, 0, function(x, y) {
        return Bodies.circle(Common.random(0,1) * 600 + 50, Common.random(0,1) * 500, 20, {
          restitution: 0,
          isStatic: false,
          frictionAir: 0.03,
          render: {
              fillStyle: 'purple',
              strokeStyle: 'red',
              visible: true,
              sprite: {
                  texture: '/images/smiley.png',
                  xScale: 0.6,
                  yScale: 0.6
              }
          }
        });
    });

    World.add(world, [
        // walls
        Bodies.rectangle(400, -50, 800, 100, { isStatic: true, render:{visible:false} }),
        Bodies.rectangle(400, 600, 800, 100, { isStatic: true, render:{visible:false} }),
        Bodies.rectangle(-50, 300, 100, 600, { isStatic: true, render:{visible:false} }),
        Bodies.rectangle(850, 300, 100, 600, { isStatic: true, render:{visible:false} }),
        Bodies.rectangle(400, 300, 200, 50, { isStatic: true, render:{visible:false} }),
        stack
    ]);
    var attractiveBody = Bodies.circle(
      this.render.options.width / 2,
      this.render.options.height / 2,
      60,
      {
        render: {
          fillStyle: `rgb(240,240,240)`,
          strokeStyle: `rgb(240,240,240)`,
          lineWidth: 0,
              visible: false,
              sprite: {
                  texture: '/images/smiley.png',
                  xScale: 0.6,
                  yScale: 0.6
              }
        },
        isStatic: true,
      });

    World.add(world, attractiveBody);

    // add mouse control
    var mouse = Mouse.create(this.render.canvas),
        mouseConstraint = MouseConstraint.create(this.engine, {
            mouse: mouse,

            constraint: {
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);
    Events.on(this.engine, 'afterUpdate', function() {
        if (!mouse.position.x) return;
        // smoothly move the attractor body towards the mouse
        Body.translate(attractiveBody, {
            x: (mouse.position.x - attractiveBody.position.x) * .12,
            y: (mouse.position.y - attractiveBody.position.y) * .12
        });
    });

    // keep the mouse in sync with rendering
    this.render.mouse = mouse;



    // context for MatterTools.Demo


    this.isTouch = this.isDevice
    Emitter.on('GLOBAL:RESIZE', this.resize.bind(this))
    this.resize()
  }
}
</script>
<style lang="stylus" scoped>
main
  position relative
  height 100%
  width 100%
  background #000000
  a,span
    font-size 4vw
    text-align center
    color $black
    position absolute
    border-bottom 3px solid #000
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 1
    user-select none
  a
    opacity 0
    z-index 2
</style>
<style lang="stylus">
canvas
  position absolute
  width 100%
  height 100%
  top 0
  left 0
  z-index 1
</style>


