<template>
  <div>
    <el-card class="box-card">
      <el-form inline style="text-align: center;">
        <!-- 表单元素 -->
        <el-form-item>
          <el-input style="width: 300px;" v-model="tempSearchObj.username" placeholder="用户名" />
        </el-form-item>
        <!-- 查询与情况的按钮 -->
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="default" @click="resetSearch">清空</el-button>
      </el-form>
      <div v-show="showTable">
        <!-- 按钮 -->
        <el-table style="width: 100%" border :data="clinicList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- 名称 -->
          <el-table-column prop="clinicName" label="诊室名称" width="160px">
          </el-table-column>
          <!-- 诊室介绍 -->
          <el-table-column prop="clinicIntroduce" label="诊室介绍" width="width">
          </el-table-column>
          <!-- 诊室所在科室 -->
          <el-table-column prop="belongingDepartment" label="诊室所属" width="160px">
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页   @size-change="handleSizeChange" @current-change="getSkuList"      -->
      <el-pagination style="text-align: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
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
      clinicList: [
        {
          clinicName: '诊室1',
          clinicIntroduce: '诊室1介绍',
          belongingDepartment: '科室1',
        },
        {
          clinicName: '诊室2',
          clinicIntroduce: '诊室2介绍',
          belongingDepartment: '科室2',
        },
        {
          clinicName: '诊室3',
          clinicIntroduce: '诊室3介绍',
          belongingDepartment: '科室3',
        },
      ],
      showTable: true,
    }
  },
  methods: {
    //获取表格数据
    async getClinicList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let res = await this.$API.clinic.getClinic(page, limit)
      console.log(res)
      // if (res.code === 200) {
      //   this.clinicList = res.data
      // }
    },
    //搜索
    async search(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const searchObj = this.tempSearchObj.username
      let res = await this.$API.clinic.searchClinic(
        page,
        limit,
        searchObj
      )
      console.log(res)
      // if (res.code === 200) {
      //   this.clinicList = res.data
      // }
    },
    //清空
    resetSearch() {
      this.tempSearchObj.username = ''
    },
  },
  mounted() {
    this.getClinicList()
  },
}
</script>

<style>
</style>