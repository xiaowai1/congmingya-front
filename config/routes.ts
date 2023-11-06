export default [
  { path: '/user', name: '登录', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/',
    name: '智能报表',
    icon: 'barChart',
    routes: [
      { path: '/add_chart', name: '智能分析', icon: 'barChart', component: './Chart/AddChart' },
      { path: '/my_chart', name: '我的图表', icon: 'pieChart', component: './Chart/MyChart' },
    ],
  },
  {
    path: '/user/userList',
    icon: 'crown',
    name: '用户管理',
    access: 'canAdmin',
    component: './User/UserList'
  },
  // { icon: 'table', name: '查询表格', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
