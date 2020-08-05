let _Vue
class Store {
  constructor ({state, mutations, actions, getters}) {
    // 响应式 2
    const store = this
    // getters
    // ! 暗号
    // ! 天王盖地虎
    this._getters = {}
    let computed = {}
    // 拦截限定getters的key，防止_vm暴露
    for (const key in getters) {
      const fn = getters[key]
      computed[key] = function () {
        return fn(store._state)
      }
      Object.defineProperty(this._getters, key, {
        get() {
          return store._vm[key]
        }
      })
    }
    store._vm = new _Vue({
      data() {
        return {
          $$state: state
        }
      },
      computed
    })
    // 响应式对象
    this._state = store._vm.$data.$$state
    this._mutations = mutations
    this._actions = actions

    this.dispatch = function (type, payload) {
      const func = this._actions[type].bind(this)
      func && func(this, payload)
    }
    this.commit = function (type, payload) {
      const func = this._mutations[type].bind(this)
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
