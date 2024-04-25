export default [
  { name:'登录',path: '/user', layout: false, routes: [
    { path: '/user/login', component: './User/Login' },
    { path: '/user/register', component: './User/Register' }
    ]},
  { path: '/', redirect: '/add_chart' },
  { name:'智能分析',path: '/add_chart', icon: 'barChart', component: './AddChart' },
  { name:'智能分析(异步)',path: '/add_chart_async', icon: 'LineChartOutlined', component: './AddChartByAsync' },
  { name:'我的图表',path: '/my_chart', icon: 'PieChartOutlined', component: './MyChart' },
  {
    name:'管理员',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
