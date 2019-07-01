<template>
  <div>
  </div>
</template>
<script>
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import { mapGetters } from 'vuex';
import vTurn from '~/components/common/turn.vue'
import Matter from 'matter-js'
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    ...mapGetters(['isDevice'])
  },
  components: {
  },
  methods:{
     resize(w,h){
      this.w = w || ResizeHelper.width()
      this.h = h || ResizeHelper.height()
      if(this.render) {
        this.render.canvas.width = this.w
        this.render.canvas.height = this.h
      }
    },
    addItem() {
      Matter.World.add(this.world, [
        Matter.Bodies.circle(Matter.Common.random(0,1) * (this.w - 100) + 50, -100, 35, {
          isStatic: false,
          friction: .5,
          frictionAir: 0,
          scaleX: 2,
          restitution: .5,
          mass:6,
          render: {
            fillStyle: 'purple',
            strokeStyle: 'red',
            visible: true,
            sprite: {
              texture: '/images/smiley.png',
            }
          }
        })
      ])
      this.count++
    if(this.count < 250)setTimeout(this.addItem.bind(this), 30)
    }
  },
  beforeDestroy() {
    Matter.Render.stop(this.render); // this only stop renderer but not destroy canvas
    Matter.World.clear(this.engine.world);
    Matter.Engine.clear(this.engine);
    this.render.canvas.remove();
    this.render.canvas = null;
    this.render.context = null;
    this.render.textures = {};
  },
  mounted() {
    this.resize()

    // create engine
    this.engine = Matter.Engine.create()
    this.world = this.engine.world;

    // create renderer
    this.render = Matter.Render.create({
      element: this.$el,
      engine: this.engine,
      options: {
        width: this.w,
        height: this.h,
        wireframes: false,
        showAngleIndicator: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
      }
    });

    Matter.Render.run(this.render);

    // create runner
    var runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.engine);


    Matter.World.add(this.world, [
      // walls
      Matter.Bodies.rectangle(this.w / 2, this.h , this.w, 300, { isStatic: true, render:{visible: false} }),
      Matter.Bodies.rectangle(-50, this.h/2, 100, this.h, { isStatic: true, render:{visible: false} }),
      Matter.Bodies.rectangle(this.w+50, this.h/2, 100, this.w, { isStatic: true, render:{visible: false} }),
      Matter.Bodies.rectangle(this.w/2, this.h/2, this.w*.3, this.w*.1, { isStatic: true, render:{visible: false} })
    ]);
    var attractiveBody = Matter.Bodies.circle(
      this.render.options.width / 2,
      this.render.options.height / 2,
      200, {
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

    Matter.World.add(this.world, attractiveBody);

    // add mouse control
    let mouse = Matter.Mouse.create(this.render.canvas)
    let mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        render: {
            visible: false
        }
      }
    });

    Matter.World.add(this.world, mouseConstraint);
    Matter.Events.on(this.engine, 'afterUpdate', function() {
        if (!mouse.position.x) return;
        // smoothly move the attractor body towards the mouse
        Matter.Body.translate(attractiveBody, {
            x: (mouse.position.x - attractiveBody.position.x) * .12,
            y: (mouse.position.y - attractiveBody.position.y) * .12
        });
    });

    // keep the mouse in sync with rendering
    this.render.mouse = mouse;


    this.addItem()
  }
}
</script>
<style lang="stylus" scoped>
div
  height 100%
  width 100%
  position absolute
  z-index 1
</style>
<style lang="stylus">
canvas
  position absolute
  width 100%
  height 100%
  top 0
  left 0
</style>


