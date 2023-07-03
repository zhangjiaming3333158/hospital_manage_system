import request from '@/utils/request'

//获取诊室列表
// /dev1-api/
export const getClinic = (page, limit) =>
  request({ url: `/hospital/clinic/${page}/${limit}`, method: 'get' })

//查询诊室信息
export const searchClinic = (page, limit, searchObj) =>
  request({
    url: `/hospital/clinic/${page}/${limit}`,
    method: 'get',
    data: searchObj,
  })

//编辑诊室信息
export const editClinic = (data) =>
  request({ url: `/hospital/clinic`, method: 'put', data })

//增加诊室信息
export const addClinic = (data) =>
  request({ url: '/hospital/clinic', method: 'post', data })

//删除诊室信息
export const deleteClinic = (clinicId) =>
  request({
    url: '/hospital/clinic',
    method: 'delete',
    data: clinicId,
  })
