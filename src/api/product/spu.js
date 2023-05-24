import request from '@/utils/request'

// 获取spu列表
// export const reqSpuList = (page,limit,id3) => {
//   return request({
//     method: 'GET',
//     url: `/dev1-api/admin/product/${page}/${limit}`,
//     params:{id3}
//   })
// }

export const reqSpuList = (page, limit, category3Id) =>
  request({
    method: 'GET',
    url: `/dev1-api/admin/product/${page}/${limit}`,
    params: { category3Id },
  })

//获取SPU信息
///admin/product/getSpuById/{spuId}   get
export const reqSpu = (spuId) =>
  request({ url: `/dev1-api/admin/product/getSpuById/${spuId}`, method: 'get' })

//获取品牌的信息
///admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () =>
  request({
    url: `/dev1-api/admin/product/baseTrademark/getTrademarkList`,
    method: 'get',
  })

//获取SPU图标的接口
///admin/product/spuImageList/{spuId}  get
export const reqSpuImageList = (spuId) =>
  request({
    url: `/dev1-api/admin/product/spuImageList/${spuId}`,
    method: 'get',
  })

//获取平台全部销售属性----整个平台销售属性一共三个
//GET /admin/product/baseSaleAttrList

export const reqBaseSaleAttrList = () =>
  request({ url: '/dev1-api/admin/product/baseSaleAttrList', method: 'get' })

///admin/product/updateSpuInfo
export const reqAddOrUpdateAttr = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: '/dev1-api/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo,
    })
  } else {
    return request({
      url: '/dev1-api/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo,
    })
  }
}

//删除SPU
// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => {
  return request({
    url: `/dev1-api/admin/product/deleteSpu/${spuId}`,
    method: 'delete',
  })
}

// /admin/product/spuImageList/{spuId}
export const reqSpuImageLIst = (spuId) =>
  request({
    url: `/dev1-api/admin/product/spuImageList/${spuId}`,
    method: 'get',
  })

// /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) =>
  request({
    url: `/dev1-api/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get',
  })

// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAtrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/dev1-api/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
  })

//添加SKU
///admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo) =>
  request({
    url: '/dev1-api/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo,
  })

//获取SKU分页列表
export const reqSkuList = (spuId) =>
  request({ url: `/dev1-api/admin/product/findBySpuId/${spuId}`, method: 'get' })
