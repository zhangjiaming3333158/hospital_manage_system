<template>
  <div>
    <el-table border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="success" icon="el-icon-bottom" size="mini" v-if="row.isSale == 0" @click="sale(row)"></el-button>
          <el-button type="success" icon="el-icon-top" size="mini" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页          -->
    <el-pagination @size-change="handleSizeChange" @current-change="getSkuList" style="text-align: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      records: [],
    }
  },
  methods: {
    //请求sku列表
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      console.log(page, limit)
      const res = await this.$API.sku.reqSkuList(page, limit)
      if (res.code === 200) {
        this.total = res.data.total
        this.records = res.data.records
        console.log(res)
      }
    },
    //分页器
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    //按钮
    async sale(row) {
      const res = await this.$API.sku.reqSale(row.id)
      if (res.code == 200) {
        row.isSale = 1
        this.$message({
          type: 'success',
          message: '上架成功',
        })
      }
    },
    async cancel(row) {
      const res = await this.$API.sku.reqCancel(row.id)
      if (res.code == 200) {
        row.isSale = 0
        this.$message({
          type: 'success',
          message: '下架成功',
        })
      }
    },
    edit() {
      console.log('edit')
    },
    getSkuInfo(row) {
      console.log(row)
    },
  },
  mounted() {
    this.getSkuList()
  },
}
</script>

<style>
</style>
