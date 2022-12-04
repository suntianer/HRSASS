import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  // 配置二级2路由
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    // 路由元信息
    meta: {
      title: '员工管理', icon: 'people'
    }
  }]
}
