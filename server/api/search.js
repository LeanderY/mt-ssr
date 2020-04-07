const Router = require('koa-router')
const mongoose = require('mongoose')
const Scene = require('../models/scene')
const ObjectId = mongoose.Types.ObjectId
const router = new Router({ prefix: '/search' })

// 搜索
router.get('/top', async ctx => {
  try {
    const result = await Scene.find({
      title: new RegExp(ctx.query.title),
      city: ctx.query.city
    }).limit(10)

    ctx.body = {
      code: 0,
      top: result.map(item => {
        return {
          title: item.title,
          type: item.showType
        }
      })
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

// 热门搜索
router.get('/hot', async ctx => {
  try {
    const { city, type } = ctx.query
    const result = await Scene.find({
      city,
      showType: type
    }).limit(4)
    ctx.body = {
      code: 0,
      hot: result.map(({ title, keyword }) => {
        return {
          title,
          keyword
        }
      })
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      hot: []
    }
  }
})

// 商品详情
router.get('/detail', async ctx => {
  try {
    const { id } = ctx.query
    const product = await Scene.findOne({
      _id: ObjectId(id)
    })
    ctx.body = {
      product,
      deals: product.deals === null ? [] : product.deals,
      login: ctx.isAuthenticated()
    }
  } catch (error) {
    ctx.body = {
      product: {},
      more: [],
      login: ctx.isAuthenticated()
    }
  }
})

// 关键字查询
router.get('/resultsByKeywords', async ctx => {
  const { city, type } = ctx.query
  const result = await Scene.find({
    city,
    showType: type
  }).limit(15)
  ctx.body = {
    scene: result || []
  }
})

module.exports = router
