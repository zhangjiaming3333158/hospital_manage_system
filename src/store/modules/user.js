import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, anyRoutes, asyncRoutes, constantRoutes} from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    roles: [],
    buttons: [],
    resultRoutes:[],
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_RESULTROUTES: (state, asyncRoutes) => {
    //异步路由
    state.resultRoutes = asyncRoutes
    //合并路由
    state.resultAllRoutes = constantRoutes.concat(asyncRoutes).concat(anyRoutes)
    //动态添加路由
    router.addRoutes(state.resultAllRoutes) 
  }
}

//定义函数
// function computedAsyncRoutes(asyncRoutes, routes) {
//   let resultRoutes = []
//   asyncRoutes.forEach((item) => {
//     routes.forEach((route) => {
//       if (item.name == route.name) {
//         if (route.children && route.children.length > 0) {
//           item.children = computedAsyncRoutes(item.children, route.children)
//         }
//         resultRoutes.push(item)
//       }
//     })
//   })
//   return resultRoutes
// }

// 定义函数
function computedAsyncRoutes(asyncRoutes, routes) {
  //过滤异步路由
  asyncRoutes.filter((item) => {
    //判断是否包含在routes中
    if (routes.indexOf(item.name) != -1) {
      //判断是否有子路由
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let res = await login({ username: username.trim(), password: password })
    if (res.code == 20000) {
      commit('SET_TOKEN', res.data.token)
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    let res = await getInfo(state.token)
    if (res.code == 20000) {
      const { name, avatar } = res.data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_RESULTROUTES', computedAsyncRoutes(asyncRoutes, res.data.routes))
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // user logout
  async logout({ commit, state }) {
    let res = await logout(state.token)
    if (res.code == 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
