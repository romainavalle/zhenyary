<template>
  <div class="line">
    <v-work v-for="(workId, index) in works" :key="`work-${index}`" :workId="workId" :id="previousWorks  + index " ref="works"/>
  </div>
</template>

<script>
import vWork from '~/components/works/work.vue'
export default {
  props: {'id': Number, 'works': Array, 'previousWorks': Number},
  components: {
    vWork
  },
  methods: {
    hideWorks() {
      this.$refs.works.forEach(work => {
        work.hideWork()
      });
    },
    showWorks() {
      this.$refs.works.forEach(work => {
        work.showWork()
      });
    }
  },
  mounted() {
  },
}
</script>

<style lang="stylus" scoped>
.line
  width 100vw
  padding 1vh 6vw
  display flex
  justify-content space-between
  align-items baseline
  overflow hidden
  & + .line
    margin-top 5vh
  +below('l')
    padding 0
    display block
    width auto
    &.line
      margin 0
</style>
