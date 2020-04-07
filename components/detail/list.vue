<template lang="html">
  <div class="m-detail-list">
    <ul>
      <li>{{ deals.length }}款套餐</li>
      <item
        v-for="(item, index) in deals"
        :key="index"
        :deal="item"
      />
    </ul>
  </div>
</template>

<script>
import Item from './item'
export default {
  components: {
    Item
  },
  props: {
    deals: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
