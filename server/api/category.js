const Router = require('koa-router')
const Category = require('../models/category')

const router = new Router({ prefix: '/category' })

router.get('/crumbs', async ctx => {
  const { city } = ctx.query
  const result = await Category.findOne({ city })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
})

module.exports = router
