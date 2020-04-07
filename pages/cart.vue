<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="login" :span="24" class="m-cart">
        <list :cart-data="cart" />
        <p>
          应付金额：
          <em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="submit">
            提交订单
          </el-button>
        </div>
      </el-col>
      <el-col v-else class="empty">
        购物车为空
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list'
export default {
  components: {
    List
  },
  async asyncData (ctx) {
    const {
      code,
      data,
      login
    } = await ctx.$axios.post('/cart/getCart', {
      params: {
        id: ctx.query.id
      }
    })
    if (code === 0) {
      return {
        cart: data.map(item => {
          return item.detail[0]
        }),
        login
      }
    }
  },
  data () {
    return {
      cart: []
    }
  },
  computed: {
    total () {
      let total = 0
      this.cart.forEach(item => {
        total += item.price * item.count
      })
      return total
    }
  },
  mounted () {
    if (!this.login) {
      window.location.href = '/login'
    }
  },
  methods: {
    // 提交订单
    async submit () {
      const { code, id } = await this.$axios.post('/order/createOrder', {
        detail: this.cart
      })
      if (code === 0) {
        this.$alert(`恭喜您，已成功下单，订单号:${id}`, '下单成功', {
          confirmButtonText: '确定',
          callback: action => {
            location.href = '/order'
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/cart/index.scss';
</style>
