const Router = require('koa-router')
const md5 = require('crypto-js/md5')
const Order = require('../models/order')

const router = new Router({ prefix: '/order' })

// 创建购物车
router.post('/createOrder', async ctx => {
  const { detail } = ctx.request.body
  const time = Date()
  const orderID = md5(Math.random() * 1000 + time).toString()

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const order = new Order({
      id: orderID,
      user: ctx.session.passport.user,
      details: detail,
      status: 0
    })
    const result = await order.save()
    if (result) {
      // await findCart.remove()
      ctx.body = {
        code: 0,
        id: orderID
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
router.post('/getOrders', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    const result = await Order.find()
    if (result) {
      ctx.body = {
        code: 0,
        list: result
      }
    } else {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})

module.exports = router
