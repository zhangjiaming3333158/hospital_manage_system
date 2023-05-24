<template>
  <div class="tradeMark-contianer">
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="dialogFormVisiblechange">添加</el-button>

    <!-- 
      表格组件 
      data:表格组件将来需要展示的数据------数组类型
      border：是给表格添加边框
      column属性
      label：显示标题
      width：对应列的宽度
      align：标题的对齐方式
      prop:对应列内容的字段名
      注意1：elmentUI当中的table组件，展示的数据是以一列一列进行展示数据
    -->
    <el-table style="width: 100%" border :data="list">
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <!-- 品牌名称 -->
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <!-- 品牌LOGO -->
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="open(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      分页器 
      当前第几页、数据总条数、每一页展示条数、连续页码数
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page:代表的是当前第几页
      total：代表分页器一共需要展示数据条数
      page-size：代表的是每一页需要展示多少条数据
      page-sizes：代表可以设置每一页展示多少条数据
      layout：可以实现分页器布局
      pager-count:按钮的数量  如果 9  连续页码是7
    -->
    <el-pagination style="margin-top: 20px; text-align: center" :current-page="page" :total="total" :page-size="limit" :pager-count="7" :page-sizes="[3, 5, 10]" @current-change="getPageList" @size-change="handleSizeChange" layout="prev, pager, next, jumper,->,sizes,total">
    </el-pagination>

    <el-dialog :title="tmForm.id?'修改商品':'添加商品'" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" :rules="rules" ref="tmFormValidateForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev1-api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 组件的数据
  data() {
    // 自定义表单验证
    var validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('请输入2-10个字符'))
      } else {
        callback()
      }
    }
    return {
      list: [],
      page: 1,
      limit: 3,
      total: 0,
      dialogFormVisible: false,
      imageUrl: '',
      tmForm: {
        tmName: '',
        logoUrl: '',
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          //自定义校验规则
          { validator: validateTmName, trigger: 'change' },
        ],
        logoUrl: [
          { required: true, message: '请上传品牌LOGO', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      const { page, limit } = this
      let res = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (res.code == 200) {
        this.list = res.data.records
        this.total = res.data.total
      }
    },
    //页码
    getPageList(page) {
      this.page = page
      this.getList()
    },
    //每页显示条数
    handleSizeChange(limit) {
      this.limit = limit
      this.getList()
    },
    //添加图片成功
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //修改/添加
    dialogFormVisiblechange() {
      this.dialogFormVisible = true
      this.tmForm.logoUrl = ''
      this.tmForm.tmName = ''
    },
    //修改
    updateTradeMark(row) {
      this.dialogFormVisible = true
      this.tmForm = { ...row }
    },
    //请求
    addOrUpdateTradeMark() {
      this.$refs.tmFormValidateForm.validate(async (valid) => {
        if (valid) {
          let res = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          )
          if (res.code == 200) {
            this.$message.success({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
            })
            this.dialogFormVisible = false
            this.getList(this.tmForm.id ? this.page : 1)
          } else {
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    },
    open(row) {
      console.log(row.id);
      this.dialogFormVisible = false
      this.$confirm(`你确定删除${row.tmName}?`, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let res = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if (res.code == 200) {
            this.$message({
              type: 'info',
              message: '删除成功',
            })
            //再次获取品牌列表数据
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>