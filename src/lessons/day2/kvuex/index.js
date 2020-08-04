let _Vue
class Store {
  constructor ({state, mutations, actions, getters}) {
    // 响应式 2
    const store = this
    // 响应式对象
    this._state = _Vue.observable(state)
    // 处理getters，访问this.getters时调用getters方法
    this._getters = {}
    for (const key in getters) {
      const fn = getters[key]
      Object.defineProperty(this._getters, key, {
        get() {
          return fn.apply(store)
        }
      })
    }
    this._mutations = mutations
    this._actions = actions

    this.dispatch = function (type, payload) {
      const func = this._actions[type]
      func && func(this, payload)
    }
    this.commit = function (type, payload) {
      const func = this._mutations[type]
      func && func(this._state, payload)
    }
  }
  // $store.state给出警告
  get state () {
    return this._state
  }

  set state (val) {
    console.error('you \'t set state directly')
  }
  // getters
  get getters () {
    return this._getters
  }
}

export default {
  Store,
  install (Vue) {
    _Vue = Vue
    // 注册$store
    Vue.mixin({
      beforeCreate () {
        if (this.$options.store) {
          Vue.prototype.$store = this.$options.store
        }
      }
    })
  }
}
