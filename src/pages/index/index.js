import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
// 引入静态资源
require('./../../assets/css/base.css')

Vue.config.productionTip = false
Vue.use(VueResource);
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})