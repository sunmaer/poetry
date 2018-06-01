// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router/router'
import axios from 'axios'
import 'babel-polyfill'
import promise from 'es6-promise'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false
window.API_HOST = process.env.API_HOST
promise.polyfill()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

const store = new Vuex.Store({
  state: {
    adminName: sessionStorage.getItem('adminName') || ''
  },
  mutations: {
    getAdmin (state) {
      if (window.sessionStorage.getItem('adminName')) {
        state.adminName = window.sessionStorage.getItem('adminName')
      } else {
        state.adminName = ''
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  store.commit('getAdmin')
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.adminName != '') {  // 通过vuex state获取当前的admin，判断是否为空
      next()
    }
    else {
      return next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next()
  }
})
