export default [
  { path: '/user', name: '登录', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '智能图表',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', name: '智能分析', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '我的图表', component: './Admin' },
    ],
  },
  { icon: 'table', name: '查询表格', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
