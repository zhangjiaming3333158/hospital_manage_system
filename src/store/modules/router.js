//路由模块当中重置路由的方法
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router'

const state = {
  resultRoutes: [],
}

const mutations = {
  TOGGLE_SIDEBAR: (state, router) => {
    state.resultRoutes = router
  },
}

const actions = {
  computeRoutes({ commit }) {
    const resultRoutes = constantRoutes.concat(asyncRoutes, anyRoutes)
    console.log('asyncRoutes', asyncRoutes)
    //给路由器添加新的路由
    router.addRoutes(resultRoutes)
    commit('TOGGLE_SIDEBAR', resultRoutes)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
