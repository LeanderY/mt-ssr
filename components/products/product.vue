<template>
  <dl class="s-item">
    <dt>
      <span>{{ index+1 }}</span>
      <img v-lazy="prodouct.imageUrl" alt="商品图片">
    </dt>
    <dd>
      <h3>
        <nuxt-link :to="{path:'detail', query:{ id:prodouct._id}}">
          {{ prodouct.title }}
        </nuxt-link>
      </h3>
      <el-rate v-model="prodouct.avgscore" :colors="['#ff9900', '#ff9900', '#FF9900']" disabled />
      <span v-if="prodouct.avgscore>4" class="s-item-comment">很好</span>
      <span v-else-if="prodouct.avgscore>3" class="s-item-comment">一般</span>
      <span v-else class="s-item-comment">很差</span>
      <span class="s-item-value">{{ prodouct.avgscore }}分</span>
      <span v-if="prodouct.comments" class="s-item-comment-total">{{ prodouct.comments.length }}人评论</span>
      <p>
        <span class="s-item-type">{{ prodouct.backCateName }} | {{ prodouct.areaname }}</span>
        <span class="s-item-addr">{{ prodouct.address }}</span>
      </p>
      <p>
        <em class="s-item-price">人均 ￥{{ prodouct.avgprice }}起</em>
      </p>
      <ul v-if="prodouct.deals">
        <li v-for="(item, idx) in prodouct.deals.slice(0, DEAL_LENGTH)" :key="idx">
          <div class="deal-title">
            {{ item.title }}
          </div>
          <div class="deal-info">
            <span class="deal-price">
              <span class="rmb-symbol">￥</span>
              {{ item.price }}
            </span>
            <span class="deal-value">
              门市价¥{{ item.value }}
            </span>
            <span class="deal-sales">
              已售{{ item.sales }}
            </span>
          </div>
        </li>
        <p class="toggle-btn">
          <span v-if="prodouct.deals && showMore" @click="more">更多{{ prodouct.deals.length - 2 }}个优惠</span>
          <span v-else @click="hidden">收起</span>
        </p>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    prodouct: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      DEAL_LENGTH: 2,
      showMore: true
    }
  },
  methods: {
    more () {
      this.DEAL_LENGTH = 5
      this.showMore = false
    },
    hidden () {
      this.DEAL_LENGTH = 2
      this.showMore = true
    }
  }
}
</script>
