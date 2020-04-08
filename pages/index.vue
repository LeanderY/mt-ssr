<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu />
      </el-col>
      <el-col :span="19">
        <life />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <artistic />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Emenu from '@/components/index/menu'
import Life from '@/components/index/life'
import Artistic from '@/components/index/artistic'
export default {
  components: {
    Emenu,
    Life,
    Artistic
  },
  computed: {
    ...mapState({
      city: state => state.geo.city
    })
  },
  head () {
    return {
      title: `${this.city}美团网-滁州美食_酒店_旅游_团购_电影_吃喝玩乐`,
      meta: [
        { hid: 'description', name: 'description', content: '滁州美团网精选滁州美食餐厅,酒店预订,电影票,旅游景点,外卖订餐,滁州团购信息,您可查询商家评价店铺信息。滁州生活,下载美团官方APP ,吃喝玩乐1折起。' },
        { hid: 'keywords', name: 'keywords', content: '滁州美食,滁州酒店,滁州团购' }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
