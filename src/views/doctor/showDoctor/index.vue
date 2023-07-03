<template>
  <div class="editDoctor">
    <el-card>
      <div v-show="showTable">
        <span class="tittle">医生信息表</span>
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
          <el-button type="success" icon="el-icon-edit" @click="showAddUser">修改个人信息</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="doctorList" border style="width: 100%;">
          <el-table-column fixed prop="index" label="序号" width="50">
            <template scope="scope">
              {{scope.$index}}
            </template>
          </el-table-column>
          <el-table-column fixed prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column fixed prop="birthday" label="生日" width="150">
          </el-table-column>
          <el-table-column fixed prop="identificationNumbe" label="医生号" width="100">
          </el-table-column>
          <el-table-column fixed prop="phoneNumber" label="手机号" width="150">
          </el-table-column>
          <el-table-column fixed prop="introduce" label="介绍" width="width">
          </el-table-column>
          <el-table-column fixed prop="office" label="科室" width="150">
          </el-table-column>
          <!-- <el-table-column prop="" label="操作" width="200px">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataAttr(row)">修改</el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteAttr(row)">
                <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column> -->
        </el-table>
        <!-- 分页   @size-change="handleSizeChange" @current-change="getSkuList"      -->
        <el-pagination style="text-align: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
      </div>

      <div v-show="!showTable">
        <!-- 行内表单 -->
        <el-form :label-position="right" label-width="100px" :model="doctorInfo">
          <el-form-item label="医生名称">
            <el-input placeholder="请输入医生名称" v-model="doctorInfo.name"></el-input>
          </el-form-item>

          <el-form-item label="医生生日">
            <el-date-picker v-model="doctorInfo.birthday" type="date" placeholder="请输入医生生日" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="医生编号">
            {{ doctorInfo.identificationNumbe }}
          </el-form-item>

          <el-form-item label="医生手机号">
            <el-input placeholder="请输入医生手机号" v-model="doctorInfo.phoneNumber"></el-input>
          </el-form-item>

          <el-form-item label="医生介绍">
            <el-input style="width: 400px;" type="textarea" :rows="4" placeholder="请输入医生介绍" v-model="doctorInfo.introduce"></el-input>
          </el-form-item>

          <el-form-item label="医生所属科室">
            <el-select v-model="doctorInfo.office" clearable placeholder="请输入医生所属科室">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <!-- <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="clinicInfo.name==''||clinicInfo.introduce==''||clinicInfo.department==''">保存</el-button> -->
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
      showTable: true,
      showId: true,
      //分页
      page: 1,
      limit: 5,
      total: 0,
      // 获取json存放在doctorlist里面
      doctorList: [
        {
          name: '张三',
          birthday: '1999-01-01',
          identificationNumbe: '123456',
          phoneNumber: '12345678910',
          appointmentfee: '100',
          introduce: '我是张三',
          office: '内科',
        },
        {},
      ],
      //搜索条件
      tempSearchObj: {
        // 收集搜索条件输入的对象
        username: '',
      },
      //收集新增属性|修改属性使用的
      doctorInfo: {
        name: '', //属性名
        birthday: '',
        identificationNumbe: '',
        phoneNumber: '',
        appointmentfee: '',
        introduce: '',
        office: '',
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
    async getDoctorList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let res = await this.$API.doctor.getDoctor(page, limit)
      console.log(res)
      // if (res.code === 200) {
      //   this.doctorList = res.data
      // }
    },
    //搜索
    async search(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const searchObj = this.tempSearchObj.username
      let res = await this.$API.doctor.searchDoctor(page, limit, searchObj)
      console.log(res)
      // if (res.code === 200) {
      //   this.doctorList = res.data
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
      this.doctorInfo.doctorId = row.doctorId
      this.doctorInfo.name = row.doctorName
      this.doctorInfo.introduce = row.doctorIntroduce
      this.doctorInfo.department = row.belongingDepartment
    },
    //修改或删除
    async addOrupdataAttr() {
      if (this.doctorInfo.doctorId != '') {
        let res = await this.$API.doctor.editDoctor(this.doctorInfo)
        console.log(res)
        // if (res.code === 200) {
        //   this.doctorList = res.data
        // }
      } else {
        let res = await this.$API.doctor.editDoctor(this.doctorInfo)
        console.log(res)
        // if (res.code === 200) {
        //   this.doctorList = res.data
        // }
      }
    },
    //删除
    async deleteAttr(row) {
      this.visible = false
      let res = await this.$API.doctor.deleteDoctor(row.doctorId)
      console.log(res)
      // if (res.code === 200) {
      //   this.doctorList = res.data
      // }
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.showId = false
    },
  },
  mounted() {
    this.getDoctorList()
  },
}
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
