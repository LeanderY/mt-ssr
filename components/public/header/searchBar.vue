<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hotPlace" :key="index">
              <a :href="'/products?type='+item.type">{{ item.title }}</a>
              {{ item.name }}
            </dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item,index) in searchList" :key="index">
              <a :href="'/products?type=' + item.type">{{ item.title }}</a>
              {{ item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a v-for="(item,index) in hotPlace" :key="index">{{ item.title }}</a>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isFocus: false,
      search: '',
      searchList: []
    }
  },
  computed: {
    ...mapState({
      city: state => state.geo.city,
      hotPlace: state => state.home.hotPlace
    }),
    isHotPlace () {
      // 想让热门推荐显示出来   1.input聚焦状态  2.input值为空
      return this.isFocus && !this.search
    },
    isSearchList () {
      // input对应搜素内容展示出来 1.input聚焦  2.input存在值
      return this.isFocus && this.search
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      // 当点击的input下方的推荐的时候。效果应该是先跳转在消失。
      // 这里直接失去焦点，是点不到下方的nuxt-link的
      // 看不到的延时器，这样就可以先跳转而后消失
      setTimeout(() => {
        // this.isFocus = false
      }, 200)
    },
    input: _.debounce(async function () {
      const self = this
      self.searchList = []
      const {
        data: { top }
      } = await this.$axios.get('/search/top', {
        params: {
          title: self.search,
          city: self.city
        }
      })
      self.searchList = top
    }, 300)
  }
}
</script>

<style>
</style>
