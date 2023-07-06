<template>
  <div class="ob-container">
    <el-row :gutter="10">
      <el-col :span="12">
        <Search></Search>
      </el-col>
      <el-col :span="12">
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './Search'
import Category from './Category'
export default {
  name: 'Observe',
  components: {
    Search,
    Category,
  },
}
</script>

<style scoped>
.ob-container {
  margin-top: 20px;
}
</style>