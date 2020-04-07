const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')

// 提交数据(策略)
passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({ username })
    if (user === null) {
      return done(null, false, '用户不存在')
    }
    if (user.password === password) {
      return done(null, user, '登录成功')
    } else {
      return done(null, false, '密码错误')
    }
  })
)
// Passport 将维持持久的登录会话。为了使持久会话正常工作，必须将经过身份验证的用户序列化到该会话，并在发出后续请求时将其反序列化。
// Passport 对用户记录的存储方式没有任何限制。而是向Passport提供函数，该函数实现必要的序列化和反序列化逻辑。
// 在典型的应用程序中，这很简单，只需序列化用户user，然后在反序列化时按user查找用户。
// 序列化 由 ctx.login()触发，把用户对象存到 session 里
passport.serializeUser(function (user, done) {
  done(null, user)
})

// 反序列化 在请求时服务器查找与 sessionid 对应 session
// session中如果存在 "passport":{"user":"xxx"} 时会触发定义的反序列化操作
passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport
