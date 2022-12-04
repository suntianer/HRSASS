import Layout from '@/layout'
export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  // 配置二级2路由
  children: [{
    path: '',
    component: () => import('@/views/approvals'),
    // 路由元信息
    meta: {
      title: '审批', icon: 'tree-table'
    }
  }]
}
