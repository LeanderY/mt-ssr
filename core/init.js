const mongoose = require('mongoose')
const requireDirectory = require('require-directory')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('koa-redis')
const { dbs } = require('../config')
const passport = require('../server/utils/passport')

class InitManager {
  static initCore (app) {
    InitManager.loadSession(app) // session的加密处理
    InitManager.loadPassport(app)
    InitManager.loadModules(app) // 装载所有子路由
    InitManager.loadDbs() // 数据库连接
  }
  static loadModules (app) {
    // 需要以 module.exports = router 的形式导出路由模块!!!
    const PATH = `${process.cwd()}/server/api`
    // 实现路由自动加载
    requireDirectory(module, PATH, {
      visit: router => {
        if (router instanceof Router) {
          app.use(router.routes())
        }
      }
    })
  }

  static loadDbs () {
    mongoose.connect(dbs, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  }

  static loadSession (app) {
    app.keys = ['mt', 'keyskeys']
    app.proxy = true
    app.use(session({
      key: 'mt',
      prefix: 'mt:uid',
      store: new Redis()
    }, app))
  }

  static loadPassport (app) {
    app.use(passport.initialize())
    // 序列化的时候为session添加一个 passport 属性，用来存储用户登录的 session 信息
    app.use(passport.session())
  }
}

module.exports = InitManager
