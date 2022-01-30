import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './plugins/fontawesome'
import {store} from './store'
import Toasted from 'vue-toasted';
 
Vue.use(Toasted, {
  duration: 3000
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
