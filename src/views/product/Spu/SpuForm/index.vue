<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkList" :key="tm.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="spu.description">
        </el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload action="/dev1-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handlerSuccess" :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unSelectSaleAttr" :key="unselect.id">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="200px"></el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">{{ tag.saleAttrValueName }}</el-tag>
              <!-- @keyup.enter.native="handleInputConfirm" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" :ref="$index" size="small" @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row,$index)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="80px">
            <template slot-scope="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        spuName: '',
        description: '',
        category3Id: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: [],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      attrIdAndAttrName: '',
      //tag
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    handleRemove(file, fileList) {
      //更新spuImageList
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async initSpuForm(spu) {
      let spuResult = await this.$API.spu.reqSpu(spu.row.id)
      if (spuResult.code == 200) {
        //在修改spu的时候,需要向服务器发请求的，把服务器返回的数据（对象），赋值给spu属性
        this.spu = spuResult.data
        console.log(spuResult)
      }
      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
        console.log(tradeMarkResult)
      }
      //获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.row.id)
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data
        this.spuImageList = listArr.map((item) => {
          return {
            name: item.imgName,
            url: item.imgUrl,
            uid: item.id,
            status: 'success',
          }
        })
        console.log(spuImageResult)
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data
        console.log(saleResult)
      }
    },
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    //添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndAttrName = ''
    },
    //tag按钮
    showInput(row,index) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    //失焦
    handleInputConfirm(row) {
      //解构出销售属性当中收集数据
      const { baseSaleAttrId, inputValue } = row
      //新增的销售属性值的名称不能为空
      if (inputValue.trim() == '') {
        this.$message('属性值不能为空')
        row.inputVisible = false
        return
      }
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      )
      if (result) {
        let newSaleAttrValue = {
          baseSaleAttrId,
          saleAttrValueName: inputValue.trim(),
        }
        //新增
        row.spuSaleAttrValueList.push(newSaleAttrValue)
        //修改inputVisible为false，不就显示button
        row.inputVisible = false
      } else {
        this.$message('属性值不能重复')
        row.inputVisible = false
      }
    },
    //保存
    async addOrUpdateSpu() {
      //获取spu图片的数据
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        }
      })
      //发送请求
      console.log(this.spu);
      let result = await this.$API.spu.reqAddOrUpdateAttr(this.spu)
      if (result.code == 200) {
        this.$message({
          message: '保存成功',
          type: 'success',
        })
        this.$emit('changeScene', {
          scene: 0,
          flag: this.spu.id ? '修改' : '添加',
        })
      }
      console.log(result);
      //清除数据
      Object.assign(this._data, this.$options.data())
    },
    //添加spu
    async addSpuData(id3) {
      this.spu.category3Id = id3
      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
        console.log(tradeMarkResult)
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data
        console.log(saleResult)
      }
    },
    //取消按钮
    cancel() {
      this.$emit('changeScene', { scene: 0, flag: '' })
      //清理数据
      //Object.assign:es6中新增的方法可以合并对象
      //组件实例this._data,可以操作data当中响应式数据
      //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data())
    }
  },
  computed: {
    unSelectSaleAttr() {
      let res = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName !== item.name
        })
      })
      return res
    },
  },
  mounted() {},
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>