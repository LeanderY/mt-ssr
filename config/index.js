module.exports = {
  // 配置数据库地址
  dbs: 'mongodb://root:XjxLy12071006++@129.211.31.67:27017/mt', // 服务器 bind_ip 标识允许连接的客户端IP地址，此处设为0.0.0.0，表示允许所有机器连接。也可设置特定机器的IP。
  // 配置smtp邮箱服务
  smtp: {
    // 配置smtp服务地址
    get host () {
      return 'smtp.qq.com'
    },
    // 配置发送的端口
    get port () {
      return '587'
    },
    // 配置发送的邮箱
    get user () {
      return '2111576238@qq.com'
    },
    // 配置生成的授权码
    get pass () {
      return 'mejrrzzlzsughjcg'
    },
    // 每次生成的随机邮箱验证码
    get code () {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    // 验证码的过期时间配置
    get expire () {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
