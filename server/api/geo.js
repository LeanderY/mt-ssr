const Router = require('koa-router')
const Menu = require('../models/menu')
const Province = require('../models/province')
const City = require('../models/city')

const router = new Router({ prefix: '/geo' })

// 获取省份
router.get('/province', async ctx => {
  const province = await Province.find()
  ctx.body = {
    province: province.map(({ id, value }) => {
      return {
        id,
        name: value
      }
    })
  }
})

// 省份对应的城市
router.get('/province/:id', async ctx => {
  const city = await City.findOne({ id: ctx.params.id })
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return formatCity(item)
    })
  }
})

// 获取所有城市
router.get('/city', async ctx => {
  const city = []
  const result = await City.find()
  result.forEach(({ value }) => {
    city.push(...value) // value(市区的列表)
  })
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return formatCity(item)
    })
  }
})

function formatCity ({ province, id, name }) {
  return {
    province,
    id,
    name: name === '市辖区' || name === '省直辖县级行政区划' ? province : name
  }
}

// 获取热门城市
router.get('/hot', async ctx => {
  const hotList = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]
  const hotCity = []
  const result = await City.find()
  result.forEach(item => {
    hotCity.push(
      ...item.value.filter(k => hotList.includes(k.name) || hotList.includes(k.province))
    )
  })
  ctx.body = {
    hots: hotCity
  }
})

// 菜单数据
router.get('/menu', async ctx => {
  const { menu } = await Menu.findOne()
  ctx.body = {
    menu
  }
})

module.exports = router
