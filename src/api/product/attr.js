import request from '@/utils/request'

//一级分类列表
///admin/product/getCategory1
export const reqCategoryList1 = () => request({url:'/dev1-api/admin/product/getCategory1',method:'get'})

//二级分类列表
////admin/product/getCategory2/{category1Id}
export const reqCategoryList2 = (category1Id) => request({url:`/dev1-api/admin/product/getCategory2/${category1Id}`,method:'get'})

//三级分类列表
////admin/product/getCategory3/{category2Id}
export const reqCategoryList3 = (category2Id) => request({url:`/dev1-api/admin/product/getCategory3/${category2Id}`,method:'get'})

//商品属性列表
//admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id,category2Id,category3Id) => request({url:`/dev1-api/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//添加商品属性
//admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => request({url:'/dev1-api/admin/product/saveAttrInfo',method:'post',data})

