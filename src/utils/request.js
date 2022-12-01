import axios from 'axios'

const service = axios.create({
  // 当执行npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // /dev-api  /prod-api
  timeout: 5000 // 设置超时时间
})

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use()

export default service
