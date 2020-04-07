const Router = require('koa-router')
const md5 = require('crypto-js/md5')
const Cart = require('../models/cart')

const router = new Router({ prefix: '/cart' })

// 创建购物车
router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const time = Date()
    const cartNo = md5(Math.random() * 1000 + time).toString()
    const {
      params: { detail }
    } = ctx.request.body
    //
    const cart = new Cart({ cartNo, time, user: ctx.session.passport.user, detail })
    const result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: 'success'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

// 获取当前购物车信息
router.post('/getCart', async ctx => {
  const {
    params: { id }
  } = ctx.request.body
  const result = await Cart.find({
    'user._id': id
  })
  ctx.body = {
    code: 0,
    data: result,
    login: ctx.isAuthenticated()
  }
})

module.exports = router
