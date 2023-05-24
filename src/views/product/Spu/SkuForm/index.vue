<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item :label="attr.attrName" v-for="attr in atrInfoList" :key="attr.id">
            <el-select placeholder="xxx" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column prop="prop" type="selection" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      atrInfoList: [],
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：需要通过数据双向绑定v-model收集
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        //第三类：需要自己书写代码
        //默认图片
        skuDefaultImg: '',
        //收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        //平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {},
      imageList: [],
    }
  },
  methods: {
    //接受父组件id3
    async addSkuData(id1, id2, id3, spu) {
      console.log(spu)
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      let result = await this.$API.spu.reqSpuImageList(spu.id)
      if (result.code == 200) {
        let list = result.data
        list.forEach((item) => {
          item.isDefault = 0
        })
        this.spuImageList = list
        console.log(this.spuImageList)
      }

      let spuSaleAttrListResult = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if (spuSaleAttrListResult.code == 200) {
        this.spuSaleAttrList = spuSaleAttrListResult.data
        console.log(this.spuSaleAttrList)
      }

      let atrInfoListResult = await this.$API.spu.reqAtrInfoList(id1, id2, id3)
      if (atrInfoListResult.code == 200) {
        this.atrInfoList = atrInfoListResult.data
        console.log(this.atrInfoList)
      }
    },
    //默认图片上传
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    //图片批量选择上传
    handleSelectionChange(params) {
      this.imageList = params
    },
    //cancel
    cancel() {
      this.$emit('changeScene', { scene: 0, flag: '' })
      Object.assign(this._data, this.$options.data())
    },
    //save
    async save() {
      const { imageList, spuSaleAttrList, atrInfoList } = this

      this.skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        }
      })

      this.skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce(
        (pre, item) => {
          if (item.attrIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
            pre.push({ saleAttrId, saleAttrValueId })
          }
          return pre
        },
        []
      )

      this.skuInfo.skuAttrValueList = atrInfoList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          let [attrId, valueId] = item.attrIdAndValueId.split(':')
          pre.push({ attrId, valueId })
        }
        return pre
      }, [])
      console.log(this.skuInfo)

      const res = await this.$API.spu.reqAddSku(this.skuInfo)
      if(res.code==200){
        this.$message({
          type: 'success',
          message: '添加SKU成功',
        })
        this.$emit('changeScene', { scene: 0, flag: '' })
        Object.assign(this._data, this.$options.data())
      }
      console.log(res);
    },
  },
}
</script>

<style>
</style>