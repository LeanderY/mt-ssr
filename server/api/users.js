const Router = require('koa-router')
const Redis = require('koa-redis')
const nodeMailer = require('nodemailer')
const User = require('../models/users')
const { smtp } = require('../../config')
const Passport = require('../utils/passport') // 提交策略
// const { HttpException, Success } = require('../../core/http-exception')

const router = new Router({ prefix: '/users' })

const Store = new Redis().client

// 注册
router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body
  const saveCode = await Store.hget(`nodemail:${username}`, 'code') // 获取存储在Redis中的验证码
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 获取验证码过期时间
  if (code === saveCode) {
    if (new Date().getTime() - saveExpire > 0) { // 校验是否过期
      ctx.body = {
        code: -1,
        msg: '验证码已过期，请重新尝试'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写正确的验证码'
    }
    return false
  }

  const user = await User.find({ username })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return false
  }
  const nuser = await User.create({ username, password, email })

  if (!nuser) {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
    return false
  } else {
    ctx.body = {
      code: 0,
      msg: '注册成功'
    }
  }
})

// 登录
router.post('/signin', (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        user,
        msg: info
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: 1,
        msg: info
      }
    }
  })(ctx, next)
})

// 发送邮箱验证码并通过Redis存储
router.post('/verify', async (ctx, next) => {
  const { username, email } = ctx.request.body
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  const transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: smtp.user,
      pass: smtp.pass
    }
  })
  const code = smtp.code()
  const mailOptions = {
    from: `"认证邮件" <${smtp.user}>`,
    to: email,
    subject: '注册码',
    html: `您的邀请码是${code} 10分钟之内有效`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error
    } else {
      Store.hmset(`nodemail:${username}`, 'code', code, 'expire', smtp.expire(), 'email', email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})

// 退出
// 将user从session删除
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息
router.get('/info', ctx => {
  if (ctx.isAuthenticated()) {
    ctx.body = {
      user: ctx.session.passport.user
    }
  } else {
    ctx.body = {
      user: ''
    }
  }
})

module.exports = router
