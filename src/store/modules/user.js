import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
const state = {
  token: getToken() // 设置token为共享状态 初始化vuex时候，就先从缓存中读取
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex数据置空
    removeToken() // 同步清空缓存
  }
}
const actions = {
  // 调用登录的接口， 请求数据，数据请求成功之后，调用mutation， 存储到state
  async login(context, data) {
    const res = await login(data)
    //  data : {服务端真实响应的数据} => res.data
    if (res.data.success) {
      context.commit('setToken', res.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
