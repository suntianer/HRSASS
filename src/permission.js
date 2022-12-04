// 权限拦截在路由跳转 导航守卫
import router from '@/router'
// 引入store实例，和组件中的this.$store 是一回事
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 不需要导出 因为只需要让代码执行即可

// 前置守卫
// next 是前置守卫必须必须必须执行的钩子 next必须执行， 如果不执行， 页面就死了
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址

// 定义白名单
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      next('/')
    } else {
      // 只有放过去的时候才获取用户资料
      // 是每次都获取吗
      // 如果当前vuex中有用户资料的id 表示 已经有资料了, 不需要获取了,如果没有id才需要获取
      if (!store.getters.userId) {
        // 如果没有id, 表示当前用户资料没有获取过
        await store.dispatch('user/getUserInfo')
        // 如果说后续,需要根据用户获取数据的化,这里必须改成同步
      }
      next()
    }
  } else {
    // 无token
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})

// 自己练习
// import router from '@/router'
// import store from '@/store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// const whiteList = ['/login', '/404']
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next('/')
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.indexOf(to.path) > -1) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
//   NProgress.done()
// })
// router.afterEach(() => {
//   NProgress.done()
// })

