import request from '@/utils/request'

//获取诊室列表
// /dev1-api/
export const getClinic = (page, limit) =>
  request({ url: `/api/clinic/get/${page}/${limit}`, method: 'get' })

//查询诊室信息
export const searchClinic = (page, limit, searchObj) =>
  request({
    url: `/api/clinic/get/${page}/${limit}`,
    method: 'get',
    data: searchObj,
  })

//编辑诊室信息
export const editClinic = (data,clinicId) =>
  request({ url: `/api/clinic/edit/${clinicId}`, method: 'get', data })

//增加诊室信息
export const addClinic = (data) =>
  request({ url: '/api/clinic/add', method: 'get', data })

//删除诊室信息
export const deleteClinic = (clinicId) =>
  request({
    url: '/api/clinic/delete',
    method: 'delete',
    data: clinicId,
  })
