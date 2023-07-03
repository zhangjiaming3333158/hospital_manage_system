import request from '@/utils/request'

export function AdminLogin(data) {
  return request({
    url: '/hospital/login/admin',
    method: 'get',
    data
  })
}

export function doctorLogin(data) {
  return request({
    url: '/hospital/login/doctor',
    method: 'get',
    data
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
