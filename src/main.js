// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入全局样式表
import './style/styles.css'
import axios from 'axios'
import qs from 'qs'

import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'

//引入共同的js
import {
  getCurDate,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from './common/common'

Vue.use(element)
Vue.config.productionTip = false

//设置axios的基础URL，默认路径
axios.defaults.baseURL="http://localhost:8081/test_train";
//挂载到
Vue.prototype.$axios=axios;
Vue.prototype.$qs = qs;
Vue.prototype.$getCurDate = getCurDate;
Vue.prototype.$setSessionStorage= setSessionStorage;
Vue.prototype.$getSessionStorage= getSessionStorage;
Vue.prototype.$removeSessionStorage= removeSessionStorage;
Vue.prototype.$setLocalStorage= setLocalStorage;
Vue.prototype.$getLocalStorage= getLocalStorage;
Vue.prototype.$removeLocalStorage= removeLocalStorage;


// //路由守卫
// //路由守卫用来控制访问权限
// /* 具体是这样的，如果用户没有登录，但是直接通过URL访问特定的页面，需要重新导航到登录页面 */
// //挂载路由守卫
// router.beforeEach((to, from, next) => {
//   //to表示将要访问的路径
//   //from 代表从哪个路径跳转而来
//   //next 是一个函数，表示放行，，如果next（'/login'）表示强制跳转

//   //如果你要访问的是登录页，那么直接放行
//   if(to.path === '/login') return next();

//   //如果在浏览器中没拿到token，跳转到登录页
//   const tokenStr =window.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login')
//   next();
// })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
