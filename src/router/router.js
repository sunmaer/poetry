import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin,
      children: [
        { path: '', component: Index },
        { path: 'index', component: Index },
        { path: 'question', component: Question },
        { path: 'student', component: Student },
        { path: 'administor', component: Administor },
        { path: 'self', component: Self }
      ]
    }
  ]
})
