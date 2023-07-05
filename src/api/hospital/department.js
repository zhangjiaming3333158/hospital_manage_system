import request from '@/utils/request'

//获取科室列表
// /dev1-api/
export const getDepartment = (page, limit) =>
  request({ url: `/dev2-api/hospital/department/${page}/${limit}`, method: 'get' })

//查询科室信息
export const searchDepartment = (page, limit, name) =>
  request({
    url: `/dev2-api/hospital/department`,
    method: 'get',
    params: {
      page,
      limit,
      name,
    },
  })

//编辑科室信息
export const editDepartment = (data) =>
  request({
    url: `/dev2-api/hospital/department`,
    method: 'put',
    data,
  })

//增加科室信息
export const addDepartment = (data) =>
  request({ url: '/dev2-api/hospital/department', method: 'post', data })

//删除科室信息
export const deleteDepartment = (id) =>
  request({
    url: '/dev2-api/hospital/department',
    method: 'delete',
    data: { id },
  })
