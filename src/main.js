import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.filter('time', function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm')
})
Vue.prototype.$fixURL = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
