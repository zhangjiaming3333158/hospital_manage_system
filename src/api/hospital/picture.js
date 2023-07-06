import request from '@/utils/request'

//上传图片
export const uploadPicture = (uuid, picture) =>
  request({
    url: '/dev2-api/hospital/picture',
    method: 'post',
    params: { uuid },
    data: picture,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

//获取图片
export const getPicture = (uuid) =>
  request({
    url: '/dev2-api/hospital/picture',
    method: 'get',
    // responseType: 'blob',
    params: { uuid },
  })
