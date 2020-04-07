<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ city }}
    <nuxt-link class="city" to="/city">
      切换城市
    </nuxt-link>[廊坊 天津 香河]
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      city: state => state.geo.city
    })
  }
}
</script>

<style>
</style>
