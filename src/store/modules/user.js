import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { getUserInfo, login, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置token为共享状态 初始化vuex时候，就先从缓存中读取
  userInfo: {}
  // 使用userInfo来储存用户登录信息
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
  },
  SET_USER_INFO(state, result) {
    // result 需要是一个对象， 这里是响应式
    state.userInfo = result
    // state.userInfo = { ...result } 这里也是响应式，属于浅拷贝
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 调用登录的接口， 请求数据，数据请求成功之后，调用mutation， 存储到state
  async login(context, data) {
    const res = await login(data)
    //  data : {服务端真实响应的数据} => res.data
    // if (res.data.success) {
    //   context.commit('setToken', res.data.data)
    // }
    // 响应拦截设置后， res就是data响应数据，是一个token， 不需要做判断了
    context.commit('setToken', res)
    setTimeStamp() // 将当前的最新时间写入缓存
  },
  // 获取用户资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    // console.log(result)
    const baseInfo = await getUserDetailById(result.userId)
    console.log(baseInfo)
    const baseResult = { ...result, ...baseInfo }
    context.commit('SET_USER_INFO', baseResult) // 提交到mutationsmutations
    return baseResult // 这里为什么要return呢， 这里是给我们后期做权限的时候， 留下的伏笔
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户信息
    context.commit('REMOVE_USER_INFO')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
