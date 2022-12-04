import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App' // 入口视图组件
import store from './store'
import router from './router'

import * as directives from '@/directives' // 注册自定义指令
// console.log(Object.keys(directives))
// 遍历注册 批量注册
Object.keys(directives).forEach(item => {
  // console.log(item)
  // console.log(directives[item])
  Vue.directive(item, directives[item])
})

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
