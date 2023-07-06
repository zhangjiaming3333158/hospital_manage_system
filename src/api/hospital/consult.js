import request from '@/utils/request'

//获取出诊列表
// /dev1-api/
export const getConsult = (page, limit) =>
  request({ url: `/dev2-api/hospital/consult/${page}/${limit}`, method: 'get' })

//查询医生UUID出诊信息
export const searchConsultUUID = (page, limit, uuid) =>
  request({
    url: `/dev2-api/hospital/consult`,
    method: 'get',
    params: {
      page,
      limit,
      uuid,
    },
  })
//查询患者出诊信息
export const searchConsultPatient = (page, limit, uuid, patientName) =>
  request({
    url: `/dev2-api/hospital/consult`,
    method: 'get',
    params: {
      page,
      limit,
      uuid,
      patientName,
    },
  })
//查询all出诊信息
export const searchConsultAllDoctor = (page, limit) =>
  request({
    url: `/dev2-api/hospital/consult`,
    method: 'get',
    params: {
      page,
      limit,
    },
  })
//查询医生出诊信息
export const searchConsultDoctor = (page, limit, doctorName) =>
  request({
    url: `/dev2-api/hospital/consult`,
    method: 'get',
    params: {
      page,
      limit,
      doctorName,
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
