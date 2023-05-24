<template>
  <div class="spu-container">
    <CategorySelect @getId="getId" :show="scene != 0" />
    <el-card>
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!this.id3" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" align="center" width="80px">

          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">

          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">

          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="row">
              <!-- 这里按钮将来用hintButton替换 -->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)"></hint-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->, sizes,total" @current-change="getSpuList" @size-change="handleSizeChange" :total="total">
        </el-pagination>
      </div>
      <SpuForm v-show="scene==1" ref="spu" @changeScene="changeScene"></SpuForm>
      <SkuForm v-show="scene==2" ref="sku" @changeScene="changeScene"></SkuForm>

      <el-dialog :title="spu.spuName" :visible.sync="dialogTableVisible" :before-close="close">
        <el-table :data="skuList" v-loading="loading" >
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column label="默认图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'SPU',
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      showTable: true,
      //分页
      page: 1,
      limit: 3,
      total: 23,
      //id
      id1: '',
      id2: '',
      id3: '',
      //表格数据
      records: [],
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuList: [], //存储的是SKU列表的数据
      loading: true,
    }
  },
  methods: {
    //获取分类id
    getId({ Id, level }) {
      if (level == 1) {
        this.id1 = Id
        this.id2 = ''
        this.id3 = ''
      } else if (level == 2) {
        this.id2 = Id
        this.id3 = ''
      } else if (level == 3) {
        this.id3 = Id
        this.reqSpuList()
      }
    },
    async reqSpuList() {
      const { page, limit, id3 } = this
      let res = await this.$API.spu.reqSpuList(page, limit, id3)
      if (res.code == 200) {
        this.total = res.data.total
        this.records = res.data.records
      }
    },
    //按钮
    addSpu() {
      this.scene = 1
      this.$refs.spu.addSpuData(this.id3)
    },
    //删除sku
    addSku({ row }) {
      this.scene = 2
      this.$refs.sku.addSkuData(this.id1, this.id2, this.id3, row)
    },
    //修改spu
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuForm(row)
    },
    //删除spu
    deleteSpu(row) {},
    //查看当前spu全部sku列表
    async handler({ row }) {
      this.dialogTableVisible = true
      this.spu = row
      const res = await this.$API.spu.reqSkuList(row.id)
      if (res.code == 200) {
        this.skuList = res.data
        //loading隐藏
        this.loading = false
      }
    },
    //分页
    getSpuList(page) {
      this.page = page
      this.reqSpuList()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.reqSpuList()
    },
    //取消SpuForm
    changeScene({ scene, flag }) {
      this.scene = scene
      this.reqSpuList(this.page)
    },
    async deleteSpu({ row }) {
      let res = await this.$API.spu.reqDeleteSpu(row.id)
      if (res.code == 200) {
        this.$message({ type: 'success', message: '删除成功' })
        //代表SPU个数大于1删除的时候停留在当前页，如果SPU个数小于1 回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    close(){
      this.dialogTableVisible = false
      this.loading = true
      this.skuList = []
    }
  },
  mounted() {
    // console.log(this.scene)
  },
}
</script>

<style scoped>
</style>
