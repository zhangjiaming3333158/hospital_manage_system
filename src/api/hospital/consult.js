import request from '@/utils/request'

//获取出诊列表
// /dev1-api/
export const getConsult = (page, limit) =>
  request({ url: `/dev2-api/hospital/consult/${page}/${limit}`, method: 'get' })

//查询出诊信息
export const searchConsult = (page, limit, name) =>
  request({
    url: `/dev2-api/hospital/consult`,
    method: 'get',
    params: {
      page,
      limit,
      name,
    },
  })

//编辑出诊信息
export const editConsult = (data) =>
  request({ url: '/dev2-api/hospital/consult', method: 'put', data })

//增加出诊信息
export const addConsult = (data) =>
  request({ url: '/dev2-api/hospital/consult', method: 'post', data })

//删除出诊信息
export const deleteConsult = (id) =>
  request({
    url: '/dev2-api/hospital/consult',
    method: 'delete',
    data: { id },
  })
