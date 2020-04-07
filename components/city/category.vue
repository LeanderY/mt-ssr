<template>
  <div class>
    <dl class="m-category">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in alphabet" :key="item">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in cityArea" :key="item.title" class="m-category-section">
      <dt :id="'city-'+item.title">
        {{ item.title }}
      </dt>
      <dd>
        <span v-for="city in item.city" :key="city" @click="changeCity(city)">{{ city }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import pyjs from 'js-pinyin'
export default {
  data () {
    return {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      cityArea: []
    }
  },
  async mounted () {
    const { city } = await this.$axios.get('/geo/city')
    const cities = {}
    city.forEach(city => {
      // '北京市' -> 'BeiJingShi' -> 'B'
      const alphabetCity = pyjs
        .getFullChars(city.name)
        .slice(0, 1)
        // 'A-Z' -> '65-90' 'a-z' -> '97-122'
      const cityCode = alphabetCity.charCodeAt()
      if (cityCode > 64 && cityCode < 91) {
        if (!cities[alphabetCity]) {
          cities[alphabetCity] = [] // { B: [], C: [],... }
        }
        cities[alphabetCity].push(city.name)
      }
    })
    // cities: { B: Array(12), T: Array(10), S: Array(23), Q: Array(8), H: Array(28), ... }
    const blocks = []
    for (const key in cities) {
      blocks.push({
        title: key,
        city: cities[key]
      })
    }
    // blocks [{ title: 'B', city: Array(12) }]
    // 排序
    blocks.sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt())
    this.cityArea = blocks
  },
  methods: {
    changeCity (c) {
      const city = c.replace('市', '')
      this.$store.dispatch('geo/setCity', city)
      cookie.set('city', city)
      location.href = '/'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/city/category.scss';
</style>
