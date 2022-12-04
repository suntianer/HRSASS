import Layout from '@/layout'
export default {
  path: '/social',
  name: 'social',
  component: Layout,
  // 配置二级2路由
  children: [{
    path: '',
    component: () => import('@/views/social'),
    // 路由元信息
    meta: {
      title: '社保', icon: 'table'
    }
  }]
}
