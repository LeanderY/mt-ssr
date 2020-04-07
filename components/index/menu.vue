<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index" @mouseenter="mouseenter(item.type)">
        <i :class="item.type" />
        <span>{{ item.name }}</span>
        <i class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item,index) in currentDetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span v-for="child in item.child" :key="child">{{ child }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      kind: ''
    }
  },
  computed: {
    ...mapState({
      menu: state => state.home.menu
    }),
    currentDetail () {
      return this.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave () {
      this.timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    mouseenter (type) {
      this.kind = type
    },

    sover () {
      clearTimeout(this.timer)
    },
    sout () {
      this.kind = ''
    }
  }
}
</script>

<style>
</style>
