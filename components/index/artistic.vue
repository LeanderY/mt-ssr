<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd :class="{ active:type==='hotel' }" type="hotel">
        全部
      </dd>
      <dd :class="{ active:type==='food' }" type="food">
        约会聚餐
      </dd>
      <dd :class="{ active:type==='beauty' }" type="beauty">
        丽人SPA
      </dd>
      <dd :class="{ active:type==='cinema' }" type="cinema">
        电影演出
      </dd>
      <dd :class="{ active:type==='travel' }" type="travel">
        品质出游
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item, index) in cur" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">
              {{ item.title }}
            </li>
            <div class="pos">
              {{ item.pos }}
            </div>
            <div class="price">
              <span class="price-symbol">¥</span>
              <span class="current-price">
                <em>{{ item.currentPrice }}</em>
                <span>{{ item.priceType?'/'+item.priceType:'' }}</span>
              </span>
              <em v-if="!item.priceType" class="old-price">{{ item.oldPrice }}</em>
              <span class="bottom-right-info">{{ item.bottomInfo }}</span>
            </div>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      type: 'hotel',
      list: {
        hotel: [],
        food: [],
        beauty: [],
        cinema: [],
        travel: []
      }
    }
  },
  computed: {
    ...mapState({
      city: state => state.geo.city
    }),
    cur () {
      return this.list[this.type]
    }
  },
  mounted () {
    this.getResultsByKeywords(this.type)
  },
  methods: {
    over (e) {
      const dom = e.target
      const tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.type = dom.getAttribute('type')
        setTimeout(() => {
          this.getResultsByKeywords(this.type)
        }, 200)
      }
    },
    async getResultsByKeywords (type) {
      const { scene } = await this.$axios.get('/search/resultsByKeywords', {
        params: {
          type,
          city: this.city
        }
      })
      if (scene.length > 0) {
        const result = scene.map(item => {
          return {
            title: item.title,
            pos: item.backCateName,
            price: item.avgprice,
            oldPrice: item.lowestprice,
            img: item.imageUrl,
            currentPrice: item.avgprice,
            priceType: item.priceType,
            bottomInfo: item.areaname
          }
        })
        this.list[this.type] = result
      } else {
        this.list[this.type] = []
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>
