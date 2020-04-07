<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ $store.state.geo.city }}美团
      </el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/' }"
      >
        {{ $store.state.geo.city }}美食
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
