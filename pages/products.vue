<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <category :types="types" :areas="areas" />
      <list ref="product" :scene="scene" />
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
        :map-fixed="mapFixed"
        :current-index="currentIndex"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Category from '@/components/products/category.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components: {
    Crumbs,
    Category,
    List,
    Amap
  },
  // asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象
  async asyncData (ctx) {
    const { city } = ctx.store.state.geo
    const { type } = ctx.query
    const { scene } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        type,
        city
      }
    })
    const { areas, types } = await ctx.$axios.get('/category/crumbs', {
      params: {
        city
      }
    })
    return {
      scene,
      type,
      areas: areas.filter(item => item.type !== '').slice(0, 5),
      types: types.filter(item => item.type !== '').slice(0, 5),
      point: scene.map(item => {
        return {
          latitude: item.latitude,
          longitude: item.longitude,
          title: item.title
        }
      })
    }
  },
  data () {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: [],
      mapFixed: false,
      currentY: 0,
      productHeight: []
    }
  },
  computed: {
    currentIndex () {
      let index = 0
      const list = this.productHeight
      for (let i = 0; i < list.length - 1; i++) {
        const heightBottom = list[i]
        const heightTop = list[i + 1]
        // 判断currentY当前所在的区间
        if (this.currentY < heightTop && this.currentY >= heightBottom) {
          index = i
        }
      }
      return index
    }
  },
  mounted () {
    // 滚动监听
    window.addEventListener('scroll', this.mapScroll)
    // 计算每个模块的高度
    this.calcHeight()
  },
  // 记得销毁要不然所有的页面都会添加这个scroll事件
  beforeDestroy () {
    window.removeEventListener('scroll', this.mapScroll)
  },
  methods: {
    mapScroll () {
      this.currentY = document.documentElement.scrollTop || document.body.scrollTop
      const crumbsHeight = document.querySelector(`.m-crumbs`).offsetTop
      const pageHeight = document.querySelector(`.page-product`).offsetTop
      this.currentY > crumbsHeight + pageHeight ? (this.mapFixed = true) : (this.mapFixed = false)
    },
    calcHeight () {
      const height = 0
      this.productHeight.push(height)
      const products = this.$refs.product.$children
      for (let i = 0; i < products.length; i++) {
        this.productHeight.push(
          products[i].$el.clientHeight + products[i].$el.offsetTop
        )
      }
    }
  },
  head () {
    return {
      title: `美食`
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/products/index.scss';
</style>
