import request from '@/utils/request'

//sku列表的接口
export const reqSkuList = (page, limit) =>
  request({ url: `/dev1-api/admin/product/list/${page}/${limit}`, method: 'get' })

//下架
// /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({ url: `/dev1-api/admin/product/cancelSale/${skuId}`, method: 'get' })

//上架
// /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({ url: `/dev1-api/admin/product/onSale/${skuId}`, method: 'get' })
