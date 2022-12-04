import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
const TimeOut = 3600 // 定义超时时间

const service = axios.create({
  // 当执行npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // /dev-api  /prod-api
  timeout: 5000 // 设置超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 如果token存在 注入token
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout')
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置， 否则无法继续请求数据
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  // 请求出错直接把promise状态变为失败
  return Promise.reject(error)
})

/**
 *
 */
// response interceptor
service.interceptors.response.use((response) => {
  // response表示的是服务端给客户端的响应数据
  const { success, message, data } = response.data
  if (success) {
    // 请求成功 ，直接返回数据
    return data
  } else {
    // 请求失败， 如果请求失败，应该做两件事：提示 改promise状态
    // Message 在js中使用
    // this.$message 在组件中使用
    Message.error(message)

    // 业务上的请求失败，没有错误对象，需要new一个
    return Promise.reject(new Error(message))
  }
},
(error) => {
  // 这个函数执行，意味着真正的请求失败：错误消息提示， promise状态
  Message.error(error.message)
  return Promise.reject(error)
})

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
