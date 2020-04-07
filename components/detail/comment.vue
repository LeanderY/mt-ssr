<template>
  <div class="m-comment">
    <div class="total">
      <div class="sort">
        <span class="on">质量排序</span>
        <span>时间排序</span>
      </div>
      {{ comments.length }}条网友点评
    </div>
    <div class="comment-container">
      <ul class="tags clear">
        <li v-for="item in tags" :key="item.tag">
          {{ item.tag }}
          {{ item.count }}
        </li>
      </ul>
      <div class="sea">
        <span>
          只看有图片的评论
        </span>
      </div>
      <div v-for="item in comments" :key="item.commentTime" class="list clear">
        <div class="header">
          <img v-if="item.userUrl" :src="item.userUrl">
          <div v-else class="imgbox" />
        </div>
        <div class="info">
          <div class="name">
            {{ item.userName }}
          </div>
          <el-rate v-model="item.star" disabled />
          <div class="date">
            {{ item.commentTime }}
          </div>
          <div class="desc">
            {{ item.comment }}
          </div>
          <div v-if="item.merchantComment" class="reply">
            商家回复：{{ item.merchantComment }}
          </div>
          <div v-for="pic in item.picUrls" :key="pic" class="thumbnail">
            <img :src="pic">
          </div>
          <div class="like-count">
            <div class="like">
              <b />
              <span>{{ item.zanCnt }}</span>
            </div>
          </div>
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => {
        return []
      }
    },
    tags: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    this.comments.forEach(item => {
      item.star = item.star / 10
    })
  }
}
</script>

<style>

</style>
