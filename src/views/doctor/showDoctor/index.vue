<template>
  <div class="editDoctor">
    <el-card>
      <div v-show="showTable">
        <span class="tittle">个人信息表</span>

        <div style="margin: 20px 0" v-show="doctorList.length>0">
          <!-- 添加与批量添加按钮 -->
          <el-button type="success" icon="el-icon-edit" @click="updataAttr">修改个人信息</el-button>
        </div>
        <div style="margin: 20px 0" v-show="doctorList.length==0">
          <!-- 添加与批量添加按钮 -->
          <el-button type="warning" icon="el-icon-plus" @click="updataAttr">增加个人信息</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="doctorList" border style="width: 100%;">
          <!-- ID -->
          <el-table-column fixed prop="id" label="医生ID" width="80" align="center">
          </el-table-column>
          <el-table-column fixed prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column fixed prop="birthday" label="生日" width="120">
          </el-table-column>
          <el-table-column fixed prop="identificationNumber" label="医生身份证号" width="170">
          </el-table-column>
          <el-table-column fixed prop="phoneNumber" label="手机号" width="130">
          </el-table-column>
          <el-table-column fixed prop="appointmentFee" label="薪水" width="80">
          </el-table-column>
          <el-table-column fixed prop="introduce" label="介绍" width="width">
          </el-table-column>
          <el-table-column fixed prop="belongingDepartment" label="科室" width="100">
          </el-table-column>
        </el-table>
        <!-- 分页         -->
        <el-pagination style="text-align: center; margin-top: 20px;" @size-change="handleSizeChange" @current-change="getDoctorList" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
      </div>

      <div v-show="!showTable">
        <!-- 行内表单 -->
        <el-form :label-position="right" label-width="100px" :model="doctorInfo">

          <el-form-item label="医生ID" v-show="this.doctorList.length != 0">
            {{ doctorInfo.id }}
          </el-form-item>

          <el-form-item label="医生名称">
            <el-input placeholder="请输入医生名称" v-model="doctorInfo.name"></el-input>
          </el-form-item>

          <el-form-item label="医生生日">
            <el-date-picker v-model="doctorInfo.birthday" type="date" placeholder="请输入医生生日" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="医生身份证号">
            <el-input placeholder="请输入医生身份证号" v-model="doctorInfo.identificationNumber"></el-input>
          </el-form-item>

          <el-form-item label="医生手机号">
            <el-input placeholder="请输入医生手机号" v-model="doctorInfo.phoneNumber"></el-input>
          </el-form-item>

          <el-form-item label="医生挂号费">
            <el-input placeholder="请输入医生挂号费" v-model="doctorInfo.appointmentFee" type="number"></el-input>
          </el-form-item>

          <el-form-item label="医生介绍">
            <el-input style="width: 400px;" type="textarea" :rows="4" placeholder="请输入医生介绍" v-model="doctorInfo.introduce"></el-input>
          </el-form-item>

          <el-form-item label="医生所属科室">
            <el-select v-model="doctorInfo.belongingDepartment" clearable placeholder="请输入医生所属科室">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="doctorInfo.introduce==''||doctorInfo.name==''||doctorInfo.phoneNumber==''||doctorInfo.belongingDepartment==''">保存</el-button>
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
          // id: 1,
          // name: '黄羽',
          // birthday: '1989-01-01',
          // identificationNumber: '330782198901012311',
          // phoneNumber: '18649375880',
          // appointmentFee: 300,
          // introduce: '呼吸内科主治医生,10年的治疗经验',
          // belongingDepartment: '呯吸科',
          // uuid: 111,
        },
      ],
      //搜索条件
      tempSearchObj: {
        // 收集搜索条件输入的对象
        username: '',
      },
      //收集新增属性|修改属性使用的
      doctorInfo: {
        uuid: '',
        name: '',
        birthday: '',
        identificationNumber: '',
        phoneNumber: '',
        appointmentFee: '',
        introduce: '',
        belongingDepartment: '',
      },
      //下拉框
      options: [
        {
          value: '内科',
          label: '内科',
        },
        {
          value: '呼吸科',
          label: '呼吸科',
        },
        {
          value: '儿科',
          label: '儿科',
        },
      ],
    }
  },
  methods: {
    //获取表格数据
    async getDoctorList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const uuid = localStorage.getItem('UUID')
      let res = await this.$API.doctor.searchDoctorUUID(page, limit, uuid)
      console.log(res)
      if (res.code === 2000) {
        this.total = res.data.length
        this.doctorList = res.data
      }
    },
    //分页
    handleSizeChange(limit) {
      this.limit = limit
      this.getDoctorList()
    },
    //转到添加页面
    showAddUser() {
      this.showTable = false
    },
    //修改
    updataAttr() {
      this.showTable = false
      this.showId = false
      if (this.doctorList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先添加医生',
        })
      } else {
        this.doctorInfo.id = this.doctorList[0].id || ''
        this.doctorInfo.identificationNumber =
          this.doctorList[0].identificationNumber
        this.doctorInfo.name = this.doctorList[0].name
        this.doctorInfo.introduce = this.doctorList[0].introduce
        this.doctorInfo.belongingDepartment =
          this.doctorList[0].belongingDepartment
        this.doctorInfo.birthday = this.doctorList[0].birthday
        this.doctorInfo.phoneNumber = this.doctorList[0].phoneNumber
        this.doctorInfo.appointmentFee = this.doctorList[0].appointmentFee
        this.doctorInfo.uuid = this.doctorList[0].uuid
      }
    },
    //修改或添加
    async addOrupdataAttr() {
      if (this.doctorInfo.id != '') {
        let res = await this.$API.doctor.editDoctor(this.doctorInfo)
        console.log(res)
        if (res.code === 2000) {
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.showTable = true
          this.showId = true
          this.getDoctorList()
        }
      } else {
        let res = await this.$API.doctor.addDoctor(this.doctorInfo)
        console.log(res)
        if (res.code === 2000) {
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.showTable = true
          this.showId = true
          this.getDoctorList()
        }
      }
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.showId = false
    },
  },
  mounted() {
    this.getDoctorList()
    this.doctorInfo.uuid = localStorage.getItem('UUID')
  },
}
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
