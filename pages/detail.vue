<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :type="product.type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa :product="product" />
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <list v-if="login" :deals="deals" />
        <div v-else class="deal-need-login">
          <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <comment :comments="product.comments" :tags="product.tags" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Crumbs from '@/components/detail/crumbs'
import Summa from '@/components/detail/summary'
import List from '@/components/detail/list'
import Comment from '@/components/detail/comment'

export default {
  components: {
    Crumbs,
    Summa,
    List,
    Comment
  },
  // 在服务端运行,拿不到this data实例
  async asyncData (ctx) {
    const { id } = ctx.query
    const { product, deals, login } = await ctx.$axios.get('/search/detail', {
      params: {
        id
      }
    })
    return {
      product,
      deals,
      login
    }
  },
  computed: {
    ...mapState('geo', ['city']),
    canOrder () {
      return this.deals.length
    }
  },
  head () {
    return {
      title: `${this.product.title}_电话地址_营业时间-${this.city}美团网`
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/detail/index.scss';
</style>
