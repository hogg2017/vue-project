import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import UserManagement from '../components/user/UserManagement.vue'
import SystemSetting from '../components/sys/SystemSetting.vue'
import Shop from '../components/shop/shop.vue'
import Plan from '../components/plan/plan.vue'

Vue.use(VueRouter)

//拿到路由对象,挂在导航守卫
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    redirect: '/welcome',
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/user-management',
        name: 'UserManagement',
        component: UserManagement
      },
      {
        path: '/sys-setting',
        name: 'SysSetting',
        component: SystemSetting
      },
      {
        path: '/shop',
        name: 'shop',
        component: Shop
      },
      {
        path: '/plan',
        name: 'plan',
        component: Plan
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
//挂在路由导航守卫
//beforeEach 接受一个回调函数
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径跳转而来
  //next 函数,放行
  //next()/ next('./path')强制跳转的路径
  if (to.path === '/login') {
    return next()
  }
  //获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) {
    return next('./login')
  }
  next()
})
export default router
