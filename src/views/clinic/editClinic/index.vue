<template>
  <div>
    <el-card class="box-card">

      <div v-show="showTable">
        <span class="tittle">诊室信息表</span>
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
        <el-table style="width: 100%" border :data="clinicList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- ID -->
          <el-table-column prop="id" label="诊室ID" width="80px" align="center">
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
        <!-- 分页     -->
        <el-pagination style="text-align: center" @size-change="handleSizeChange" @current-change="getClinicList" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
      </div>

      <div v-show="!showTable">
        <!-- 行内表单 -->
        <el-form :label-position="right" label-width="100px">
          <el-form-item label="诊室ID" v-show="!showId">
            {{ clinicInfo.id }}
          </el-form-item>

          <el-form-item label="诊室名称">
            <el-input style="width: 400px;" placeholder="请输入诊室介绍" v-model="clinicInfo.clinicName"></el-input>
          </el-form-item>

          <el-form-item label="诊室介绍">
            <el-input style="width: 400px;" type="textarea" :rows="4" placeholder="请输入诊室介绍" v-model="clinicInfo.clinicIntroduce"></el-input>
          </el-form-item>

          <el-form-item label="诊室所属科室">
            <el-select v-model="clinicInfo.belongingDepartment" clearable placeholder="请输入诊室所属科室">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="clinicInfo.clinicName==''||clinicInfo.clinicIntroduce==''||clinicInfo.belongingDepartment==''">保存</el-button>
        <el-button @click="deleteshowTable">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
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
      clinicList: [
        {
          id: '1',
          clinicName: '诊室1',
          clinicIntroduce: '诊室1介绍',
          belongingDepartment: '科室1',
        },
        {
          id: '2',
          clinicName: '诊室2',
          clinicIntroduce: '诊室2介绍',
          belongingDepartment: '科室2',
        },
        {
          id: '3',
          clinicName: '诊室3',
          clinicIntroduce: '诊室3介绍',
          belongingDepartment: '科室3',
        },
      ],
      showId: true,
      showTable: true,
      //收集新增属性|修改属性使用的
      clinicInfo: {
        id: '', //id
        clinicName: '', //属性名
        clinicIntroduce: '', //三级分类的id
        belongingDepartment: '', //因为服务器也需要区分几级id
      },
      //下拉框
      options: [
        {
          value: '选项1',
          label: '内科',
        },
        {
          value: '选项2',
          label: '呼吸科',
        },
      ],
    }
  },
  methods: {
    //获取表格数据
    async getClinicList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let res = await this.$API.clinic.searchClinic(page, limit, '')
      console.log(res)
      if (res.code === 2000) {
        this.total=res.data.length
        this.clinicList = res.data
      }
    },
    //分页
    handleSizeChange(limit) {
      this.limit = limit
      this.getClinicList()
    },
    //搜索
    async search(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const searchObj = this.tempSearchObj.username
      let res = await this.$API.clinic.searchClinic(page, limit, searchObj)
      console.log(res)
      if (res.code === 2000) {
        this.clinicList = res.data
      }
    },
    //清空
    resetSearch() {
      this.tempSearchObj.username = ''
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
      this.clinicInfo.id = row.id
      this.clinicInfo.clinicName = row.clinicName
      this.clinicInfo.clinicIntroduce = row.clinicIntroduce
      this.clinicInfo.belongingDepartment = row.belongingDepartment
    },
    //修改或添加
    async addOrupdataAttr() {
      if (this.clinicInfo.id != '') {
        let res = await this.$API.clinic.editClinic(this.clinicInfo)
        console.log(res)
        if (res.code === 2000) {
          this.clinicList = res.data
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.showTable = true
          this.showId = false
          this.getClinicList()
        }
      } else {
        let res = await this.$API.clinic.editClinic(this.clinicInfo)
        console.log(res)
        if (res.code === 2000) {
          this.clinicList = res.data
          this.$message({
            type: 'success',
            message: '修改成功',
          })
          this.showTable = true
          this.showId = false
          this.getClinicList()
        }
      }
    },
    //删除
    async deleteAttr(row) {
      this.visible = false
      let res = await this.$API.clinic.deleteClinic(row.id)
      console.log(res)
      if (res.code === 2000) {
        this.clinicList = res.data
      }
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.showId = false
      this.clinicInfo.id = ''
      this.clinicInfo.clinicName = ''
      this.clinicInfo.clinicIntroduce = ''
      this.clinicInfo.belongingDepartment = ''
    },
  },
  mounted() {
    this.getClinicList()
  },
}
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>