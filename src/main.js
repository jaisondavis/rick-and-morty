import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from '@/_plugins/vuetify'

import App from '@/App'
import { Home } from '@/Universe'
import { Charecter } from '@/Charecter'
import { PageNotFound } from '@/PageNotFound'

const routes = [
  { path: '', name: 'Home', component: Home },
  { path: '/charecter/:id', name: 'Charecter', component: Charecter },
  { path: '*', name: 'Page Not Found', component: PageNotFound }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(router)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
