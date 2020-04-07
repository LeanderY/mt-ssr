<template>
  <div class="error-container">
    <img class="error-img" src="../assets/images/not-found.png" alt="">
    <p class="error-word">
      抱歉，页面暂时无法访问...
    </p>
    <p class="error-msg">
      错误信息:服务器找不到请求的网页
    </p>
    <nuxt-link to="/">
      返回美团首页
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'default' // 你可以为错误页面指定自定义的布局
}
</script>
<style lang="scss">
@import '@/assets/css/error/index.scss';
</style>
