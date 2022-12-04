import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  // 配置二级2路由
  children: [{
    path: '',
    component: () => import('@/views/setting'),
    // 路由元信息
    meta: {
      title: '公司设置', icon: 'setting'
    }
  }]
}
