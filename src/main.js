/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'
import event from '@/utils/event'
import create from '@/utils/create'
Vue.use(VueRouter)
Vue.use(event)
Vue.use(create)
Vue.config.productionTip = false

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
  next()
  // to and from are both route objects. must call `next`.
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
