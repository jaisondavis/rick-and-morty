import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from '@/_plugins/vuetify'

import App from '@/App'
import { Home } from '@/Universe'
import { Character } from '@/Character'
import { PageNotFound } from '@/404'
import '@/_plugins/registerServiceWorker'

const routes = [
  {
    path: '', 
    name: 'Home', 
    component: Home,
    meta: {
      title: 'Rick and Morty'
    }
  },
  { 
    path: '/character/:id',
    name: 'Character', 
    component: Character,
    meta: {
      title: 'Character'
    }
  },
  { 
    path: '*',
    name: 'Page Not Found', 
    component: PageNotFound,
    meta: {
      title: 'Whoops!'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(router)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
