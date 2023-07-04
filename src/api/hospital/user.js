import request from '@/utils/request'

export function AdminLogin(phone, password) {
  return request({
    url: '/hospital/login/admin',
    method: 'get',
    params:{
      phone,
      password
    }
  })
}

export function doctorLogin(phone, password) {
  return request({
    url: '/hospital/login/doctor',
    method: 'get',
    params:{
      phone,
      password
    }
  })
}

export function doctorSignup(data) {
  return request({
    url: '/hospital/login/doctor',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/dev-api/admin/acl/index/logout',
    method: 'post'
  })
}
