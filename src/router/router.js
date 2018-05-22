import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Test from '@/views/home/test'
import Login from '@/views/login/login'
import Admin from '@/views/admin/admin'
import Index from '@/views/index/index'
import Question from '@/views/question/question'
import Student from '@/views/student/student'
import Administor from '@/views/administor/administor'
import Self from '@/views/administor/self'

Vue.use(Router)

export default new Router({
  routes: [
    // 前台页面
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    // 后台页面
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/',
      component: Admin,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        { path: '', meta: { requireAuth: true }, component: Index },
        { path: 'index', meta: { requireAuth: true }, component: Index },
        { path: 'question', meta: { requireAuth: true }, component: Question },
        { path: 'student', meta: { requireAuth: true }, component: Student },
        { path: 'administor', meta: { requireAuth: true }, component: Administor },
        { path: 'self', meta: { requireAuth: true }, component: Self }
      ]
    }
  ]
})
