<template>
  <div>
    <el-card class="box-card">
      <div v-show="showTable">
        <span class="tittle">科室信息表</span>
        <el-form inline style="text-align: center;">
          <!-- 表单元素 -->
          <el-form-item>
            <el-input v-model="tempSearchObj.username" placeholder="查询值" />
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
        <el-table style="width: 100%" border :data="departmentList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- ID -->
          <el-table-column prop="id" label="科室ID" width="80px" align="center">
          </el-table-column>
          <!-- departmentName -->
          <el-table-column prop="departmentName" label="科室名称" width="160px">
          </el-table-column>
          <!-- departmentIntroduce -->
          <el-table-column prop="departmentIntroduce" label="科室介绍" width="width">
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
        <!-- 分页         -->
        <el-pagination style="text-align: center" @size-change="handleSizeChange" @current-change="getDepartmentList" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
      </div>

      <div v-show="!showTable">
        <!-- 行内表单 -->
        <el-form :label-position="right" label-width="100px">
          <el-form-item label="科室编号" v-show="!showId">
            {{ departmentInfo.id }}
          </el-form-item>

          <el-form-item label="科室名称">
            <el-input placeholder="请输入科室名称" v-model="departmentInfo.departmentName"></el-input>
          </el-form-item>

          <el-form-item label="科室介绍">
            <el-input style="width: 400px;" type="textarea" :rows="4" placeholder="请输入科室名称" v-model="departmentInfo.departmentIntroduce"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="departmentInfo.departmentName==''||departmentInfo.departmentIntroduce==''">保存</el-button>
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
      departmentList: [
        {
          id: 1,
          departmentName: '内科1',
          departmentIntroduce: '内科介绍1',
        },
        {
          id: 2,
          departmentName: '内科2',
          departmentIntroduce: '内科介绍2',
        },
      ],
      //是否显示表格
      showTable: true,
      showId: true,
      //添加或修改
      departmentInfo: {
        id: '', //属性名
        departmentName: '', //属性名
        departmentIntroduce: '', //属性名
      },
    }
  },
  methods: {
    //获取表格数据
    async getDepartmentList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let res = await this.$API.department.searchDepartment(page, limit)
      console.log(res)
      if (res.code === 2000) {
        this.total=res.data.pageNum
        this.departmentList = res.data.content
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getDepartmentList()
    },
    //搜索
    async search(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const searchObj = this.tempSearchObj.username
      let res = await this.$API.department.searchDepartment(
        page,
        limit,
        searchObj
      )
      console.log(res)
      if (res.code === 2000) {
        this.departmentList = res.data.content
      }
    },
    //清空
    resetSearch() {
      this.tempSearchObj.username = ''
      this.getDepartmentList()
    },
    //转到添加页面
    showAddUser() {
      this.showTable = false
    },
    //修改
    updataAttr(row) {
      this.showTable = false
      this.showId = false
      this.departmentInfo.id = row.id
      this.departmentInfo.departmentName = row.departmentName
      this.departmentInfo.departmentIntroduce = row.departmentIntroduce
    },
    //修改或添加
    async addOrupdataAttr() {
      if (this.departmentInfo.id != '') {
        let res = await this.$API.department.editDepartment(this.departmentInfo)
        console.log(res)
        if (res.code === 2000) {
          // this.departmentList = res.data.content
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.showTable = true
          this.showId = true
          this.getDepartmentList()
        }
      } else {
        let res = await this.$API.department.addDepartment(this.departmentInfo)
        console.log(res)
        if (res.code === 2000) {
          // this.departmentList = res.data.content
          this.$message({
            type: 'success',
            message: '修改成功',
          })
          this.showTable = true
          this.showId = true
          this.getDepartmentList()
        }
      }
    },
    //删除
    async deleteAttr(row) {
      this.visible = false
      let res = await this.$API.department.deleteDepartment(
        row.id
      )
      console.log(res)
      if (res.code === 2000) {
        this.getDepartmentList()
      }
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.showId = false
      this.departmentInfo.id = ''
      this.departmentInfo.departmentName = ''
      this.departmentInfo.departmentIntroduce = ''
    },
  },
  mounted() {
    this.getDepartmentList()
  },
}
</script>

<style lang="less" scoped>
.box-card {
  .el-form {
    .el-form-item {
      .el-input {
        width: 300px;
      }
    }
  }
}
</style>