<template>
  <div class="about">
    <div class="d-f top">
      <div class="img" :class="{'mobile-anime': isPhone}">
        <img src="/images/zhenya.jpg" alt="zhenya rynzhuk">
      </div>
      <article>
        <h1 :class="{'mobile-anime': isPhone}">Z.</h1>
        <h2 :class="{'mobile-anime': isPhone}">a bit about me</h2>
        <strong class="h4" :class="{'mobile-anime': isPhone}">Just about</strong>
        <p class="strong" :class="{'mobile-anime': isPhone}">background</p>
        <p :class="{'mobile-anime': isPhone}">My experience, awards<br> and own vibes<br> for sure!</p>
      </article>
    </div>
    <div class="d-f">
      <div class="spacer"></div>
      <article class="desc">
        <strong class="h4" :class="{'mobile-anime': isPhone}">So,</strong>
        <p :class="{'mobile-anime': isPhone}" v-html="about.about" ></p>
      </article>
    </div>
    <div class="d-f">
      <div class="spacer"></div>
      <article class="regognitions">
        <h3 :class="{'mobile-anime': isPhone}">Regognitions</h3>
        <div>
          <h4 :class="{'mobile-anime': isPhone}">Awwwards</h4>
          <ul class="awards" v-if="about.awwwards">
            <li v-for="(awwward, index) in about.awwwards" :key="`awwward-${index}`" :class="{'mobile-anime': isPhone}">
              <strong v-text="awwward.title"></strong>
              <span v-text="awwward.award"></span>
            </li>
          </ul>
        </div>
        <div>
          <h4 :class="{'mobile-anime': isPhone}">FWA</h4>
          <ul class="awards" v-if="about.FWA">
            <li v-for="(fwa, index) in about.FWA" :key="`fwa-${index}`" :class="{'mobile-anime': isPhone}">
              <strong v-text="fwa.title"></strong>
              <span v-text="fwa.award"></span>
            </li>
          </ul>
        </div>
        <div>
          <h4 :class="{'mobile-anime': isPhone}">Behance</h4>
          <ul class="behance ">
            <li v-for="(behance, index) in about.behance" :key="`behance-${index}`" v-text="behance" :class="{'mobile-anime': isPhone}"></li>
          </ul>
        </div>
        <div>
          <h4 :class="{'mobile-anime': isPhone}">Collaborations</h4>
          <ul class="collaborations" :class="{'mobile-anime': isPhone}">
            <li v-for="(collab, index) in about.collaborations" :key="`collab-${index}`" v-text="collab"></li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      w: 0,
      h:0
    }
  },
  computed: {
    ...mapState(['about']),
    ...mapGetters(['isPhone'])
  },
  components: {
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
  },
}
</script>

<style lang="stylus" scoped>
.about
  position relative
  width 100vw
  padding-top 200px
  overflow hidden
  .d-f
    display flex
    justify-content flex-start
  .img, .spacer
    width 45%
  article
    padding 0 4vw
    width 45%
  strong
    display block
    font-weight normal
  .strong
    padding-bottom 2vw
  .desc
    margin-top -4vw
    p
      font-weight $light
  p
    width 50%
  h1
    font-size 15vw
    font-weight normal
  h2
    font-size 4.4vw
    font-family $schnyder
    font-weight $demi
    padding-bottom 2vw
  h3
    font-size 3.1vw
    font-family $schnyder
    font-weight $demi
    padding-bottom 3vw
  h4, .h4
    font-size 2vw
    font-weight normal
  h4
    padding-bottom 2vw
  .regognitions
    padding-top 4vw
    div + div
      padding-top 4vw
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
    padding-top 100px
    .img
      padding-left 6vw
    .desc
      margin-top 4vw
      p
        width 68%
    .spacer
      width 30%
    .top
      article
        width 45%
      .img
        width 50%
    article
      width 70%
    h1
      font-size 10vw
    h2
      font-size 5.4vw
      padding-bottom 4vw
    h3
      font-size 5.4vw
      padding-bottom 4vw
    h4, .h4
      font-size 5.2vw
    h4
      padding-bottom 4vw
    .awards span
      font-size 2.3vw
    .behance, .awards strong
      font-size 4.1vw

  .regognitions
    padding-top 10vw
    div + div
      padding-top 10vw

  .collaborations
    font-size 3.9vw
  +below('s')
    padding-top 100px
    .d-f
      display block
    .top
      .img
        padding-left 0vw
        padding-right 20vw
        width 100%
      article
        width 100%
    .desc
      p
        width 100%
    .spacer
      display none
    article
      width 100%
      padding 0 4vw
    h1
      font-size 140px
    h2
      font-size 35px
    h3
      font-size 35px
      padding-bottom 30px
    h4, .h4
      font-size 22px
    h4
      padding-bottom 20px
    p
      font-size 14px
    .awards span
      font-size 14px
    .behance, .awards strong
      font-size 17pw
    .awards
      li + li
        padding-top 30px

  .regognitions
    padding-top 40px
    div + div
      padding-top 40px

  .collaborations
    font-size 22px
    padding-bottom 50px

</style>


