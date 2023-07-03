<template>
  <div>
    <el-card class="box-card">
      <span class="tittle">科室</span>信息表</span>
      <el-form inline style="text-align: center;">
        <!-- 表单元素 -->
        <el-form-item>
          <el-input v-model="tempSearchObj.username" placeholder="用户名" />
        </el-form-item>
        <!-- 查询与情况的按钮 -->
        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        <el-button type="default" @click="resetSearch">清空</el-button>
      </el-form>
      <div v-show="showTable">
        <!-- 按钮 -->
        <el-table style="width: 100%" border :data="departmentList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- departmentName -->
          <el-table-column prop="departmentName" label="科室名称" width="160px">
          </el-table-column>
          <!-- departmentintroduce -->
          <el-table-column prop="departmentintroduce" label="科室介绍" width="width">
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
      departmentList: [
        {
          departmentName: '内科',
          departmentintroduce: '内科介绍',
        },
        {},
      ],
      //是否显示表格
      showTable: true,

      //无用数据
      attrList: [],
      attrInfo: {
        attrName: '', //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      },
    }
  },
  methods: {
    //获取表格数据
    async getDepartmentList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let res = await this.$API.department.getDepartment(page, limit)
      console.log(res)
      // if (res.code === 200) {
      //   this.departmentList = res.data
      // }
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
      // if (res.code === 200) {
      //   this.departmentList = res.data
      // }
    },
    //清空
    resetSearch() {
      this.tempSearchObj.username = ''
    },
  },
  mounted(){
    this.getDepartmentList()
  }
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