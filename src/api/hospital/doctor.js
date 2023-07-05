import request from '@/utils/request'

//获取医生列表
// /dev1-api/
export const getDoctor = (page, limit) =>
  request({ url: '/dev2-api/hospital/doctor', method: 'get' })

//查询医生信息
export const searchDoctorUUID = (page, limit, uuid) =>
  request({
    url: '/dev2-api/hospital/doctor',
    method: 'get',
    params: {
      page,
      limit,
      uuid,
    },
  })

//查询医生信息
export const searchDoctorNAME = (page, limit, name) =>
  request({
    url: '/dev2-api/hospital/doctor',
    method: 'get',
    params: {
      page,
      limit,
      name,
    },
  })

//查询医生信息
export const searchDoctorAll = (page, limit) =>
  request({
    url: '/dev2-api/hospital/doctor',
    method: 'get',
    params: {
      page,
      limit,
    },
  })

//编辑医生信息
export const addDoctor = (data) =>
  request({ url: '/dev2-api/hospital/doctor', method: 'post', data })

//编辑医生信息
export const editDoctor = (data) =>
  request({ url: '/dev2-api/hospital/doctor', method: 'put', data })

//删除医生信息
export const deleteDoctor = (id) =>
  request({
    url: '/dev2-api/hospital/doctor',
    method: 'delete',
    data: { id },
  })
