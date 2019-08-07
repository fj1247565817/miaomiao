import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './stores/index'
import Scroller from './components/Scroller'
import Loading from './components/Loading'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// axios.defaults.baseURL='http://39.97.33.178'
Vue.prototype.axios = axios
// 过滤器
Vue.filter('setWH',(url,arg) => {
	return url.replace(/w\.h/,arg)
})
Vue.component('Scroller' , Scroller)
Vue.component('Loading',Loading)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
