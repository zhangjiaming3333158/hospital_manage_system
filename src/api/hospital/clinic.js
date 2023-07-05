import request from '@/utils/request'

//获取诊室列表
// /dev1-api/
export const getClinic = (page, limit) =>
  request({ url: `/hospital/clinic/${page}/${limit}`, method: 'get' })

//查询诊室信息
export const searchClinic = (page, limit, name) =>
  request({
    url: `/dev2-api/hospital/clinic`,
    method: 'get',
    params: {
      page,
      limit,
      name,
    },
  })

//编辑诊室信息
export const editClinic = (data) =>
  request({ url: `/dev2-api/hospital/clinic`, method: 'put', data })

//增加诊室信息
export const addClinic = (data) =>
  request({ url: '/dev2-api/hospital/clinic', method: 'post', data })

//删除诊室信息
export const deleteClinic = (id) =>
  request({
    url: '/dev2-api/hospital/clinic',
    method: 'delete',
    data: { id },
  })
