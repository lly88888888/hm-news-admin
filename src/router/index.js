import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import postList from '../pages/postList.vue'
import postPublish from '../pages/postPublish.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
      children: [
        { path: 'postList', component: postList, name: 'postList' },
        { path: 'postPublish', component: postPublish, name: 'postPublish' }
      ]
    },
    { path: '/login', component: Login, name: 'login' }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    router.push('login')
  }
})

// 防止报错NavigationDuplicated 重复地址请求
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
