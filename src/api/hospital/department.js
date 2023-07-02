import request from '@/utils/request'

//获取科室列表
// /dev1-api/
export const getDepartment = (page, limit) =>
  request({ url: `/api/department/get/${page}/${limit}`, method: 'get' })

//查询科室信息
export const searchDepartment = (page, limit, searchObj) =>
  request({
    url: `/api/department/get/${page}/${limit}`,
    method: 'get',
    data: searchObj,
  })

//编辑科室信息
export const editDepartment = (data, departmentNameId) =>
  request({
    url: `/api/department/edit/${departmentNameId}`,
    method: 'get',
    data,
  })

//增加科室信息
export const addDepartment = (data) =>
  request({ url: '/api/department/add', method: 'get', data })

//删除科室信息
export const deleteDepartment = (departmentNameId) =>
  request({
    url: '/api/department/delete',
    method: 'delete',
    data: departmentNameId,
  })
