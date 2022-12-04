import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  // 配置二级2路由
  children: [{
    path: '',
    component: () => import('@/views/salarys'),
    // 路由元信息
    meta: {
      title: '工资', icon: 'money'
    }
  }]
}
