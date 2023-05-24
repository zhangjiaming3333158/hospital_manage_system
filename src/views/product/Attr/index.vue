<template>
  <div>
    <CategorySelect @getId="getId" :show="!showTable"/>
    <el-card class="box-card">
      <div v-show="showTable">
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" :disabled="!id3" @click="changeShow">添加属性</el-button>
        <el-table style="width: 100%" border :data="attrList">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <!-- 品牌名称 -->
          <el-table-column prop="attrName" label="属性名" width="160px">
          </el-table-column>
          <!-- 品牌LOGO -->
          <el-table-column prop="" label="属性值" width="width">
            <template slot-scope="{ row }">
              <el-tag size="mini" type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin: 0px 10px">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column prop="" label="操作" width="200px">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataAttr(row)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

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
import { cloneDeep } from 'lodash'
export default {
  data() {
    return {
      id1: '',
      id2: '',
      id3: '',
      attrList: [],
      showTable: true,
      //收集新增属性|修改属性使用的
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
    //获取分类id
    getId({ Id, level }) {
      if (level == 1) {
        this.id1 = Id
        this.id2 = ''
        this.id3 = ''
      } else if (level == 2) {
        this.id2 = Id
        this.id3 = ''
      } else if (level == 3) {
        this.id3 = Id
        this.reqAttrList()
      }
    },
    //发请求获取属性列表
    async reqAttrList() {
      const { id1, id2, id3 } = this
      let res = await this.$API.attr.reqAttrList(id1, id2, id3)
      if (res.code == 200) {
        this.attrList = res.data
      }
    },
    //切换显示
    changeShow() {
      this.showTable = !this.showTable
    },
    //添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true,
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    //取消
    deleteshowTable() {
      this.showTable = true
      this.attrInfo = {
        attrName: '', //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: this.id3, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      }
    },
    //修改属性
    updataAttr(row) {
      this.showTable = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag自动，但是会发现视图不会跟着变化（因为flag不是响应式数据）
        //因为Vue无法探测普通的新增 property,这样书写的属性并非响应式属性（数据变化视图跟这边）
        //第一个参数:对象  第二个参数:添加新的响应式属性  第三参数：新的属性的属性值
        this.$set(item, 'flag', false)
      })
    },
    //修改属性值
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        //获取相应的input表单元素实现聚焦
        this.$refs[index].focus()
      })
    },
    //修改属性值
    toLook(row) {
      if (!row.valueName.trim()) {
        this.$message.error('属性值不能为空')
        return
      }
      let repeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return item.valueName == row.valueName
        }
      })
      if (repeat) {
        this.$message.error('属性值不能重复')
        return
      }
      row.flag = false
    },
    deleteButton(row) {
      let index = this.attrInfo.attrValueList.indexOf(row)
      this.attrInfo.attrValueList.splice(index, 1)
    },
    //添加或修改属性
    async addOrupdataAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //过滤掉属性值不是空的
          if (item.valueName != '') {
            //删除掉flag属性
            delete item.flag
            return true
          }
        }
      )
      try {
        //发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        //展示平台属性的信号量进行切换
        this.showTable = true
        //提示消失
        this.$message({ type: 'success', message: '保存成功' })
        //保存成功以后需要再次获取平台属性进行展示
        this.reqAttrList()
      } catch (error) {
        // this.$message('保存失败')
      }
    },
  },
}
</script>

<style>
</style>
