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
  { path: '/welcome', name: "首页", icon: 'smile', component: 'Welcome' },
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
    path: '/picture',
    name: 'AI生图',
    icon: 'cameraOutlined',
    routes: [
      { path: '/picture/add_picture', name: 'AI生图', icon: 'cameraOutlined', component: './Picture/AddPicture' },
      { path: '/picture/my_picture', name: '我的图片', icon: 'pieChart', component: './Picture/MyPicture' },
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

