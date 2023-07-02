<template>
  <div>
    <el-card class="box-card">
      <el-form inline style="text-align: center;">
        <!-- 表单元素 -->
        <el-form-item>
          <el-input v-model="tempSearchObj.username" placeholder="用户名" />
        </el-form-item>
        <!-- 查询与情况的按钮 -->
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
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

      <div v-show="!showTable">
        <!-- 行内表单 -->
        <el-form :inline="true">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button>取消</el-button>
        <el-table style="width: 100%; margin: 10px 0;" border :data="attrInfo.attrValueList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- 属性名称 -->
          <el-table-column prop="attrName" label="属性名" width="width">
            <template slot-scope="{ row ,$index }">
              <!-- 这里结构需要用到span与input进行来回的切换 -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display: block">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column prop="" label="操作" width="200px">
            <template slot-scope="{row}">
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteButton(row)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" icon="el-icon-plus" @click="addOrupdataAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="deleteshowTable">取消</el-button>
      </div>
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
}
</script>

<style lang="less" scoped>
.box-card{
  .el-form{
    .el-form-item{
      .el-input{
        width: 300px;
      }
    }
  }
}
</style>