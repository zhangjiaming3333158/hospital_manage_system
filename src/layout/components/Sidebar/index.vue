<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <!-- 遍历菜单栏的时候，开始遍历的都是常量路由 -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import router from '@/router'
//路由模块当中重置路由的方法
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    //应该替换为仓库中已经计算好的需要展示的全部路由
    // routes() {
    //     //sliderbar：需要遍历的应该是仓库计算完毕的全部路由
    //     // return this.$store.state.user.resultAllRputes;

    //     //最终计算出的异步路由
    //     // SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    //     //   //vuex保存当前用户的异步路由，注意，一个用户需要展示完成路由：常量、异步、任意路由
    //     //   state.resultAsyncRoutes = asyncRoutes
    //     //   //计算出当前用户需要展示所有路由
    //     //   state.resultAllRputes = constantRoutes.concat(
    //     //     state.resultAsyncRoutes,
    //     //     anyRoutes
    //     //   )
    //     //   //给路由器添加新的路由
    //     //   router.addRoutes(state.resultAllRputes)
    //     // },
    //     const uuid = localStorage.getItem('UUID')
    //     if (uuid == 0) {
    //       const test1 = asyncRoutes[0]
    //       delete test1.children[0]
    //       const test2 = asyncRoutes[1]
    //       delete test2.children[1]
    //       const test3 = asyncRoutes[2]
    //       delete test3.children[1]
    //       const test4 = asyncRoutes[3]
    //       delete test4.children[1]

    //       const resultRoutes = constantRoutes.concat(
    //         test1,
    //         test2,
    //         test3,
    //         test4,
    //         anyRoutes
    //       )

    //       console.log('asyncRoutes', asyncRoutes)
    //       //给路由器添加新的路由
    //       router.addRoutes(resultRoutes)
    //       // 动态添加异步路由
    //       // 模拟异步加载路由配置

    //       // console.log( 'test',this.$store.state.user.resultAllRputes);
    //       return resultRoutes
    //     } else {
    //       const test1 = asyncRoutes[0]
    //       delete test1.children[1]
    //       const test2 = asyncRoutes[1]
    //       delete test2.children[0]
    //       const test3 = asyncRoutes[2]
    //       delete test3.children[0]
    //       const test4 = asyncRoutes[3]
    //       delete test4.children[0]

    //       const resultRoutes = constantRoutes.concat(
    //         test1,
    //         test2,
    //         test3,
    //         test4,
    //         anyRoutes
    //       )

    //       console.log('asyncRoutes', test1)
    //       console.log('asyncRoutes', asyncRoutes)
    //       console.log('resultRoutes', resultRoutes)
    //       //给路由器添加新的路由
    //       router.addRoutes(resultRoutes)
    //       return resultRoutes
    //     }
    // },
    routes() {
      const uuid = localStorage.getItem('UUID')
      if (uuid == 0) {
        const test1 = asyncRoutes[0]
        delete test1.children[0]
        const test2 = asyncRoutes[1]
        delete test2.children[1]
        const test3 = asyncRoutes[2]
        delete test3.children[1]
        const test4 = asyncRoutes[3]
        delete test4.children[1]

        const resultRoutes = constantRoutes.concat(
          test1,
          test2,
          test3,
          test4,
          anyRoutes
        )

        console.log('asyncRoutes', asyncRoutes)
        console.log('resultRoutes', resultRoutes)

        // 给路由器添加新的路由
        router.onReady(() => {
          router.addRoutes(resultRoutes)
          // 执行页面刷新
          this.$forceUpdate()
        })

        return resultRoutes
      } else {
        const test1 = asyncRoutes[0]
        delete test1.children[1]
        const test2 = asyncRoutes[1]
        delete test2.children[0]
        const test3 = asyncRoutes[2]
        delete test3.children[0]
        const test4 = asyncRoutes[3]
        delete test4.children[0]

        const resultRoutes = constantRoutes.concat(
          test1,
          test2,
          test3,
          test4,
          anyRoutes
        )

        console.log('asyncRoutes', test1)
        console.log('asyncRoutes', asyncRoutes)
        console.log('resultRoutes', resultRoutes)

        // 给路由器添加新的路由
        router.onReady(() => {
          router.addRoutes(resultRoutes)
          // 执行页面刷新
          this.$forceUpdate()
        })

        return resultRoutes
      }
    },

    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
}
</script>
