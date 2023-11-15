export default [
  {
    path: '/user',
    name: '登录',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' }
    ],
  },
  { path: '/welcome', icon: 'smile', component: 'Welcome' },
  { path: '/', redirect: '/welcome' },
  {
    path: '/chat/list',
    name: '我的助手',
    icon: 'commentOutlined',
    component: './Chat/List/',
  },
  {
    path: '/chat/:id',
    name: '我的助手',
    menu: false,
    icon: 'commentOutlined',
    component: './Chat/',
  },
  {
    path: '/chart',
    name: '智能报表',
    icon: 'barChart',
    routes: [
      { path: '/chart/add_chart', name: '智能分析', icon: 'barChart', component: './Chart/AddChart' },
      { path: '/chart/my_chart', name: '我的图表', icon: 'pieChart', component: './Chart/MyChart' },
    ],
  },
  {
    path: '/userList',
    icon: 'crown',
    name: '用户管理',
    access: 'canAdmin',
    component: './User/UserList',
  },
  { path: '/user_center', icon: 'userOutlined', name: '个人中心', component: './User/UserCenter' },
  { path: '*', layout: false, component: './404' },
];

