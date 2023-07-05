<template>
  <div>
    <el-card class="box-card">
      <span class="tittle">出诊信息表</span>
      <el-form inline style="text-align: center;">
        <!-- 表单元素 -->
        <el-form-item>
          <el-input style="width: 300px;" v-model="tempSearchObj.username" placeholder="用户名" />
        </el-form-item>
        <!-- 查询与情况的按钮 -->
        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        <el-button type="default" @click="resetSearch">清空</el-button>
      </el-form>
      <div v-show="showTable">
        <!-- 按钮 -->
        <el-table style="width: 100%" border :data="consultList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- doctorName -->
          <el-table-column prop="doctorName" label="医生姓名" width="160px">
          </el-table-column>
          <!-- consultBegin -->
          <el-table-column prop="consultBegin" label="出诊开始时间" width="width">
          </el-table-column>
          <!-- consultEnd -->
          <el-table-column prop="consultEnd" label="出诊结束时间" width="width">
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页         -->
      <el-pagination style="text-align: center" @size-change="handleSizeChange" @current-change="getConsultList" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //分页
      page: 1,
      limit: 5,
      total: 0,
      //搜索条件
      tempSearchObj: {
        // 收集搜索条件输入的对象
        username: '',
      },
      //表格数据
      consultList: [
        {
          id: 1,
          doctorName: '张三',
          consultBegin: '2023-07-01 09:49:00.0',
          consultEnd: '2023-07-01 11:49:00.0',
          uuid: '1',
        },
      ],
      showTable: true,
    }
  },
  methods: {
    //获取表格数据
    async getConsultList(pages = 1) {
      this.page = pages
      const { page, limit, uuid } = this
      let res = await this.$API.consult.searchConsult(page, limit, uuid)
      console.log(res)
      if (res.code === 2000) {
        this.total = res.data.length
        this.consultList = res.data
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getConsultList()
    },
    //搜索
    async search(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const searchObj = this.tempSearchObj.username
      let res = await this.$API.consult.searchConsult(page, limit, searchObj)
      console.log(res)
      if (res.code === 2000) {
        this.consultList = res.data
      }
    },
    //清空
    resetSearch() {
      this.tempSearchObj.username = ''
    },
  },
  mounted() {
    this.getConsultList()
  },
}
</script>

<style>
</style>