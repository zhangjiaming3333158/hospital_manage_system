import request from '@/utils/request'

//获取出诊列表
// /dev1-api/
export const getConsult = (page, limit) =>
  request({ url: `/hospital/consult/${page}/${limit}`, method: 'get' })

//查询出诊信息
export const searchConsult = (page, limit, searchObj) =>
  request({
    url: `/hospital/consult`,
    method: 'get',
    params: {
      page,
      limit,
      searchObj,
    },
  })

//编辑出诊信息
export const editConsult = (data) =>
  request({ url: '/hospital/consult', method: 'put', data })

//增加出诊信息
export const addConsult = (data) =>
  request({ url: '/hospital/consult', method: 'post', data })

//删除出诊信息
export const deleteConsult = (id) =>
  request({
    url: '/hospital/consult',
    method: 'delete',
    data: { id },
  })
