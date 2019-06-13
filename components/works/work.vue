<template>
  <div class="work">
    <span class="number" v-text="getId"  :class="{'underline': work.menuNumberUnderline}"></span>
    <nuxt-link :to="{name: 'works'}" v-html="work.title" :class="{'underline': work.menuUnderline, 'italic': work.menuItalic}" @mouseover.native="onMouseEnter(id)"></nuxt-link>
  </div>
</template>

<script>
export default {
  ppors: ['work', 'id'],
  computed:{
    getId() {
      const thisId = this.id + 1
      return thisId < 10 ? `0${thisId}` : thisId
    }
  },
  methods: {
    onMouseEnter(id) {
      Emitter.emit('WORK:ENTER', this.id)
    }
  }
}
</script>

<style>

</style>
