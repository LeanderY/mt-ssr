<template>
  <div class="m-isselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      :trigger-on-focus="false"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      province: [],
      city: [],
      pvalue: '',
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pvalue (newPvalue) {
      const { city } = await this.$axios.get(`geo/province/${newPvalue}`)
      this.city = city.map(({ id, name }) => {
        return {
          value: id,
          label: name
        }
      })
      this.cvalue = ''
    }
  },
  // 获取城市列表
  async mounted () {
    const { province } = await this.$axios.get('geo/province')
    this.province = province.map(({ id, name }) => {
      return {
        value: id,
        label: name
      }
    })
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, callback) {
      const self = this
      if (self.cities.length) {
        // 执行过滤
        callback(self.cities.filter(item => item.value.includes(query)))
      } else {
        const { city } = await self.$axios.get('geo/city')
        self.cities = city.map(({ name }) => {
          return {
            value: name
          }
        })
        // 执行过滤
        callback(self.cities.filter(item => item.value.includes(query)))
      }
    }, 200)
  }
}
</script>

<style lang="scss">
@import '@/assets/css/city/iselect.scss';
</style>
