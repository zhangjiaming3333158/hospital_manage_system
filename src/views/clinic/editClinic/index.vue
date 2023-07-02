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
          <el-form-item label="诊室编号">
            {{ clinicInfo.clinicId }}
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="诊室名称">
            <el-input placeholder="请输入诊室名称" v-model="clinicInfo.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="诊室介绍">
            <el-input style="width: 400px;" type="textarea" :rows="4" placeholder="请输入诊室介绍" v-model="clinicInfo.introduce"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="诊室所属科室">
            <el-input placeholder="请输入诊室所属科室" v-model="clinicInfo.department"></el-input>
          </el-form-item>
        </el-form>
        
        <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="clinicInfo.name==''||clinicInfo.introduce==''||clinicInfo.department==''">保存</el-button>
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
      clinicList: [
        {
          clinicId: '1',
          clinicName: '诊室1',
          clinicIntroduce: '诊室1介绍',
          belongingDepartment: '科室1',
        },
        {
          clinicId: '2',
          clinicName: '诊室2',
          clinicIntroduce: '诊室2介绍',
          belongingDepartment: '科室2',
        },
        {
          clinicId: '3',
          clinicName: '诊室3',
          clinicIntroduce: '诊室3介绍',
          belongingDepartment: '科室3',
        },
      ],
      showId: true,
      showTable: true,
      //收集新增属性|修改属性使用的
      clinicInfo: {
        clinicId: '', //属性id
        name: '', //属性名
        introduce: '', //三级分类的id
        department: '', //因为服务器也需要区分几级id
      },
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
    //转到添加页面
    showAddUser() {
      this.showTable = false
    },
    //修改
    updataAttr(row) {
      this.showTable = false
      this.showId = false
      this.clinicInfo.clinicId = row.clinicId
    },
    //修改或删除
    async addOrupdataAttr() {
      if (this.clinicInfo.clinicId != '') {
        let res = await this.$API.clinic.editClinic(
          this.clinicInfo,
          this.clinicInfo.clinicId
        )
        console.log(res)
        // if (res.code === 200) {
        //   this.clinicList = res.data
        // }
      } else {
        let res = await this.$API.clinic.editClinic(this.clinicInfo)
        console.log(res)
        // if (res.code === 200) {
        //   this.clinicList = res.data
        // }
      }
    },
    //删除
    async deleteAttr(row) {
      this.visible = false
      let res = await this.$API.clinic.deleteClinic(
        row.clinicId
      )
      console.log(res)
      // if (res.code === 200) {
      //   this.clinicList = res.data
      // }
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.showId = false
    },
  },
  mounted() {
    this.getClinicList()
  },
}
</script>

<style>
</style>