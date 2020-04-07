<template>
  <el-table :data="cartData">
    <el-table-column>
      <template slot-scope="scope">
        <img :src="scope.row.img" style="width:100%;height:100px;">
      </template>
    </el-table-column>
    <el-table-column prop="name" label="项目" width="532" />
    <el-table-column prop="price" label="单价" width="132" />
    <el-table-column label="数量" width="212">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count" :min="0" />
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        <div>
          {{ scope.row.price*scope.row.count }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    cartData: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
