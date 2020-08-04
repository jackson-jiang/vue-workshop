import Vue from 'vue'
import Router from '@/lessons/day2/krouter'
import routes from './routes'

Vue.use(Router)

const router = new Router({ routes })
// 权限验证
/* router.beforeEach((to, from, next) => {
  next()
  // to and from are both route objects. must call `next`.
}) */

export default router
