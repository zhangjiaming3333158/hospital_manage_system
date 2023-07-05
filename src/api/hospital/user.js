import request from '@/utils/request'

export function AdminLogin(phone, password) {
  return request({
    url: '/dev2-api/hospital/login/admin',
    method: 'get',
    params: {
      phone,
      password,
    },
  })
}

export function doctorLogin(phone, password) {
  return request({
    url: '/dev2-api/hospital/login/doctor',
    method: 'get',
    params: {
      phone,
      password,
    },
  })
}

export function doctorSignup(phone, password) {
  return request({
    url: '/dev2-api/hospital/login/doctor',
    method: 'post',
    params: {
      phone,
      password,
    },
  })
}

export function logout() {
  return request({
    url: '/dev-api/admin/acl/index/logout',
    method: 'post',
  })
}
