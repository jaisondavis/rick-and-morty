import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from '@/_plugins/vuetify'

import App from '@/App'
import '@/_plugins/registerServiceWorker'

const routes = [
  {
    path: '', 
    name: 'Home', 
    component: () => import('@/Universe/_components/Universe.vue'),
    meta: {
      title: 'Rick and Morty'
    }
  },
  { 
    path: '/character/:id',
    name: 'Character', 
    component: () => import('@/Character/_components/Character.vue'),
    meta: {
      title: 'Character'
    }
  },
  { 
    path: '*',
    name: 'Page Not Found', 
    component: () => import('@/404/PageNotFound.vue'),
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
