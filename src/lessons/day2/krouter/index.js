import RouterLink from "./RouterLink"
import RouterView from "./RouterView"

let _Vue
class Router {
  constructor({ routes = [] }) {
    // routes
    // this.current = _Vue.extend({name: 'test', template: '<div>hellow</div>'})
    this.current = null
    // 响应式
    _Vue.util.defineReactive(this, 'current')

    function handleHashChange() {
      const path = location.hash.slice(1) || '/'
      const route = routes.find(item => item.path === path) || {}
      if (route) {
        this.current = route.component
      }
    }
    // 监听hash变化
    window.addEventListener('hashchange', handleHashChange.bind(this))
    window.addEventListener('load', handleHashChange.bind(this))
  }
}

Router.install = function (Vue) {
  _Vue = Vue

  // router-link
  Vue.component('router-link', RouterLink)
  // router-view
  Vue.component('router-view', RouterView)
  // $router
  // 延迟挂载，插件被use时，router实例还没被创建
  Vue.mixin({
    beforeCreate () {
      // 判断是否是根实例，$root
      if (this.$options.router) {
        _Vue.prototype.$router = this.$options.router
      }
    }
  })
}

export default Router
