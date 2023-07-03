import request from '@/utils/request'

//获取医生列表
// /dev1-api/
export const getDoctor = (page, limit) =>
  request({ url: `/hospital/doctor/${page}/${limit}`, method: 'get' })

//查询医生信息
export const searchDoctor = (page, limit, searchObj) =>
  request({
    url: `/hospital/doctor/${page}/${limit}`,
    method: 'get',
    data: searchObj,
  })

//编辑医生信息
export const editDoctor = (data) =>
  request({ url: '/hospital/doctor', method: 'put', data })

//删除医生信息
export const deleteDoctor = (dentificationNumbe) =>
  request({
    url: '/hospital/doctor',
    method: 'delete',
    data: dentificationNumbe,
  })
