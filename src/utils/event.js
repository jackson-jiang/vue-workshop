function dispatch (compName, eventName, value) {
  let comp = this
  while (comp && comp.$options.componentName !== compName) {
    comp = comp.$parent
  }
  comp.$emit(eventName, value)
}

export default {
  install(Vue) {
    Vue.prototype.$dispatch = dispatch
    // Vue.prototype.broadcast = broadcast
  }
}
