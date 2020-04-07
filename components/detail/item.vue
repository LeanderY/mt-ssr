<template>
  <li v-if="deal" class="m-detail-item">
    <dl class="section">
      <dd>
        <img :src="deal.iUrl">
      </dd>
      <dd>
        <h4>{{ deal.title }}</h4>
        <p>
          <span>已售：{{ deal.sales }}</span>
          <span v-if="deal.deadline">截止日期：{{ deal.deadline }}</span>
        </p>
        <p>
          <sub>￥{{ deal.price }}</sub>
          <sub>门店价￥{{ deal.value }}</sub>
        </p>
      </dd>
      <dd>
        <el-button type="warning" round @click="createCart">
          立即抢购
        </el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    deal: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.home.user
    })
  },
  methods: {
    // 创建购物车
    async createCart () {
      const { code } = await this.$axios.post('/cart/create', {
        params: {
          detail: {
            name: this.deal.title,
            price: this.deal.price,
            img: this.deal.iUrl,
            count: 1
          }
        }
      })
      if (code === 0) {
        window.location.href = `/cart?id=${this.user._id}`
      }
    }
  }
}
</script>

<style lang="scss">
</style>
