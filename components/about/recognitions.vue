<template>
<div class="d-f">
  <div class="spacer"><button class="showreel mobile-anime" aria-label="showreel" v-show="!isPhone">showreel</button></div>
  <article class="regognitions">
    <div class="title">
      <h3 class="mobile-anime">Regognitions</h3>
      <button class="showreel mobile-anime" aria-label="showreel" v-show="isPhone">showreel</button>
    </div>
    <div>
      <h4 class="mobile-anime">Awwwards</h4>
      <ul class="awards" v-if="about.awwwards">
        <li v-for="(awwward, index) in about.awwwards" :key="`awwward-${index}`" class="mobile-anime">
          <strong v-text="awwward.title"></strong>
          <span v-text="awwward.award"></span>
        </li>
      </ul>
    </div>
    <div>
      <h4 class="mobile-anime">FWA</h4>
      <ul class="awards" v-if="about.FWA">
        <li v-for="(fwa, index) in about.FWA" :key="`fwa-${index}`" class="mobile-anime">
          <strong v-text="fwa.title"></strong>
          <span v-text="fwa.award"></span>
        </li>
      </ul>
    </div>
    <div>
      <h4 class="mobile-anime">Behance</h4>
      <ul class="behance ">
        <li v-for="(behance, index) in about.behance" :key="`behance-${index}`" v-text="behance" class="mobile-anime"></li>
      </ul>
    </div>
    <div>
      <h4 class="mobile-anime">Collaborations</h4>
      <div class="collabs mobile-anime">
        <ul class="collaborations" ref="collabs">
          <li v-for="(collab, index) in about.collaborations" :key="`collab-${index}`" v-text="collab"></li>
        </ul>
      </div>
    </div>
  </article>
</div>
</template>

<script>
import transform from 'dom-transform'
import offset from '~/assets/js/utils/offset'
import { easeInOutQuad } from '~/assets/js/utils/easings'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h: 0,
      isShown: false
    }
  },
  components: {
    },
  computed: {
    ...mapState(['about']),
    ...mapGetters(['isPhone'])
  },
  methods: {
    resize(w, h) {
      if(w && h) {
        this.w = w
        this.h = h
      }
      this.offset = offset(this.$refs.collabs).top - this.h

      this.translateX = this.lastItem.offsetLeft + this.lastItem.clientWidth - this.w * (this.w > 1024 ? .45 : .6)
    },
    tick(scrollTop, ease) {
      if(!this.isPhone) {
        let coef = 0
        if(ease >= this.offset && ease < this.offset+this.h*.5) {
          coef = easeInOutQuad((ease-this.offset) / (this.h*.5))
          transform(this.$refs.collabs, {translate3d: [-coef * this.translateX  , 0, 0]})
        }
      }
    },
    show() {
    }
  },
  mounted() {
    this.$nextTick(()=>{
      const collabs = [].slice.call(this.$refs.collabs.querySelectorAll('li'))
      this.lastItem = collabs[collabs.length-1]
    })
    if(this.isPhone) {
      isShown = true
    }
  },
}
</script>

<style lang="stylus" scoped>

button
  height 200px
  width 200px
  border-radius 50%
  border 1px solid $black
  font-family $schnyder
  font-weight $demi
  font-size 18px
  margin-left 10vw
  margin-top 5vw
.d-f .regognitions
  padding-top 4vw
  div + div
    padding-top 4vw
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
  font-size 1.5vw
  display flex
  li
    display inline-block
    white-space nowrap
    color $red
    & + li
      padding-left 3vw
+below('l')
  button
    height 150px
    width 150px
    margin-left 50px
    margin-top 50px
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
    div + div
      padding-top 40px
  .collaborations
    font-size 22px
    padding-bottom 50px

</style>


