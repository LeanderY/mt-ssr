<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ city.replace('市','') }}美团
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">{{ city.replace('市','') }}{{ decodeURIComponent(keyword) }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      city: state => state.geo.city
    })
  }
}
</script>
