import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' }
  ]
})

export default router
