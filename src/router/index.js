import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Welcome from '../components/Welcome.vue'
import TrainInfoList from '../views/TrainInfoList.vue'
import UserInfo from '../views/UserInfo.vue'
import TrainParkingInfo from '../views/TrainParkingInfo'
import TrainSearch from '../views/TrainSearch'
import TrainTransfer from '../views/TrainTransfer'
import BuyTicket from '../views/BuyTicket'
import AllOrder from '../views/AllOrder'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      redirect:'/welcome',
      children:[{path:'/welcome' , component: Welcome},
      {path:'/trainInfoList' , component: TrainInfoList},
      {path:'/userInfo' , component: UserInfo},
      {path:'/trainParkingInfo' , component:TrainParkingInfo},
      {path:'/trainSearch' , component:TrainSearch},
      {path:'/trainTransfer' , component:TrainTransfer},
      {path:'/buyTicket' , component:BuyTicket},
      {path:'/allOrder' , component:AllOrder}
    ]
    }
  ]
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
