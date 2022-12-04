import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  // 配置二级2路由
  children: [{
    path: '',
    component: () => import('@/views/attendances'),
    // 路由元信息
    meta: {
      title: '考勤', icon: 'skill'
    }
  }]
}
