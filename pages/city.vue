<template>
  <div class="page-city">
    <el-row>
      <el-col :span="24">
        <iSelect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/city/iselect'
import Hot from '@/components/city/hot'
import Categroy from '@/components/city/category'
export default {
  components: {
    iSelect,
    Hot,
    Categroy
  }
}
</script>

<style>
</style>
