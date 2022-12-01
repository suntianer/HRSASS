import request from '@/utils/request'

// 登录接口
/**
 *
 * @param {object} data 登录需要的数据 data中应该包含mobile 和password
 * @returns promise
 */
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {}

export function logout() {}
