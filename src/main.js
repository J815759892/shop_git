import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/CSS/global.css'
import axios from 'axios'
Vue.config.productionTip = false
axios.default.baseURL = '/api/private/v1/'
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
