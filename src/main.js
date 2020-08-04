/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import event from '@/utils/event'
import create from '@/utils/create'
import router from '@/lessons/day2/router'
import store from '@/lessons/day2/store'

Vue.use(event)
Vue.use(create)
Vue.config.productionTip = false

const _vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

