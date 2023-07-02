<template>
  <div>
    <el-card class="box-card">

      <div v-show="showTable">
        <el-form inline style="text-align: center;">
          <!-- 表单元素 -->
          <el-form-item>
            <el-input style="width: 300px;" v-model="tempSearchObj.username" placeholder="用户名" />
          </el-form-item>
          <!-- 查询与情况的按钮 -->
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="default" @click="resetSearch">清空</el-button>
        </el-form>
        <div style="margin-bottom: 20px">
          <!-- 添加与批量添加按钮 -->
          <el-button type="success" icon="el-icon-circle-plus" @click="showAddUser">添 加</el-button>
        </div>
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
          <!-- 操作 -->
          <el-table-column prop="" label="操作" width="200px">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataAttr(row)">修改</el-button>
              <el-popover placement="top" width="160" v-model="visible">
                <p> 确定删除这一段内容吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteAttr(row)">确定</el-button>
                </div>
                <el-button trigger style="margin-left: 10px;" slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页   @size-change="handleSizeChange" @current-change="getSkuList"      -->
        <el-pagination style="text-align: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
      </div>

      <div v-show="!showTable">
        <!-- 行内表单 -->
        <el-form :inline="true" v-show="!showId">
          <el-form-item label="医生编号">
            {{ consultInfo.doctorId }}
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="医生姓名">
            <el-input placeholder="请输入医生姓名" v-model="consultInfo.doctorName"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="出诊开始时间">
            <el-input placeholder="请输入出诊开始时间" v-model="consultInfo.consultBegin"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="出诊结束时间">
            <el-input placeholder="请输入出诊结束时间" v-model="consultInfo.consultEnd"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="consultInfo.doctorName==''||consultInfo.consultBegin==''||consultInfo.consultEnd==''">保存</el-button>
        <el-button @click="deleteshowTable">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //弹出框
      visible: false,
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
          doctorId: '1',
          doctorName: '张三',
          consultBegin: '2020-01-01',
          consultEnd: '2020-01-02',
        },
      ],
      showTable: true,
      showId: true,
      //收集新增属性|修改属性使用的
      consultInfo: {
        doctorId: '', //属性id
        doctorName: '', //属性名
        consultBegin: '', //三级分类的id
        consultEnd: '', //因为服务器也需要区分几级id
      },
    }
  },
  methods: {
    //获取表格数据
    async getConsultList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let res = await this.$API.consult.getConsult(page, limit)
      console.log(res)
      // if (res.code === 200) {
      //   this.consultList = res.data
      // }
    },
    //搜索
    async search(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const searchObj = this.tempSearchObj.username
      let res = await this.$API.consult.searchConsult(page, limit, searchObj)
      console.log(res)
      // if (res.code === 200) {
      //   this.consultList = res.data
      // }
    },
    //清空
    resetSearch() {
      this.tempSearchObj.username = ''
    },
    //转到添加页面
    showAddUser() {
      this.showTable = false
    },
    //修改
    updataAttr(row) {
      this.showTable = false
      this.showId = false
      this.consultInfo.doctorId = row.doctorId
    },
    //修改或删除
    async addOrupdataAttr() {
      if (this.consultInfo.doctorId != '') {
        let res = await this.$API.consult.editConsult(
          this.consultInfo,
          this.consultInfo.doctorId
        )
        console.log(res)
        // if (res.code === 200) {
        //   this.consultList = res.data
        // }
      } else {
        let res = await this.$API.consult.addConsult(this.consultInfo)
        console.log(res)
        // if (res.code === 200) {
        //   this.consultList = res.data
        // }
      }
    },
    //删除
    async deleteAttr(row) {
      this.visible = false
      let res = await this.$API.consult.deleteConsult(row.doctorId)
      console.log(res)
      // if (res.code === 200) {
      //   this.consultList = res.data
      // }
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.showId = false
    },
  },
  mounted() {
    this.getConsultList()
  },
}
</script>

<style>
</style>