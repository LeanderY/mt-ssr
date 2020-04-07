<template>
  <el-container class="layout-default">
    <!-- 公共头部组件 -->
    <el-header height="197px">
      <my-header />
    </el-header>
    <!-- 路由视图，相当于router-view -->
    <el-main>
      <nuxt />
    </el-main>
    <!-- 公共底部组件 -->
    <el-footer height="100%">
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/index'
import MyFooter from '@/components/public/footer/index'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
