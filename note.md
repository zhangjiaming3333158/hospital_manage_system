5.6 spu reqSpuList = (page, limit, category3Id) 中  category3Id不能写成id3
42

5.7 45

5.9 <template slot-scope="{row}">y  <template slot-scope="row">n

5.15 48

5.16 51
```
  //清理数据
  //Object.assign:es6中新增的方法可以合并对象
  //组件实例this._data,可以操作data当中响应式数据
  //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
  Object.assign(this._data, this.$options.data())
```
5.17 53

5.23 57)获取添加SKU的数据
http://localhost:9529/dev-api/admin/product/spuImageList/5704
http://localhost:9529/dev-api/admin/product/spuSaleAttrList/5704
http://localhost:9529/dev-api/admin/product/attrInfoList/1/1/1

5.24 62

