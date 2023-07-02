import request from '@/utils/request'

//获取出诊列表
// /dev1-api/
export const getConsult = (page, limit) =>
  request({ url: `/api/consult/get/${page}/${limit}`, method: 'get' })

//查询出诊信息
export const searchConsult = (page, limit, searchObj) =>
  request({
    url: `/api/consult/get/${page}/${limit}`,
    method: 'get',
    data: searchObj,
  })

//编辑出诊信息
export const editConsult = (data) =>
  request({ url: '/api/consult/edit', method: 'get', data })

//增加出诊信息
export const addConsult = (data) =>
  request({ url: '/api/consult/add', method: 'get', data })

//删除出诊信息
export const deleteConsult = (consultId) =>
  request({
    url: '/api/consult/delete',
    method: 'delete',
    data: consultId,
  })
