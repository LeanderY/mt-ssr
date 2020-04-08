
module.exports = {
  development: {
    ENV: 'development',
    NUXT_APP_BASE_API: 'http://localhost:3000' // 测试服务器地址
  },
  production: {
    ENV: 'production',
    NUXT_APP_BASE_API: 'http://129.211.31.67:8081/' // 正式服务器地址
  }
}
