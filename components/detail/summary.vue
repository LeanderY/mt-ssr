<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{ product.title }}</h1>
      <el-rate v-model="product.avgscore" disabled />
      <span>{{ product.avgscore }}分</span>
      <span>人均￥{{ product.avgprice }}</span>
      <ul>
        <li>地址：{{ product.address }}</li>
        <li>电话：{{ product.phone }}</li>
        <li>营业时间: {{ product.openTime }}</li>
      </ul>
      <ul class="tags">
        <li>
          <img src="http://p0.meituan.net/codeman/551290739062eda37e52999e2315f50c1887.png">
          <span>提供wifi</span>
        </li>
        <li>
          <img src="http://p1.meituan.net/codeman/4b1c5696fe5bf2c4d23fb01659b3e68b1960.png">
          <span>停车位</span>
        </li>
      </ul>
    </dt>
    <dd>
      <div class="big">
        <img :src="product.imageUrl" :alt="product.title">
      </div>
      <ul v-if="product.picUrls">
        <li v-for="(item, id) in product.picUrls" :key="id">
          <img :src="item" width="100%" height="100%">
        </li>
      </ul>
    </dd>
    <div class="imageViewer-content" hidden>
      <div class="imgs-content">
        <div class="header">
          <span class="close">X</span>
        </div>
        <div class="content-arrow-imgs">
          <div class="figure">
            <div class="image-box">
              <img class="image" :src="product.picUrls[index]">
            </div>
            <div class="footer">
              <div class="footerCount">
                1
              </div>
            </div>
          </div>
          <div type="button" :class="['arrow','left-arrow', {'pre-dis': preDisabled }]" @click="pre()" />
          <div type="button" :class="['arrow','right-arrow', {'next-dis': nextDisabled }]" @click="next()" />
        </div>
        <div class="paginatedThumbnails">
          <div type="button" class="arrow left-arrow" />
          <div class="thumbnails">
            <div v-for="(item, idx) in product.picUrls" :key="idx" :class="['thumbnail',{ 'active': idx === index }]">
              <img :src="item">
            </div>
          </div>
          <div type="button" class="arrow right-arrow" />
        </div>
      </div>
    </div>
  </dl>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      index: 0,
      length: 4,
      preDisabled: true,
      nextDisabled: false
    }
  },
  methods: {
    next () {},
    pre () {}
  }
}
</script>
