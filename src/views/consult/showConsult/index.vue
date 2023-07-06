<template>
  <div>
    <el-card class="box-card">
      <div v-show="showTable">
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
        <div style="margin-bottom: 20px">
          <!-- 添加与批量添加按钮 -->
          <el-button type="success" icon="el-icon-circle-plus" @click="showAddUser">添 加</el-button>
        </div>
        <!-- 按钮 -->
        <el-table style="width: 100%" border :data="consultList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- ID -->
          <!-- <el-table-column prop="id" label="出诊ID" width="80px" align="center">
          </el-table-column> -->
          <!-- doctorName -->
          <el-table-column prop="doctorName" label="医生姓名" width="160px">
          </el-table-column>
          <!-- patientName -->
          <el-table-column prop="patientName" label="患者姓名" width="160px">
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

              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteAttr(row)">
                <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <!-- 分页   @size-change="handleSizeChange" @current-change="getSkuList"      -->
        <el-pagination style="text-align: center" @size-change="handleSizeChange" @current-change="getConsultList" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
      </div>

      <div v-show="!showTable">
        <!-- 行内表单 -->
        <el-form :label-position="right" label-width="100px">
          <el-form-item label="出诊编号" v-show="!showId">
            {{ consultInfo.id }}
          </el-form-item>

          <el-form-item label="医生姓名">
            <el-input placeholder="请输入医生姓名" v-model="consultInfo.doctorName"></el-input>
          </el-form-item>

          <el-form-item label="患者姓名">
            <el-input placeholder="请输入患者姓名" v-model="consultInfo.patientName"></el-input>
          </el-form-item>

          <el-form-item label="出诊开始时间">
            <el-date-picker style="width: 350px;" v-model="consultInfo.consultBegin" type="datetime" placeholder="出诊开始时间" format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒" value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="出诊结束时间">
            <el-date-picker style="width: 350px;" v-model="consultInfo.consultEnd" type="datetime" placeholder="出诊开始时间" format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒" value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </el-form-item>

        </el-form>

        <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="consultInfo.doctorName==''||consultInfo.consultBegin==''||consultInfo.consultEnd==''">保存</el-button>
        <el-button @click="deleteshowTable">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { logger } from 'runjs/lib/common'
export default {
  data() {
    return {
      right: 'right', //表单对齐方式
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
          id: 1,
          doctorName: '张三',
          patientName: '李四',
          consultBegin: '2023-07-01 09:49:00.0',
          consultEnd: '2023-07-01 11:49:00.0',
          uuid: '1',
        },
        {
          id: 2,
          doctorName: '张三',
          patientName: '李四',
          consultBegin: '2023-07-01 09:49:00.0',
          consultEnd: '2023-07-01 11:49:00.0',
          uuid: '2',
        },
      ],
      showTable: true,
      showId: true,
      //收集新增属性|修改属性使用的
      consultInfo: {
        id: '',
        doctorName: '',
        patientName: '',
        consultBegin: '',
        consultEnd: '',
        uuid: '',
      },
    }
  },
  methods: {
    //获取表格数据
    async getConsultList(pages = 1) {
      this.page = pages
      let uuid = localStorage.getItem('UUID')
      const { page, limit } = this

      let res = await this.$API.consult.searchConsultUUID(page, limit, uuid)
      console.log(res)
      if (res.code === 2000) {
        this.total = res.data.pageNum
        this.consultList = res.data.content
        this.consultList.uuid = localStorage.getItem('UUID')
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getConsultList()
    },
    //管理员搜索医生信息
    async search(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const searchObj = this.tempSearchObj.username
      let res = await this.$API.consult.searchConsultDoctor(
        page,
        limit,
        searchObj
      )
      console.log(res)
      if (res.code === 2000) {
        this.consultList = res.data.content
      }
    },
    //清空
    resetSearch() {
      this.tempSearchObj.username = ''
      this.getConsultList()
    },
    //转到添加页面
    showAddUser() {
      this.showTable = false
      this.showId = true
    },
    //修改
    updataAttr(row) {
      this.showTable = false
      this.showId = false
      this.consultInfo.id = row.id
      this.consultInfo.doctorName = row.doctorName
      this.consultInfo.patientName = row.patientName
      this.consultInfo.consultBegin = row.consultBegin
      this.consultInfo.consultEnd = row.consultEnd
      this.consultInfo.uuid = row.uuid
    },
    //修改或添加
    async addOrupdataAttr() {
      if (this.consultInfo.id != '') {
        console.log(this.consultInfo)
        let res = await this.$API.consult.editConsult(this.consultInfo)
        console.log(res)
        if (res.code === 2000) {
          // this.consultList = res.data.content
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.showTable = true
          this.showId = true
          this.getConsultList()
        }
      } else {
        const addc = this.consultInfo
        delete addc.id
        console.log(addc)
        let res = await this.$API.consult.addConsult(addc)
        console.log(res)
        if (res.code === 2000) {
          // this.consultList = res.data.content
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.showTable = true
          this.showId = true
          this.getConsultList()
        }
      }
    },
    //删除
    async deleteAttr(row) {
      this.visible = false
      let res = await this.$API.consult.deleteConsult(row.id)
      console.log(res)
      if (res.code === 2000) {
        this.getConsultList()
      }
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.showId = false
      this.consultInfo.id = ''
      this.consultInfo.doctorName = ''
      this.consultInfo.patientName = ''
      this.consultInfo.consultBegin = ''
      this.consultInfo.consultEnd = ''
    },
  },
  mounted() {
    this.getConsultList()
    this.consultInfo.uuid = localStorage.getItem('UUID')
    console.log(this.consultInfo.uuid)
  },
}
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>