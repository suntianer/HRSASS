import Layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  // 配置二级2路由
  children: [{
    path: '',
    component: () => import('@/views/departments'),
    // 路由元信息
    meta: {
      title: '组织架构', icon: 'tree'
    }
  }]
}
