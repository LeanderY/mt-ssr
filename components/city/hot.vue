<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="item in list" :key="item.id">
        {{ item.name === '市辖区' ? item.province : item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    const { hots } = await this.$axios.get('/geo/hot')
    this.list = hots
  }
}
</script>

<style lang="scss">
@import '@/assets/css/city/hot.scss';
</style>
