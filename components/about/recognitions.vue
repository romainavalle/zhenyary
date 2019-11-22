<template>
<div>

<div class="d-f">
  <div class="spacer"><button class="showreel" aria-label="showreel" v-show="!isPhone" @click="showVideo"><span>showreel</span></button></div>
  <article class="regognitions">
    <div class="title">
      <h3 class="mobile-anime">Recognitions</h3>
      <button class="showreel mobile-anime" aria-label="showreel" v-show="isPhone" @click="showVideo">showreel</button>
    </div>
    <div>
      <h4 class="mobile-anime">Awwwards <sup>x{{about.awwwards.length + 1}}</sup></h4>
      <ul class="awards" v-if="about.awwwards">
        <li class="mobile-anime">
          <strong>Zhenya Rynzhuk Folio</strong>
          <span>Site of the day, Mobile excellence, Devaward</span>
        </li>
        <li v-for="(awwward, index) in about.awwwards" :key="`awwward-${index}`" class="mobile-anime">
          <strong v-text="awwward.title"></strong>
          <span v-text="awwward.award"></span>
        </li>
      </ul>
    </div>
    <div>
      <h4 class="mobile-anime">FWA <sup>x{{about.FWA.length + 1}}</sup></h4>
      <ul class="awards" v-if="about.FWA">
        <li class="mobile-anime">
          <strong>Zhenya Rynzhuk Folio</strong>
          <span>FWA of the day</span>
        </li>
        <li v-for="(fwa, index) in about.FWA" :key="`fwa-${index}`" class="mobile-anime">
          <strong v-text="fwa.title"></strong>
          <span v-text="fwa.award"></span>
        </li>
      </ul>
    </div>
    <div>
      <h4 class="mobile-anime">Behance <sup>x{{behance}}</sup></h4>
      <ul class="behance ">
        <li v-for="(behance, index) in about.behance" :key="`behance-${index}`" class="mobile-anime">{{behance.label}} — x{{behance.num}}</li>
      </ul>
    </div>
    <div>
      <h4 class="mobile-anime">Collaborations</h4>
    </div>
  </article>
</div>
  <div class="collabs mobile-anime">

    <ul class="collaborations" ref="collabs" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <li v-for="(collab, index) in about.collaborations" :key="`collab-${index}`" v-text="collab"></li>
      <no-ssr>
      <li v-for="(collab, index) in about.collaborations" :key="`collab-${index+about.collaborations.length}`" v-text="collab"></li>
      <li v-for="(collab, index) in about.collaborations" :key="`collab-${index+about.collaborations.length * 2}`" v-text="collab"></li>
      </no-ssr>
    </ul>
</div>
</div>
</template>

<script>
import { easeInQuad } from '~/assets/js/utils/easings'
import MouseHelper from '~/assets/js/utils/MouseHelper'
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import anime from 'animejs'
import Emitter from '~/assets/js/events/EventsEmitter'
import { easeInOutQuad } from '~/assets/js/utils/easings'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h: 0,
      count: 0,
      multiplier: 1
    }
  },
  components: {
    },
  computed: {
    ...mapState(['about']),
    ...mapGetters(['isDevice', 'isPhone']),
    behance(){
      const reducer = (total, obj) => total + obj.num;
      return this.about.behance.reduce(reducer, 0)
    }
  },
  methods: {
    ...mapActions(['setVideo']),
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$el).top - this.h
      this.offsetCollabs = offset(this.$refs.collabs).top - this.h

      this.translateX = this.lastItem.offsetLeft
    },
    tick(scrollTop, ease) {
     /* if(!this.isPhone) {
        let coef = 0
        if(ease >= this.offsetCollabs && ease < this.offsetCollabs+this.h*.5) {
          coef = easeInOutQuad((ease-this.offsetCollabs) / (this.h*.5))
          transform(this.$refs.collabs, {translate3d: [-coef * this.translateX  , 0, 0]})
        }
      }*/
      this.count += 3 * this.multiplier
      if(this.count >= this.translateX)this.count = 0
      transform(this.$refs.collabs, {translate3d: [  -this.count, 0,0]})
      if(!this.isDevice) {
        const x = MouseHelper.x
        const y = MouseHelper.y + scrollTop
        const easeX = MouseHelper.easeX
        const easeY = MouseHelper.easeY + scrollTop
        const posX = this.w * .1 + 100
        const posY = this.offset + this.h + this.w * .05 + 100
        const dist = this.distance(x,y,posX,posY)

        let pourc = 0
        if(dist < 300) {
          pourc = easeInQuad(1 - (dist / 300))
          if(pourc > 1) pourc = 1
        }
        const newPosX = (x-posX) * pourc
        const newPosY = (y-posY) * pourc
        transform(this.buttonReel, {translate3d: [  newPosX , newPosY,0]})
        transform(this.buttonReelSpan, {translate3d: [  (x-posX -newPosX) * pourc , (y-posY - newPosY) * pourc,0]})
      }
    },
    showVideo() {
      this.setVideo(true)
      Emitter.emit('VIDEO_BUTTON_CLICKED')
    },
    distance(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    },
    show() {
    },
    onMouseEnter() {
      anime({targets: this, multiplier: .2, easing: 'easeInQuad'})
    },
    onMouseLeave() {
      anime({targets: this, multiplier: 1, easing: 'easeOutQuad'})
    }
  },
  mounted() {
    this.$nextTick(()=>{
      const collabs = [].slice.call(this.$refs.collabs.querySelectorAll('li'))
      this.lastItem = collabs[ this.about.collaborations.length]
    })
    this.buttonReel = this.$el.querySelector('button.showreel')
    this.buttonReelSpan = this.buttonReel.querySelector('span')

  },
}
</script>

<style lang="stylus" scoped>
.d-f
  position relative
button
  height 200px
  width 200px
  border-radius 50%
  border 1px solid $black
  font-family $schnyder
  font-weight $demi
  font-size 18px
  position absolute
  top 5vw
  left 10vw
  span
    display block

.d-f .regognitions
  padding-top 4vw
  div + div
    padding-top 4vw
sup
  font-size .5em
ul
  display block
.awards
  li + li
    padding-top 1vw
  strong
    font-weight normal
  span
    font-size .93vw
    display block
    opacity .5
.behance, .awards strong
  font-size 1.66vw
.behance li + li
  padding-top .3vw
.collaborations
  will-change transform
  font-size 1.5vw
  display flex
  li
    display inline-block
    white-space nowrap
    color $red
    padding-right 3vw
+below('l')
  button
    height 150px
    width 150px
    margin-left 50px
    margin-top 50px
    position relative
    top auto
    left auto
  .awards span
    font-size 2.3vw
  .behance, .awards strong
    font-size 4.1vw
  .regognitions
    padding-top 200px
    div + div
      padding-top 10vw
  .collaborations
    font-size 3.9vw
+below('s')
  .awards span
    font-size 14px
  .behance, .awards strong
    font-size 17pw
  .awards
    li + li
      padding-top 30px
  .regognitions
    padding-top 40px
    h4
      padding-top 5vh
    .title
      display flex
      align-items baseline
      justify-content space-between
    button
      font-size 14px
      width 100px
      height 100px
      margin-right -30px
      margin-left 0
      margin-top 0
  .collaborations
    font-size 22px
    padding-bottom 50px

</style>


