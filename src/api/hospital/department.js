import request from '@/utils/request'

//获取科室列表
// /dev1-api/
export const getDepartment = (page, limit) =>
  request({ url: `/hospital/department/${page}/${limit}`, method: 'get' })

//查询科室信息
export const searchDepartment = (page, limit, searchObj) =>
  request({
    url: `/hospital/department/${page}/${limit}`,
    method: 'get',
    data: searchObj,
  })

//编辑科室信息
export const editDepartment = (data) =>
  request({
    url: `/hospital/department`,
    method: 'put',
    data,
  })

//增加科室信息
export const addDepartment = (data) =>
  request({ url: '/hospital/department', method: 'post', data })

//删除科室信息
export const deleteDepartment = (departmentNameId) =>
  request({
    url: '/hospital/department',
    method: 'delete',
    data: departmentNameId,
  })
