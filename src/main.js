import Vue from 'vue'
import Home from '@/App/Home'
import Charecter from '@/App/Charecter'
import VueRouter from 'vue-router'
import vuetify from '@/_plugins/vuetify';

const routes = [
  { path: '/', component: Home },
  { path: '/charecter/:id', component: Home },
  { path: '*', component: Charecter }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(Home)
}).$mount('#app')
